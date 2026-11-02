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
  metadataBase: new URL('https://www.aniqsalon.com'),
  title: 'Aniq Unisex Beauty Salon and Tattoo | West Marredpally, Secunderabad',
  description: 'Premier unisex beauty salon & tattoo studio in West Marredpally, Secunderabad. Precision haircuts, bridal facials, restorative hair spa, keratin treatments & custom tattoos. Call +91 99124 17109.',
  alternates: {
    canonical: 'https://www.aniqsalon.com/',
  },
  keywords: [
    'Aniq Unisex Beauty Salon and Tattoo',
    'ANIQ Salon West Marredpally',
    'Unisex salon in West Marredpally',
    'Haircut and grooming in Secunderabad',
    'Facial and hair spa in West Marredpally',
    'Tattoo studio in Secunderabad',
    'Luxury salon Hyderabad',
    'Beauty parlour West Marredpally',
    'Keratin treatment Secunderabad',
    'Hydra facial Secunderabad'
  ],
  authors: [{ name: 'Aniq Unisex Beauty Salon and Tattoo' }],
  openGraph: {
    title: 'Aniq Unisex Beauty Salon and Tattoo — West Marredpally, Secunderabad',
    description: 'Premier unisex grooming, bridal facials, restorative hair spas and custom tattoo consultations in West Marredpally, Secunderabad. Call +91 99124 17109.',
    url: 'https://www.aniqsalon.com/',
    siteName: 'Aniq Unisex Beauty Salon and Tattoo',
    images: [
      {
        url: '/images/high_res/post_01_hair_care_1080p.jpg',
        width: 1080,
        height: 1350,
        alt: 'Aniq Unisex Beauty Salon and Tattoo in West Marredpally, Secunderabad',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aniq Unisex Beauty Salon and Tattoo | West Marredpally, Secunderabad',
    description: 'Premier grooming, beauty spa, and tattoo sanctuary in West Marredpally, Secunderabad. Call +91 99124 17109.',
    images: ['/images/high_res/post_01_hair_care_1080p.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: ['/favicon.svg', '/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': ['BeautySalon', 'LocalBusiness'],
    '@id': 'https://www.aniqsalon.com/#business',
    name: 'Aniq Unisex Beauty Salon and Tattoo',
    alternateName: 'ANIQ Unisex Luxury Salon & Tattoo',
    description: 'Premier unisex beauty salon & tattoo studio in West Marredpally, Secunderabad. Precision haircuts, restorative hair spas, 24K gold facials, detan treatments, and bespoke body art.',
    url: 'https://www.aniqsalon.com/',
    logo: 'https://www.aniqsalon.com/favicon.svg',
    image: 'https://www.aniqsalon.com/images/high_res/post_01_hair_care_1080p.jpg',
    telephone: '+91 99124 17109',
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Credit Card, Debit Card',
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
      latitude: 17.4447,
      longitude: 78.5085,
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
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'West Marredpally',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'East Marredpally',
      },
      {
        '@type': 'City',
        name: 'Secunderabad',
      },
      {
        '@type': 'State',
        name: 'Telangana',
      },
    ],
    hasMap: 'https://www.google.com/maps/search/?api=1&query=Aniq+Unisex+Beauty+Salon+and+Tattoo+West+Marredpally+Secunderabad',
    hasMenu: 'https://www.aniqsalon.com/services',
    sameAs: [
      'https://www.instagram.com/aniqstudio_westmarredpally/'
    ],
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

