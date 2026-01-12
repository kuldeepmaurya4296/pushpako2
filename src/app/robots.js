export default function robots() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pushpako2.vercel.app';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/dashboards/', '/api/', '/admin/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
