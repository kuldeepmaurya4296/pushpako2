import { connectDB } from "@/lib/db/connectDB"
import Team from "@/lib/models/Team"
import { NextResponse } from "next/server"

// GET /api/team - Get all team members with optional filtering
export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const department = searchParams.get('department')
    const active = searchParams.get('active')

    let query = {}

    if (department && department !== 'all') {
      query.department = department
    }

    if (active === 'true') {
      query.isActive = true
    } else if (active === 'false') {
      query.isActive = false
    }

    const team = await Team.find(query).sort({ order: 1 })

    return NextResponse.json(team)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// POST /api/team - Create a new team member
export async function POST(request) {
  try {
    await connectDB()
    const data = await request.json()

    const teamMember = await Team.create(data)
    return NextResponse.json(teamMember, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}