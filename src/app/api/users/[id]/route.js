import { connectDB } from "@/lib/db/connectDB"
import User from "@/lib/models/User"
import { NextResponse } from "next/server"

// GET /api/users/[id] - Get a single user by ID
export async function GET(request, { params }) {
  try {
    await connectDB()
    const { id } = params

    const user = await User.findById(id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// PUT /api/users/[id] - Update a user
export async function PUT(request, { params }) {
  try {
    await connectDB()
    const { id } = await params
    const data = await request.json()

    const user = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// DELETE /api/users/[id] - Delete a user
export async function DELETE(request, { params }) {
  try {
    await connectDB()
    const { id } = params

    const user = await User.findByIdAndDelete(id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "User deleted successfully" })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}