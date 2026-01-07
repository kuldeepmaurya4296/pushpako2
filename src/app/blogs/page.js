import { connectDB } from "@/lib/db/connectDB";
import Blog from "@/lib/models/Blog";
import BlogsClient from "@/components/Pages/Blogs/Index";

export default async function page() {
  let blogs = [];

  try {
    await connectDB();
    blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  return (
    <div className="min-h-screen text-white bg-[#060B18]">
      <BlogsClient blogs={blogs} />
    </div>
  );
}
