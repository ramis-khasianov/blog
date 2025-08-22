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

        /* Get user if user actually exists. If it exists but has no password (or email) it means user is using other auth method and should either continue using it or add password at profile */
        const user = await prisma?.user.findFirst({
          where: {
            email: email.toLowerCase(),
          },
        });

        if (!user || !user.password || !user.email) {
          return null;
        }

        /* Compare password with the one stored in database */

        const passwordsMatch = await bcrypt.compare(password, user.password);
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
