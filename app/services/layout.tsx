import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salon, Beauty, Grooming & Tattoo Services Menu | Aniq Unisex Salon Secunderabad',
  description: 'Explore verified prices for haircuts, luxury facials, detan, hair spa, keratin smoothing, and custom tattoos at Aniq Unisex Beauty Salon and Tattoo, West Marredpally, Secunderabad. Call +91 99124 17109.',
  keywords: [
    'salon services West Marredpally',
    'haircut price Secunderabad',
    'hydra facial West Marredpally',
    'hair spa price Secunderabad',
    'tattoo studio West Marredpally',
    'keratin treatment Secunderabad',
    'unisex beauty salon West Marredpally',
    'bridal makeup Secunderabad'
  ],
  alternates: {
    canonical: 'https://www.aniqsalon.com/services',
  },
  openGraph: {
    title: 'Salon, Beauty, Grooming & Tattoo Services Menu | Aniq Unisex Salon Secunderabad',
    description: 'Explore verified prices for haircuts, luxury facials, detan, hair spa, keratin smoothing, and custom tattoos in West Marredpally, Secunderabad.',
    url: 'https://www.aniqsalon.com/services',
    siteName: 'Aniq Unisex Beauty Salon and Tattoo',
    images: [
      {
        url: '/images/high_res/post_01_hair_care_1080p.jpg',
        width: 1080,
        height: 1350,
        alt: 'Aniq Unisex Beauty Salon and Tattoo Services Menu',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salon, Beauty, Grooming & Tattoo Services Menu | Aniq Unisex Salon',
    description: 'Explore verified prices for salon, grooming and tattoo services in West Marredpally, Secunderabad.',
    images: ['/images/high_res/post_01_hair_care_1080p.jpg'],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.aniqsalon.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services Menu',
        item: 'https://www.aniqsalon.com/services',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
