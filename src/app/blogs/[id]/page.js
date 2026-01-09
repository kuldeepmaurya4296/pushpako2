import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import BlogDetail from '@/components/Pages/Blogs/BlogDetail';

export const dynamic = 'force-dynamic';

async function getBlog(id) {
  try {
    // Try to fetch by slug first, then by ID if it's a valid ObjectId
    let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blogs/${id}`, {
      cache: 'no-store' // Ensure fresh data
    });

    if (!response.ok) {
      // If not found by slug, try by ID if it's a valid ObjectId
      if (/^[0-9a-fA-F]{24}$/.test(id)) {
        response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blogs/${id}`, {
          cache: 'no-store'
        });
      }

      if (!response.ok) {
        return null;
      }
    }

    const data = await response.json();
    return data;
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