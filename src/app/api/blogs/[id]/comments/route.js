import { connectDB } from "@/lib/db/connectDB";
import Blog from "@/lib/models/Blog";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const { author, content } = await request.json();

        if (!author || !content) {
            return NextResponse.json(
                { error: "Author and content are required" },
                { status: 400 }
            );
        }

        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        const newComment = {
            author,
            content,
            createdAt: new Date(),
        };

        blog.comments.push(newComment);
        await blog.save();

        return NextResponse.json(newComment, { status: 201 });
    } catch (error) {
        console.error("Error adding comment:", error);
        return NextResponse.json(
            { error: "Failed to add comment" },
            { status: 500 }
        );
    }
}

export async function GET(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const blog = await Blog.findById(id).select("comments");

        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json(blog.comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        return NextResponse.json(
            { error: "Failed to fetch comments" },
            { status: 500 }
        );
    }
}
