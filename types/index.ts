import { User, AdminUser, StudentUser, VpaaUser } from "@prisma/client";

export type SafeUser = (
  | Omit<AdminUser, "createdAt" | "updatedAt" | "emailVerified">
  | Omit<StudentUser, "createdAt" | "updatedAt" | "emailVerified">
  | Omit<VpaaUser, "createdAt" | "updatedAt" | "emailVerified">
) & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeAdminUser = Omit<AdminUser, "createdAt" | "updatedAt" | "emailVerified"> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeStudentUser = Omit<StudentUser, "createdAt" | "updatedAt" | "emailVerified"> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeVpaaUser = Omit<VpaaUser, "createdAt" | "updatedAt" | "emailVerified"> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};