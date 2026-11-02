import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Luxury Salon & Tattoo Services Menu | ANIQ Unisex Salon West Marredpally',
  description: 'Explore verified pricing and services for ANIQ Unisex Beauty Salon & Tattoo in West Marredpally, Secunderabad. Precision haircuts, restorative hair spas, 24K gold facials, and tattoo studio.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Luxury Salon & Tattoo Services Menu | ANIQ Unisex Salon West Marredpally',
    description: 'Explore verified pricing and services for ANIQ Unisex Beauty Salon & Tattoo in West Marredpally, Secunderabad.',
    url: 'https://aniqsalon.com/services',
    siteName: 'ANIQ Unisex Luxury Salon',
    images: [
      {
        url: '/images/high_res/post_01_hair_care_1080p.jpg',
        width: 1080,
        height: 1350,
        alt: 'ANIQ Unisex Salon Services Menu',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

