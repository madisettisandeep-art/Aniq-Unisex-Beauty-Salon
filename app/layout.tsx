import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aniqstudio.com'),
  title: 'ANIQ Unisex Beauty Salon and Tattoo | West Marredpally, Secunderabad',
  description: 'West Marredpally’s premier luxury salon. Precision haircuts, restorative hair spas, 24K gold facials, detan treatments, and custom tattoo studio. Book your appointment online.',
  keywords: [
    'ANIQ Salon West Marredpally',
    'Unisex salon in West Marredpally',
    'Haircut and grooming in Secunderabad',
    'Facial and hair spa in West Marredpally',
    'Tattoo studio in Secunderabad',
    'Luxury salon Hyderabad'
  ],
  authors: [{ name: 'ANIQ Unisex Beauty Salon & Tattoo' }],
  openGraph: {
    title: 'ANIQ Unisex Beauty Salon and Tattoo — West Marredpally',
    description: 'Luxury grooming, bridal facials, hair spa rituals and custom tattoo consultations in Secunderabad.',
    url: 'https://aniqstudio.com',
    siteName: 'ANIQ Unisex Luxury Salon',
    images: [
      {
        url: '/images/high_res/post_01_hair_care_1080p.jpg',
        width: 1080,
        height: 1350,
        alt: 'ANIQ Unisex Salon West Marredpally',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ANIQ Unisex Beauty Salon & Tattoo | West Marredpally',
    description: 'Premier grooming, beauty spa, and tattoo sanctuary in Secunderabad.',
    images: ['/images/high_res/post_01_hair_care_1080p.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: 'ANIQ Unisex Beauty Salon and Tattoo',
    image: 'https://aniqstudio.com/images/high_res/post_01_hair_care_1080p.jpg',
    telephone: '+919912417109',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'W Marredpally Road, Siva Arun Colony',
      addressLocality: 'West Marredpally, Secunderabad',
      addressRegion: 'Telangana',
      postalCode: '500026',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '17.4447',
      longitude: '78.5085',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '10:00',
        closes: '21:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '91',
    },
    url: 'https://aniqstudio.com',
  };

  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <head>
        <link rel="preload" as="image" href="/posters/part-01.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-cream-50 text-charcoal antialiased selection:bg-gold/20 selection:text-charcoal min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}

