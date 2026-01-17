import { connectDB } from "@/lib/db/connectDB";
import Blog from "@/lib/models/Blog";

export default async function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pushpako2.com';

    // Static routes
    const routes = [
        '',
        '/about-us',
        '/our-team',
        '/services',
        '/technologies',
        '/blogs',
        '/contact-us',
        '/sign-in',
        '/privacy-policy',
        '/terms-condition',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic routes (Blogs)
    let blogRoutes = [];
    try {
        await connectDB();
        const blogs = await Blog.find({ isPublished: true }).select('slug updatedAt').lean();

        blogRoutes = blogs.map((blog) => ({
            url: `${baseUrl}/blogs/${blog.slug}`,
            lastModified: blog.updatedAt || new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        }));
    } catch (error) {
        console.error("Sitemap generation error:", error);
    }

    return [...routes, ...blogRoutes];
}
