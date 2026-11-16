import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://promptsystem-pro.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/checkout', '/success', '/_next/static/media/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
