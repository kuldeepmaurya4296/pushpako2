import { connectDB } from "@/lib/db/connectDB"
import AboutUs from "@/lib/models/AboutUs"
import { NextResponse } from "next/server"

// GET /api/about-us - Get about us content
export async function GET() {
  try {
    await connectDB()

    // Get the first (and likely only) about us document
    const aboutUs = await AboutUs.findOne()

    if (!aboutUs) {
      return NextResponse.json({ error: "About us content not found" }, { status: 404 })
    }

    return NextResponse.json(aboutUs)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// POST /api/about-us - Create about us content (if doesn't exist)
export async function POST(request) {
  try {
    await connectDB()
    const data = await request.json()

    // Check if about us content already exists
    const existing = await AboutUs.findOne()
    if (existing) {
      return NextResponse.json({ error: "About us content already exists" }, { status: 400 })
    }

    const aboutUs = await AboutUs.create(data)
    return NextResponse.json(aboutUs, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// PUT /api/about-us - Update about us content
export async function PUT(request) {
  try {
    await connectDB()
    const data = await request.json()

    const aboutUs = await AboutUs.findOneAndUpdate({}, data, {
      new: true,
      upsert: true, // Create if doesn't exist
      runValidators: true
    })

    return NextResponse.json(aboutUs)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}