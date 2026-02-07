import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const email = session.user.email as string;

    // Try to find user in AdminUser table
    const adminUser = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (adminUser) {
      return {
        ...adminUser,
        createdAt: adminUser.createdAt.toISOString(),
        updatedAt: adminUser.updatedAt.toISOString(),
        emailVerified: adminUser.emailVerified?.toISOString() || null,
      };
    }

    // Try to find user in StudentUser table
    const studentUser = await prisma.studentUser.findUnique({
      where: { email },
    });

    if (studentUser) {
      return {
        ...studentUser,
        createdAt: studentUser.createdAt.toISOString(),
        updatedAt: studentUser.updatedAt.toISOString(),
        emailVerified: studentUser.emailVerified?.toISOString() || null,
      };
    }

    // Try to find user in VpaaUser table
    const vpaaUser = await prisma.vpaaUser.findUnique({
      where: { email },
    });

    if (vpaaUser) {
      return {
        ...vpaaUser,
        createdAt: vpaaUser.createdAt.toISOString(),
        updatedAt: vpaaUser.updatedAt.toISOString(),
        emailVerified: vpaaUser.emailVerified?.toISOString() || null,
      };
    }

    return null;
  } catch (error: any) {
    return null;
  }
}