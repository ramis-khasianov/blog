"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { SignUpSchema, SignInSchema } from "@/lib/validations";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma";

type ActionResult =
  | { ok: true; message?: string }
  | {
      ok: false;
      code: "INVALID_CREDENTIALS" | "ALREADY_EXISTS" | "UNKNOWN";
      message: string;
    };

const normalizeEmail = (email: string) => email.trim().toLowerCase(); // optionally .normalize("NFKC")

export const signUpWithCredentials = async (
  data: z.infer<typeof SignUpSchema>
): Promise<ActionResult> => {
  /* Using zod schema parse data once more but on server, and return error if invalid */
  const validatedData = SignUpSchema.safeParse(data);

  if (!validatedData.success) {
    return { ok: false, code: "UNKNOWN", message: "Invalid input data." };
  }

  const { email, name, password, passwordConfirmation } = validatedData.data;

  if (password !== passwordConfirmation) {
    return { ok: false, code: "UNKNOWN", message: "Invalid input data." };
  }

  /* Cast email to lowercase to be safe with some databases */
  const lowerCaseEmail = normalizeEmail(email);

  /* Check if user already exists with social login */
  const existingUser = await prisma.user.findUnique({
    where: { email: lowerCaseEmail },
    include: { accounts: true },
  });

  if (existingUser) {
    const hasNonCredentialsAccount = existingUser.accounts.some(
      account => account.provider !== "credentials"
    );
    
    if (hasNonCredentialsAccount) {
      return {
        ok: false,
        code: "ALREADY_EXISTS",
        message: "Account exists. Please sign in with your social provider instead.",
      };
    }
  }

  /* Try and create User in database */
  try {
    /* Hash password with 10 salt */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* Create user and credentials account on database */
    const user = await prisma.user.create({
      data: {
        email: lowerCaseEmail,
        name: name,
        accounts: {
          create: {
            name: name,
            password: hashedPassword,
            provider: "credentials",
            providerAccountId: lowerCaseEmail,
          },
        },
      },
    });
    console.log(`user created: ${user}`);
  } catch (error) {
    /* Catch user exists database error */
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          ok: false,
          code: "ALREADY_EXISTS",
          message: "Unable to create account.",
        };
      }
      console.error("database error code: ", error.code);
      return { ok: false, code: "UNKNOWN", message: "Database error occurred." };
    } else {
      /* Catch other database error */
      console.error("database error: ", error);
      return { ok: false, code: "UNKNOWN", message: "Something went wrong." };
    }
  }

  /* Try to authenticate created user and redirect to home */
  try {
    await signIn("credentials", {
      email: lowerCaseEmail,
      password,
      redirect: false,
    });

    return { ok: true, message: "Account created." };
  } catch (error) {
    if (error instanceof AuthError && error.type === "CredentialsSignin") {
      return {
        ok: false as const,
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password.",
      };
    }

    /* Catch other authentication error */
    console.error("signUp error", error);
    return { ok: false, code: "UNKNOWN", message: "Something went wrong." };
  }
};

export const signInWithCredentials = async (
  data: z.infer<typeof SignInSchema>
) => {
  /* Using zod schema parse data once more but on server, and return error if invalid */
  const validatedData = SignInSchema.safeParse(data);

  if (!validatedData.success) {
    return { ok: false, code: "UNKNOWN", message: "Invalid input data." };
  }

  const { email, password } = validatedData.data;

  /* Cast email to lowercase to be safe with some databases */
  const lowerCaseEmail = normalizeEmail(email);

  /* Check if user actually exists and has credentials account */
  const user = await prisma.user.findFirst({
    where: { email: lowerCaseEmail },
    include: {
      accounts: {
        where: {
          provider: "credentials",
        },
      },
    },
  });

  if (!user) {
    return {
      ok: false,
      code: "USER_NOT_FOUND",
      message: "User does not exists",
    };
  }

  const credentialsAccount = user.accounts.find(account => account.provider === "credentials");
  
  if (!credentialsAccount || !credentialsAccount.password || !user.email) {
    return {
      ok: false,
      code: "INVALID_AUTH_METHOD",
      message: "Invalid auth method",
    };
  }

  /* Finally try to auth using Auth.js with Credentials. Defined at auth.ts */
  try {
    await signIn("credentials", {
      email: user.email,
      password: password,
      redirect: false,
    });

    return { ok: true, message: "User logged in successfully." };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            ok: false,
            code: "INVALID_CREDENTIALS",
            message: "Invalid email or password.",
          };
        default:
          return {
            ok: false,
            code: "UNKNOWN",
            message:
              "Login failed. Please check your credentials or verify your email.",
          };
      }
    }

    return {
      ok: false,
      code: "UNKNOWN",
      message: `Unexpected error: ${String(error)}`,
    };
  }
};
