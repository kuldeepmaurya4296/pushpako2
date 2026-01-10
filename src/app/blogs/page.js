import { connectDB } from "@/lib/db/connectDB";
import Blog from "@/lib/models/Blog";
import BlogsClient from "@/components/Pages/Blogs/Index";

export const dynamic = 'force-dynamic';

export default async function page() {
  let blogs = [];

  try {
    await connectDB();
    const limit = 20;
    const page = 1;

    // Fetch blogs and total count parallelly
    const [blogsResult, totalResult] = await Promise.all([
      Blog.find({ isPublished: true })
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean(),
      Blog.countDocuments({ isPublished: true })
    ]);

    blogs = JSON.parse(JSON.stringify(blogsResult));

    return (
      <div className="min-h-screen text-white bg-[#060B18]">
        <BlogsClient initialBlogs={blogs} totalCount={totalResult} initialLimit={limit} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return (
      <div className="min-h-screen text-white bg-[#060B18]">
        <BlogsClient initialBlogs={[]} totalCount={0} initialLimit={20} />
      </div>
    );
  }
}
