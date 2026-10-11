'use client';

import React, { useState } from 'react';
import { MessageSquare, X, ChevronRight, Phone } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-3xl border border-ivory-200 shadow-2xl p-5 text-charcoal animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-ivory-200">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                AN
              </div>
              <div>
                <h4 className="text-xs font-bold text-charcoal">ANIQ Salon Concierge</h4>
                <p className="text-[10px] text-emerald-600 font-medium">Online • Typically replies in 5m</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-charcoal-muted hover:text-charcoal p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs text-charcoal-muted leading-relaxed">
            Welcome to ANIQ Unisex Salon & Tattoo, West Marredpally. How may we assist your grooming or appointment today?
          </div>

          <div className="space-y-2 pt-1">
            <a
              href={buildWhatsAppUrl("Hello ANIQ Salon, I would like to book an appointment.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-between transition-colors"
            >
              <span>Book Appointment Slot</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            <a
              href={buildWhatsAppUrl("Hello ANIQ Salon, I would like to know pricing for services.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-xl bg-ivory-100 hover:bg-beige text-charcoal text-xs font-medium flex items-center justify-between transition-colors"
            >
              <span>Price & Service Inquiry</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            <a
              href="tel:+919912417109"
              className="w-full py-2 px-3 rounded-xl bg-cream-50 hover:bg-ivory-100 text-charcoal-muted text-[11px] font-medium flex items-center justify-between transition-colors border border-ivory-200"
            >
              <span className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-gold" />
                Call +91 99124 17109
              </span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Concierge Pill Button (Covers bottom-right watermark zone) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact ANIQ Salon on WhatsApp"
        className="h-14 px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xl flex items-center gap-3 transition-all transform hover:scale-[1.03] active:scale-95 border-2 border-white/90"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <MessageSquare className="w-4 h-4 fill-white" />
        </div>
        <div className="text-left pr-1">
          <span className="block text-[9px] uppercase tracking-widest text-emerald-100 font-semibold leading-none mb-0.5">
            Instant Booking
          </span>
          <span className="block text-xs font-bold tracking-wide whitespace-nowrap leading-none">
            WhatsApp Us
          </span>
        </div>
      </button>
    </div>
  );
};

