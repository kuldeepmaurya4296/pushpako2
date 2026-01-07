import { connectDB } from "@/lib/db/connectDB"
import Blog from "@/lib/models/Blog"
import { NextResponse } from "next/server"

// GET /api/blogs - Get all blogs with optional filtering
export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const published = searchParams.get('published')
    const limit = parseInt(searchParams.get('limit')) || 0
    const page = parseInt(searchParams.get('page')) || 1
    const skip = (page - 1) * limit

    let query = {}

    if (category && category !== 'All') {
      query.category = category
    }

    if (featured === 'true') {
      query.isFeatured = true
    }

    if (published === 'true') {
      query.isPublished = true
    }

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit || 0)

    const total = await Blog.countDocuments(query)

    return NextResponse.json({
      blogs,
      total,
      page,
      totalPages: limit ? Math.ceil(total / limit) : 1
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 })
  }
}

// POST /api/blogs - Create a new blog
export async function POST(request) {
  try {
    await connectDB()
    const data = await request.json()

    // Generate slug if not provided
    if (!data.slug) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    }

    const blog = await Blog.create(data)
    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    console.error(error)
    if (error.code === 11000) {
      return NextResponse.json({ error: "Blog with this slug already exists" }, { status: 400 })
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}