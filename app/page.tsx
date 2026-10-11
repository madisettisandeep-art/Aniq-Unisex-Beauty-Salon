'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/layout/Navbar';
import { CinematicHero } from '@/components/hero/CinematicHero';
import { SignatureCarousel } from '@/components/showcase/SignatureCarousel';
import { ServiceCatalog } from '@/components/services/ServiceCatalog';
import { MastersSection } from '@/components/masters/MastersSection';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';
import { SectionSkeleton } from '@/components/ui/Skeletons';
import { SalonService, SalonMaster } from '@/lib/types/booking';
import { SERVICE_CATALOG } from '@/lib/data/service-catalog';
import { SALON_MASTERS } from '@/lib/data/masters';
import { fetchWithCache } from '@/lib/cache/client-cache';

// Code-split below-the-fold sections and heavy modals into separate JS chunks
const SalonGallery = dynamic(
  () => import('@/components/gallery/SalonGallery').then((mod) => mod.SalonGallery),
  { loading: () => <SectionSkeleton title="Loading portfolio gallery..." /> }
);

const AboutSection = dynamic(
  () => import('@/components/about/AboutSection').then((mod) => mod.AboutSection),
  { loading: () => <SectionSkeleton title="Loading about section..." /> }
);

const ReviewsSection = dynamic(
  () => import('@/components/reviews/ReviewsSection').then((mod) => mod.ReviewsSection),
  { loading: () => <SectionSkeleton title="Loading verified reviews..." /> }
);

const ContactSection = dynamic(
  () => import('@/components/contact/ContactSection').then((mod) => mod.ContactSection),
  { loading: () => <SectionSkeleton title="Loading contact and map..." /> }
);

const FAQSection = dynamic(
  () => import('@/components/faq/FAQSection').then((mod) => mod.FAQSection),
  { loading: () => <SectionSkeleton title="Loading FAQs..." /> }
);

const BookingModal = dynamic(
  () => import('@/components/booking/BookingModal').then((mod) => mod.BookingModal),
  { ssr: false }
);

const BookingLookupModal = dynamic(
  () => import('@/components/booking/BookingLookupModal').then((mod) => mod.BookingLookupModal),
  { ssr: false }
);

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLookupOpen, setIsLookupOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>();
  const [services, setServices] = useState<SalonService[]>(SERVICE_CATALOG);
  const [masters, setMasters] = useState<SalonMaster[]>(SALON_MASTERS);

  useEffect(() => {
    // Fetch from client-cached & server-cached API endpoints
    fetchWithCache('/api/services', 60_000)
      .then((data) => {
        if (data.success && data.services) setServices(data.services);
      })
      .catch(() => {});

    fetchWithCache('/api/masters', 60_000)
      .then((data) => {
        if (data.success && data.masters) setMasters(data.masters);
      })
      .catch(() => {});
  }, []);

  // Memoized callbacks to prevent child component re-renders
  const handleOpenBooking = useCallback(() => {
    setPreselectedServiceId(undefined);
    setIsBookingOpen(true);
  }, []);

  const handleOpenLookup = useCallback(() => {
    setIsLookupOpen(true);
  }, []);

  const handleOpenBookingWithService = useCallback((serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setIsBookingOpen(true);
  }, []);

  const handleOpenBookingWithMaster = useCallback((_masterId: string) => {
    setPreselectedServiceId(undefined);
    setIsBookingOpen(true);
  }, []);

  const handleCloseBooking = useCallback(() => {
    setIsBookingOpen(false);
  }, []);

  const handleCloseLookup = useCallback(() => {
    setIsLookupOpen(false);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FAF0E6]">
      {/* Top Navigation */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenLookup={handleOpenLookup}
      />

      {/* Mandatory Cinematic 11-Part Scroll-Animated Hero */}
      <CinematicHero onOpenBooking={handleOpenBooking} />

      {/* Interactive Auto-Sliding Signature Experiences & Luxury Marquee */}
      <SignatureCarousel
        onSelectService={handleOpenBookingWithService}
        onOpenBooking={handleOpenBooking}
      />

      {/* Services Section with Verified Gents Menu Pricing & Colorful Category Themes */}
      <ServiceCatalog
        services={services}
        onSelectService={handleOpenBookingWithService}
      />

      {/* Our Masters Section (Royal Velvet & Champagne Gold Contrast Showcase) */}
      <MastersSection
        masters={masters}
        onSelectMaster={handleOpenBookingWithMaster}
      />

      {/* Code-Split Below-the-Fold Sections */}
      <SalonGallery />
      <AboutSection />
      <ReviewsSection />
      <ContactSection />
      <FAQSection />

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action */}
      <FloatingWhatsApp />

      {/* Code-Split Interactive Modals (Loaded on demand) */}
      {isBookingOpen && (
        <BookingModal
          isOpen={isBookingOpen}
          onClose={handleCloseBooking}
          preselectedServiceId={preselectedServiceId}
        />
      )}

      {isLookupOpen && (
        <BookingLookupModal
          isOpen={isLookupOpen}
          onClose={handleCloseLookup}
        />
      )}
    </div>
  );
}
