'use client';

import React from 'react';
import { SALON_STATS } from '@/lib/data/reviews';
import { MapPin, Phone, MessageSquare, Clock, Instagram, ExternalLink, Navigation } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-ivory-50 border-t border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Details Card */}
          <div className="space-y-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-gold/15 text-gold border border-gold/30 mb-3">
                Visit Our Studio
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-charcoal tracking-tight mb-4">
                Location & Hours
              </h2>
              <p className="text-sm sm:text-base text-charcoal-muted font-light leading-relaxed">
                Step into ANIQ Salon in West Marredpally for world-class grooming, facials, and tattoo consultations.
              </p>
            </div>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-ivory-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal text-sm mb-1">
                    Salon Address
                  </h4>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    {SALON_STATS.address}
                  </p>
                  <p className="text-[11px] text-gold font-medium mt-1">
                    Landmark: {SALON_STATS.landmark}
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-ivory-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal text-sm mb-1">
                    Salon Hours
                  </h4>
                  <p className="text-xs text-charcoal-muted">
                    Monday to Sunday: <span className="font-semibold text-charcoal">10:00 AM – 9:00 PM</span>
                  </p>
                  <p className="text-[11px] text-emerald-600 font-medium mt-1">
                    Open all 7 days for scheduled appointments and walk-in inquiries.
                  </p>
                </div>
              </div>

              {/* Telephone & WhatsApp */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-ivory-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal text-sm mb-1">
                    Direct Appointments Desk
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5">
                    <a
                      href="tel:+919912417109"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-100 text-charcoal text-xs font-semibold hover:bg-beige transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-gold" />
                      +91 99124 17109
                    </a>
                    <a
                      href={buildWhatsAppUrl("Hello ANIQ Salon, I would like to enquire about appointment availability.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition-colors border border-emerald-200"
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-charcoal text-white text-xs font-semibold uppercase tracking-wider hover:bg-charcoal-light shadow-md transition-all"
              >
                <Navigation className="w-4 h-4 text-gold" />
                Get Driving Directions on Google Maps
              </a>
            </div>
          </div>

          {/* Interactive Map Embed / Preview Card */}
          <div className="bg-white p-4 rounded-3xl border border-ivory-200 shadow-card overflow-hidden">
            <div className="relative w-full h-[380px] rounded-2xl overflow-hidden bg-ivory-200">
              <iframe
                title="ANIQ Unisex Salon Location Map"
                src="https://maps.google.com/maps?q=Aniq%20Unisex%20Beauty%20Salon%20and%20Tattoo%20West%20Marredpally%20Secunderabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[20%] contrast-[1.05]"
              />
            </div>
            <div className="p-3 text-center">
              <span className="text-[11px] text-charcoal-muted">
                W Marredpally Road, Siva Arun Colony, Secunderabad, Telangana 500026
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

