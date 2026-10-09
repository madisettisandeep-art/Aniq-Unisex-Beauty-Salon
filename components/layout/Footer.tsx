'use client';

import React from 'react';
import Link from 'next/link';
import { AniqLogo } from '../brand/AniqLogo';
import { SALON_STATS } from '@/lib/data/reviews';
import { MapPin, Phone, MessageSquare, Instagram, ExternalLink, ShieldCheck, Star } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-cream-100 pt-20 pb-12 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <AniqLogo variant="gold" className="h-12 items-start" showTagline={true} />
            <p className="text-xs text-cream-200/70 leading-relaxed font-light">
              West Marredpally's premier luxury salon and tattoo sanctuary. Delivering precision haircuts, restorative hair spas, 24K gold skin treatments and bespoke body art.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold" />
                ))}
              </div>
              <span className="text-xs font-bold text-white">4.7 Stars</span>
              <span className="text-[10px] text-cream-200/60">(91 Google Reviews)</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif font-bold tracking-widest uppercase text-gold">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-cream-200/75">
              <li><a href="#services" className="hover:text-gold transition-colors">Haircuts & Grooming</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">Luxury Facials & Hydra</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">Detan & Body Exfoliation</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">Hair Spa & Keratin</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">Tattoo Studio Consultations</a></li>
              <li><a href="#masters" className="hover:text-gold transition-colors">Our Master Stylists</a></li>
            </ul>
          </div>

          {/* Col 3: Studio Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif font-bold tracking-widest uppercase text-gold">
              Salon Hours
            </h4>
            <div className="text-xs text-cream-200/75 space-y-1.5 leading-relaxed">
              <p className="text-white font-medium">Open All 7 Days a Week</p>
              <p>Monday – Sunday</p>
              <p className="text-gold font-semibold">10:00 AM – 9:00 PM</p>
              <p className="text-[11px] text-cream-200/50 pt-2">
                Walk-ins welcomed subject to chair availability. Prior appointment strongly recommended.
              </p>
            </div>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif font-bold tracking-widest uppercase text-gold">
              Contact & Studio
            </h4>
            <div className="text-xs text-cream-200/75 space-y-2.5">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>{SALON_STATS.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="tel:+919912417109" className="hover:text-gold">+91 99124 17109</a>
              </p>
              <p className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href={buildWhatsAppUrl("Hello ANIQ Salon, I would like to book an appointment.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400"
                >
                  WhatsApp: +91 99124 17109
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-400 flex-shrink-0" />
                <a
                  href={SALON_STATS.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400"
                >
                  @aniqstudio_westmarredpally
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-cream-200/60 gap-4">
          <p>© {new Date().getFullYear()} ANIQ Unisex Beauty Salon and Tattoo. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/admin" className="hover:text-gold transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Staff / Admin Portal
            </Link>
            <a href={SALON_STATS.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold flex items-center gap-1">
              Google Maps Location <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

