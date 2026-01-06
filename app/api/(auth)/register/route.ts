import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { signToken } from "@/lib/jwt";

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

    // Generate JWT token
    const token = signToken({ email });

    const res = NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { message: "Registration failed", error },
      { status: 500 }
    );
  }
}
