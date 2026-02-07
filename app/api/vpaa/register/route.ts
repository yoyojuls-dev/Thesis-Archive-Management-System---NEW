import bcrypt from "bcryptjs";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, title, department, office, email, password, employeeId } = body;

    if (!name || !title || !department || !office || !email || !password || !employeeId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.vpaaUser.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Check if employee ID already exists
    const existingEmployeeId = await prisma.vpaaUser.findUnique({
      where: { employeeId }
    });

    if (existingEmployeeId) {
      return NextResponse.json({ error: "Employee ID already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create VPAA user
    const vpaaUser = await prisma.vpaaUser.create({
      data: {
        name,
        email,
        hashedPassword,
        employeeId,
        title,
        department,
        office,
        permissions: ["view_all_reports", "manage_academic_programs"], // Default permissions
      },
    });

    return NextResponse.json({
      user: {
        id: vpaaUser.id,
        name: vpaaUser.name,
        email: vpaaUser.email,
        employeeId: vpaaUser.employeeId,
        role: vpaaUser.role,
      },
    });
  } catch (error) {
    console.log("[VPAA_REGISTER]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}