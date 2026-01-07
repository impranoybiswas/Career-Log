import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// CREATE JOB
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.author || !data.company || !data.position) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      );
    }

    const db = await connectDB();
    const result = await db.collection("jobs").insertOne({
      ...data,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Job added successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add job", error },
      { status: 500 }
    );
  }
}
