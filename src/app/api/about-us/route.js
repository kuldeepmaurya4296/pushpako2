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

// PUT /api/about-us - Update about us content (supports partial updates)
export async function PUT(request) {
  try {
    await connectDB()
    const data = await request.json()

    // Validate that data is an object
    if (typeof data !== 'object' || data === null) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
    }

    // Optional: Add specific validation for allowed fields
    const allowedSections = ['hero', 'vision', 'values', 'footer', 'stats']
    const providedSections = Object.keys(data)

    // Check if all provided keys are allowed sections
    const invalidSections = providedSections.filter(section => !allowedSections.includes(section))
    if (invalidSections.length > 0) {
      return NextResponse.json({
        error: `Invalid sections: ${invalidSections.join(', ')}. Allowed sections: ${allowedSections.join(', ')}`
      }, { status: 400 })
    }

    const aboutUs = await AboutUs.findOneAndUpdate({}, data, {
      new: true,
      upsert: true, // Create if doesn't exist
      runValidators: true
    })

    return NextResponse.json(aboutUs)
  } catch (error) {
    console.error('Error updating about us:', error)

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json({
        error: "Validation failed",
        details: Object.values(error.errors).map(err => err.message)
      }, { status: 400 })
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}