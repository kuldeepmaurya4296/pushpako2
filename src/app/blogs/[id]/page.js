import { redirect } from 'next/navigation';
import { getBlogById } from '@/lib/mockBlogs';
import BlogDetail from '@/components/Pages/Blogs/BlogDetail';

export default async function BlogPage({ params }) {
  const { id } = await params;
  const blog = getBlogById(id);

  if (!blog) {
    redirect('/blogs');
  }

  return <BlogDetail blog={blog} />;
}