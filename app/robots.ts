import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/api/services'],
      disallow: ['/admin', '/api/admin', '/api/appointments'],
    },
    sitemap: 'https://www.aniqsalon.com/sitemap.xml',
  };
}
