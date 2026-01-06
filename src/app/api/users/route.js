import { connectDB } from "@/lib/db/connectDB"
import User from "@/lib/models/User"
import { NextResponse } from "next/server"

// GET /api/users - Get all users with optional filtering
export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const source = searchParams.get('source')

    let query = {}

    if (type && type !== 'all') {
      query.type = type
    }

    if (status && status !== 'all') {
      query.status = status
    }

    if (source && source !== 'all') {
      query.source = source
    }

    const users = await User.find(query).sort({ createdAt: -1 })

    return NextResponse.json(users)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// POST /api/users - Create a new user/lead
export async function POST(request) {
  try {
    await connectDB()
    const data = await request.json()

    const user = await User.create(data)
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}