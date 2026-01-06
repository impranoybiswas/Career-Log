import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { name, email, mobile, gender, password } = await req.json();
    const db = await connectDB();

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Password hashing
    const hashedPassword = await bcrypt.hash(password, 12);

    await db.collection("users").insertOne({
      name,
      email,
      mobile,
      gender,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Registration failed", error },
      { status: 500 }
    );
  }
}
