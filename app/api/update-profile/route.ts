// app/api/update-profile/route.ts
import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, name, mobile, links } = await request.json();

    if (!email || !name) {
      return NextResponse.json(
        { message: "Name and email are required" },
        { status: 400 }
      );
    }

    const db = await connectDB();
    const collection = db.collection("users");

    const result = await collection.updateOne(
      { email },
      {
        $set: {
          name,
          mobile,
          links,
        },
      }
    );

    if (!result.matchedCount) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Updated" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
