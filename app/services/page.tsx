'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { ServiceCatalog } from '@/components/services/ServiceCatalog';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';
import { BookingModal } from '@/components/booking/BookingModal';
import { BookingLookupModal } from '@/components/booking/BookingLookupModal';
import { SalonService } from '@/lib/types/booking';
import { SERVICE_CATALOG } from '@/lib/data/service-catalog';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function ServicesPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLookupOpen, setIsLookupOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>();
  const [services, setServices] = useState<SalonService[]>(SERVICE_CATALOG);

  useEffect(() => {
    fetch('/api/services')
      .then(r => r.json())
      .then(data => {
        if (data.success && data.services) setServices(data.services);
      })
      .catch(() => {});
  }, []);

  const handleOpenBooking = (serviceId?: string) => {
    setPreselectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenLookup={() => setIsLookupOpen(true)}
      />

      <main className="flex-1 pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-charcoal-muted hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <ServiceCatalog
          services={services}
          onSelectService={handleOpenBooking}
        />
      </main>

      <Footer />
      <FloatingWhatsApp />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={preselectedServiceId}
      />

      <BookingLookupModal
        isOpen={isLookupOpen}
        onClose={() => setIsLookupOpen(false)}
      />
    </div>
  );
}

