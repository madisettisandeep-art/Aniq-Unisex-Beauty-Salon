'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SALON_STATS } from '@/lib/data/reviews';
import { MapPin, Phone, MessageSquare, Clock, Navigation } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const ContactSection: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);

  // Lazy-load the heavy Google Maps iframe only when approaching viewport
  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setShouldLoadMap(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoadMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      className="relative py-24 overflow-hidden bg-gradient-to-br from-[#FBEAE7] via-[#FDF5EB] to-[#F3E2EA] border-t border-gold/25"
    >
      {/* Ambient Radial Orbs */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-transparent blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-[#C08081]/20 to-transparent blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Contact Details Card */}
          <ScrollReveal direction="left" className="space-y-6 flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-[#23181D] to-[#3B2630] text-[#F5D07A] border border-gold/40 shadow-md mb-3">
                Visit Our Studio
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#22161B] tracking-tight mb-4">
                Location & <span className="italic text-gradient-luxury">Salon Hours</span>
              </h2>
              <p className="text-sm sm:text-base text-[#5C444D] font-normal leading-relaxed">
                Step into ANIQ Salon in West Marredpally for world-class grooming, facials, and tattoo consultations.
              </p>
            </div>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#FFFDF9] to-[#FDF2EE] border border-[#E5C1BA] shadow-md hover:-translate-y-0.5 transition-all">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#23181D] to-[#3D2631] text-[#F3D078] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#22161B] text-sm mb-1">
                    Salon Address
                  </h3>
                  <p className="text-xs text-[#5A424B] leading-relaxed">
                    {SALON_STATS.address}
                  </p>
                  <p className="text-[11px] text-[#9E6B25] font-bold mt-1">
                    Landmark: {SALON_STATS.landmark}
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#FFFDF9] to-[#FDF6EA] border border-[#E6C786] shadow-md hover:-translate-y-0.5 transition-all">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B08328] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#22161B] text-sm mb-1">
                    Salon Hours
                  </h3>
                  <p className="text-xs text-[#5A424B]">
                    Monday to Sunday: <span className="font-bold text-[#22161B]">10:00 AM – 9:00 PM</span>
                  </p>
                  <p className="text-[11px] text-emerald-700 font-bold mt-1">
                    Open all 7 days for scheduled appointments and walk-in inquiries.
                  </p>
                </div>
              </div>

              {/* Telephone & WhatsApp */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#FFFDF9] to-[#F5EAF2] border border-[#D4B8CC] shadow-md hover:-translate-y-0.5 transition-all">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#A65E6E] to-[#7D4B63] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#22161B] text-sm mb-1">
                    Direct Appointments Desk
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <a
                      href="tel:+919912417109"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#23181D] text-[#F3D078] text-xs font-bold hover:bg-[#3A2730] transition-colors shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#F3D078]" />
                      +91 99124 17109
                    </a>
                    <a
                      href={buildWhatsAppUrl("Hello ANIQ Salon, I would like to enquire about appointment availability.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Directions Action */}
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={SALON_STATS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#23181D] via-[#3A252F] to-[#23181D] text-[#F5D07A] border border-gold/40 text-xs font-bold uppercase tracking-wider hover:shadow-gold transition-all"
              >
                <Navigation className="w-4 h-4 text-[#F5D07A]" />
                Get Driving Directions on Google Maps
              </a>
            </div>
          </ScrollReveal>

          {/* Interactive Map Embed / Preview Card (IntersectionObserver Lazy-Loaded) */}
          <ScrollReveal direction="right" delayMs={140} className="h-full">
            <div
              ref={mapContainerRef}
              className="h-full bg-gradient-to-br from-[#23181D] to-[#35222B] p-4 rounded-3xl border border-gold/40 shadow-2xl overflow-hidden flex flex-col justify-between"
            >
              <div className="relative w-full flex-1 min-h-[380px] rounded-2xl overflow-hidden bg-ivory-100 border border-gold/25">
                {shouldLoadMap ? (
                  <iframe
                    title="ANIQ Unisex Salon Location Map"
                    src="https://maps.google.com/maps?q=Aniq%20Unisex%20Beauty%20Salon%20and%20Tattoo%20West%20Marredpally%20Secunderabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full contrast-[1.05]"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center animate-pulse">
                    <MapPin className="w-8 h-8 text-gold mb-2" />
                    <span className="text-xs font-medium text-charcoal-muted">
                      Loading interactive studio map...
                    </span>
                  </div>
                )}
              </div>
              <div className="pt-3 pb-1 text-center">
                <span className="text-xs text-[#F3D078] font-semibold tracking-wide">
                  W Marredpally Road, Siva Arun Colony, Secunderabad, Telangana 500026
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
