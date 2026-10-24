import { MetadataRoute } from 'next';
import { ALL_ROLES } from '@/data/roles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://promptsystem-pro.vercel.app';

  const roleUrls: MetadataRoute.Sitemap = ALL_ROLES.map((role) => ({
    url: `${baseUrl}/${role.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

    const vsRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/vs/legalzoom`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vs/rocket-lawyer`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  return [
    ...vsRoutes,
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...roleUrls,
  ];
}
