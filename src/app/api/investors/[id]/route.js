import { connectDB } from "@/lib/db/connectDB"
import Investor from "@/lib/models/Investor"
import { NextResponse } from "next/server"

// GET /api/investors/[id] - Get a single investor by ID
export async function GET(request, { params }) {
  try {
    await connectDB()
    const { id } = params

    const investor = await Investor.findById(id)

    if (!investor) {
      return NextResponse.json({ error: "Investor not found" }, { status: 404 })
    }

    return NextResponse.json(investor)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// PUT /api/investors/[id] - Update an investor
export async function PUT(request, { params }) {
  try {
    await connectDB()
    const { id } = await params
    const data = await request.json()

    const investor = await Investor.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    })

    if (!investor) {
      return NextResponse.json({ error: "Investor not found" }, { status: 404 })
    }

    return NextResponse.json(investor)
  } catch (error) {
    console.error(error)
    if (error.code === 11000) {
      return NextResponse.json({ error: "Investor with this email already exists" }, { status: 400 })
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// DELETE /api/investors/[id] - Delete an investor
export async function DELETE(request, { params }) {
  try {
    await connectDB()
    const { id } = params

    const investor = await Investor.findByIdAndDelete(id)

    if (!investor) {
      return NextResponse.json({ error: "Investor not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Investor deleted successfully" })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}