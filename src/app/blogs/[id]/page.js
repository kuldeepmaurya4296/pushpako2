import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import BlogDetail from '@/components/Pages/Blogs/BlogDetail';

export const dynamic = 'force-dynamic';

import { connectDB } from "@/lib/db/connectDB";
import Blog from "@/lib/models/Blog";

async function getBlog(id) {
  try {
    await connectDB();

    // Try to fetch by slug first
    let blog = await Blog.findOne({ slug: id, isPublished: true }).lean();

    // If not found by slug, try by ID if it's a valid ObjectId
    if (!blog && /^[0-9a-fA-F]{24}$/.test(id)) {
      blog = await Blog.findOne({ _id: id, isPublished: true }).lean();
    }

    if (!blog) {
      return null;
    }

    // Convert _id to string to avoid serialization issues
    blog._id = blog._id.toString();
    if (blog.authorId) blog.authorId = blog.authorId.toString();

    // Increment view count (fire and forget to avoid blocking, or await if strict consistency needed)
    // For Server Components, we should await to ensure it happens, mostly harmless for perf unless high load
    try {
      await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });
    } catch (err) {
      console.error('Error incrementing views:', err);
    }

    return blog;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export default async function BlogPage({ params }) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    notFound();
  }

  return <BlogDetail blog={blog} />;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    return {
      title: 'Blog Not Found | Pushpak O2',
    };
  }

  return {
    title: `${blog.title} | Pushpak O2`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: blog.featuredImage ? [blog.featuredImage] : [],
    },
  };
}