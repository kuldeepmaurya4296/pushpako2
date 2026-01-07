import { connectDB } from "@/lib/db/connectDB"
import Blog from "@/lib/models/Blog"
import { NextResponse } from "next/server"

// GET /api/blogs/[id] - Get a single blog by ID or slug
export async function GET(request, { params }) {
  try {
    await connectDB()
    const { id } = await params

    // Try to find by slug first, then by ID if it's a valid ObjectId
    let blog = await Blog.findOne({ slug: id, isPublished: true })

    if (!blog && /^[0-9a-fA-F]{24}$/.test(id)) {
      blog = await Blog.findOne({ _id: id, isPublished: true })
    }

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    // Increment view count
    await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } })

    return NextResponse.json(blog)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// PUT /api/blogs/[id] - Update a blog
export async function PUT(request, { params }) {
  try {
    await connectDB()
    const { id } = await params
    const data = await request.json()

    // Generate new slug if title changed
    if (data.title && !data.slug) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    }

    const blog = await Blog.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    })

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error(error)
    if (error.code === 11000) {
      return NextResponse.json({ error: "Blog with this slug already exists" }, { status: 400 })
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// DELETE /api/blogs/[id] - Delete a blog
export async function DELETE(request, { params }) {
  try {
    await connectDB()
    const { id } = await params

    const blog = await Blog.findByIdAndDelete(id)

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Blog deleted successfully" })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}