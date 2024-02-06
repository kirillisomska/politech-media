import { db } from "@/services/db";
import type { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compareSync } from "bcryptjs";

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email", required: true },
        password: { label: "password", type: "password", required: true }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await db.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user) return null;

        if (compareSync(credentials.password, user.password)) {
          return { id: user.id, email: user.email };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};
