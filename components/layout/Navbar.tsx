'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AniqLogo } from '../brand/AniqLogo';
import { Calendar, MessageSquare, Menu, X } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenLookup?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenLookup }) => {
  const [isPastHero, setIsPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('hero-scroll-container');
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // Stay transparent across all 11 parts of the Hero video until the hero finishes scrolling
        setIsPastHero(rect.bottom <= 84);
      } else {
        setIsPastHero(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero-scroll-container' },
    { label: 'Services', href: '#services' },
    { label: 'Masters', href: '#masters' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'About', href: '#about' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-500 ${
        isPastHero
          ? 'bg-cream-50/95 backdrop-blur-md shadow-card border-b border-ivory-200'
          : 'bg-gradient-to-b from-black/50 via-black/20 to-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
        {/* Brand Logo (Left) */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
          <AniqLogo
            variant="gold"
            className="h-11 sm:h-12 transition-transform duration-300 group-hover:scale-105"
            showTagline={true}
          />
        </Link>

        {/* Desktop Navigation Links (Center) */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center justify-center gap-5 xl:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative py-1 text-xs uppercase tracking-widest font-semibold whitespace-nowrap transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full ${
                isPastHero
                  ? 'text-charcoal hover:text-gold-dark'
                  : 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] hover:text-gold'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons (Right) */}
        <div className="hidden sm:flex items-center gap-2.5 xl:gap-3 flex-shrink-0">
          {/* Lookup Booking */}
          {onOpenLookup && (
            <button
              onClick={onOpenLookup}
              className={`whitespace-nowrap text-xs font-medium px-4 py-2 rounded-full border transition-all ${
                isPastHero
                  ? 'border-beige text-charcoal hover:border-gold hover:text-gold-dark bg-white/80'
                  : 'border-white/35 text-white hover:border-gold hover:text-gold bg-black/25 backdrop-blur-sm'
              }`}
            >
              My Booking
            </button>
          )}

          {/* Direct WhatsApp Chat */}
          <a
            href={buildWhatsAppUrl("Hello ANIQ Salon, I would like to enquire about appointments.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
            className={`w-9 h-9 rounded-full transition-all border flex items-center justify-center flex-shrink-0 ${
              isPastHero
                ? 'bg-emerald-600/15 text-emerald-600 hover:bg-emerald-600 hover:text-white border-emerald-500/30'
                : 'bg-emerald-500/25 text-emerald-400 hover:bg-emerald-600 hover:text-white border-emerald-400/40 backdrop-blur-sm'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
          </a>

          {/* Book Appointment CTA */}
          <button
            onClick={onOpenBooking}
            className="whitespace-nowrap inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold via-gold-champagne to-gold-hover text-charcoal text-xs font-bold tracking-wider uppercase shadow-gold hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex-shrink-0"
          >
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Book Now</span>
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex sm:hidden items-center gap-2 flex-shrink-0">
          <button
            onClick={onOpenBooking}
            className="whitespace-nowrap px-3.5 py-2 rounded-full bg-gold text-charcoal text-[11px] font-bold uppercase tracking-wider shadow-sm"
          >
            Book Now
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={`p-2 rounded-lg transition-colors ${
              isPastHero ? 'text-charcoal hover:bg-ivory-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream-50/98 backdrop-blur-xl border-b border-beige px-6 pt-4 pb-6 shadow-xl animate-fadeIn">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-charcoal hover:text-gold uppercase tracking-wider py-1.5 border-b border-ivory-200"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 flex flex-col gap-2.5">
              {onOpenLookup && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLookup();
                  }}
                  className="w-full py-2.5 rounded-xl border border-beige bg-white text-charcoal text-xs font-semibold tracking-wider uppercase text-center"
                >
                  Track Existing Booking
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-xl bg-gold text-charcoal text-xs font-bold tracking-wider uppercase shadow-gold text-center"
              >
                Book Appointment Online
              </button>

              <a
                href={buildWhatsAppUrl("Hello ANIQ Salon, I would like to book an appointment.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Direct Booking
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
