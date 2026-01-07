import { connectDB } from "@/lib/db/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  return NextResponse.json({ success: true });
}

