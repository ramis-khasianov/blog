import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Keycloak from "next-auth/providers/keycloak";
import Credentials from "next-auth/providers/credentials";
import { SignInSchema } from "./lib/validations";
import bcrypt from "bcryptjs";
import prisma from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    Keycloak,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        /* Validate data received from credentials in auth.actions.ts. */
        const validatedData = SignInSchema.safeParse(credentials);

        if (!validatedData.success) return null;

        /* Destructure email and password */
        const { email, password } = validatedData.data;

        /* Get user with their credentials account */
        const user = await prisma?.user.findFirst({
          where: {
            email: email.toLowerCase(),
          },
          include: {
            accounts: {
              where: {
                provider: "credentials",
              },
            },
          },
        });

        if (!user || !user.email) {
          return null;
        }

        /* Check if user has a credentials account with password */
        const credentialsAccount = user.accounts.find(account => account.provider === "credentials");
        
        if (!credentialsAccount || !credentialsAccount.password) {
          return null;
        }

        /* Compare password with the one stored in database */
        const passwordsMatch = await bcrypt.compare(password, credentialsAccount.password);
        if (!passwordsMatch) return null;

        /* Return the user data to Auth.js session */
        return {
          id: String(user.id),
          email: user.email,
          name: user.name ?? null,
        };
      },
    }),
  ],
});
