import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { author } = await req.json();

    if (!author) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const db = await connectDB();
    const jobs = await db
      .collection("jobs")
      .find({ author })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({jobs});
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch jobs", error },
      { status: 500 }
    );
  }
}
