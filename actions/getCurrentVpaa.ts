import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentVpaa() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentVpaa = await prisma.vpaaUser.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentVpaa) {
      return null;
    }

    return {
      ...currentVpaa,
      createdAt: currentVpaa.createdAt.toISOString(),
      updatedAt: currentVpaa.updatedAt.toISOString(),
      emailVerified: currentVpaa.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}