'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { CinematicHero } from '@/components/hero/CinematicHero';
import { ServiceCatalog } from '@/components/services/ServiceCatalog';
import { MastersSection } from '@/components/masters/MastersSection';
import { SalonGallery } from '@/components/gallery/SalonGallery';
import { AboutSection } from '@/components/about/AboutSection';
import { ReviewsSection } from '@/components/reviews/ReviewsSection';
import { ContactSection } from '@/components/contact/ContactSection';
import { FAQSection } from '@/components/faq/FAQSection';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';
import { BookingModal } from '@/components/booking/BookingModal';
import { BookingLookupModal } from '@/components/booking/BookingLookupModal';
import { SalonService, SalonMaster } from '@/lib/types/booking';
import { SERVICE_CATALOG } from '@/lib/data/service-catalog';
import { SALON_MASTERS } from '@/lib/data/masters';
import { Sparkles, Calendar, MessageSquare, Award, Star, Scissors, ShieldCheck, Heart } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLookupOpen, setIsLookupOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>();
  const [services, setServices] = useState<SalonService[]>(SERVICE_CATALOG);
  const [masters, setMasters] = useState<SalonMaster[]>(SALON_MASTERS);

  useEffect(() => {
    // Refresh with any DB updates
    fetch('/api/services')
      .then(r => r.json())
      .then(data => {
        if (data.success && data.services) setServices(data.services);
      })
      .catch(() => {});

    fetch('/api/masters')
      .then(r => r.json())
      .then(data => {
        if (data.success && data.masters) setMasters(data.masters);
      })
      .catch(() => {});
  }, []);

  const handleOpenBookingWithService = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithMaster = (masterId: string) => {
    setPreselectedServiceId(undefined);
    setIsBookingOpen(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-cream-50">
      {/* Top Navigation */}
      <Navbar
        onOpenBooking={() => {
          setPreselectedServiceId(undefined);
          setIsBookingOpen(true);
        }}
        onOpenLookup={() => setIsLookupOpen(true)}
      />

      {/* Mandatory Cinematic 11-Part Scroll-Animated Hero */}
      <CinematicHero
        onOpenBooking={() => {
          setPreselectedServiceId(undefined);
          setIsBookingOpen(true);
        }}
      />

      {/* --- BRAND INTRODUCTION & HIGHLIGHT STRIP --- */}
      <section id="brand-intro" className="py-20 bg-cream-100 border-b border-ivory-200 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-3xl border border-ivory-200 shadow-sm hover:shadow-luxury transition-all text-center">
              <div className="w-12 h-12 rounded-2xl bg-gold/15 text-gold flex items-center justify-center mx-auto mb-4 border border-gold/30">
                <Scissors className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-charcoal mb-2">
                Unisex Hair & Grooming
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Precision taper fades, classic scissor styling, beard sculpting, and customized keratin treatments.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-3xl border border-ivory-200 shadow-sm hover:shadow-luxury transition-all text-center">
              <div className="w-12 h-12 rounded-2xl bg-rosegold/15 text-rosegold flex items-center justify-center mx-auto mb-4 border border-rosegold/30">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-charcoal mb-2">
                Luxury Skin & Facials
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Special Hydra therapies, 24K Gold facials, O3+ bridal illuminations and deep cellular detan rituals.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-3xl border border-ivory-200 shadow-sm hover:shadow-luxury transition-all text-center">
              <div className="w-12 h-12 rounded-2xl bg-charcoal text-gold flex items-center justify-center mx-auto mb-4 border border-gold/40">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-charcoal mb-2">
                Sterile Tattoo Studio
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Custom stencil artwork, single-use medical needles, minimalist designs, and 1-on-1 consultations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Verified Gents Menu Pricing */}
      <ServiceCatalog
        services={services}
        onSelectService={handleOpenBookingWithService}
      />

      {/* Our Masters Section */}
      <MastersSection
        masters={masters}
        onSelectMaster={handleOpenBookingWithMaster}
      />

      {/* Gallery Section */}
      <SalonGallery />

      {/* About Section */}
      <AboutSection />

      {/* Google Reviews Section */}
      <ReviewsSection />

      {/* Contact & Map Section */}
      <ContactSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action */}
      <FloatingWhatsApp />

      {/* Interactive 11-Step Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={preselectedServiceId}
      />

      {/* Booking Lookup Modal */}
      <BookingLookupModal
        isOpen={isLookupOpen}
        onClose={() => setIsLookupOpen(false)}
      />
    </div>
  );
}

