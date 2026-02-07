import bcrypt from "bcryptjs";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // Check AdminUser table
        const adminUser = await prisma.adminUser.findUnique({
          where: { email: credentials.email },
        });

        if (adminUser && adminUser.hashedPassword) {
          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            adminUser.hashedPassword
          );

          if (isCorrectPassword) {
            return {
              id: adminUser.id,
              email: adminUser.email,
              name: adminUser.name,
              role: adminUser.role,
            };
          }
        }

        // Check StudentUser table
        const studentUser = await prisma.studentUser.findUnique({
          where: { email: credentials.email },
        });

        if (studentUser && studentUser.hashedPassword) {
          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            studentUser.hashedPassword
          );

          if (isCorrectPassword) {
            return {
              id: studentUser.id,
              email: studentUser.email,
              name: studentUser.name,
              role: studentUser.role,
            };
          }
        }

        // Check VpaaUser table
        const vpaaUser = await prisma.vpaaUser.findUnique({
          where: { email: credentials.email },
        });

        if (vpaaUser && vpaaUser.hashedPassword) {
          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            vpaaUser.hashedPassword
          );

          if (isCorrectPassword) {
            return {
              id: vpaaUser.id,
              email: vpaaUser.email,
              name: vpaaUser.name,
              role: vpaaUser.role,
            };
          }
        }

        throw new Error("Invalid credentials");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);