'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AniqLogo } from '../brand/AniqLogo';
import { Calendar, MessageSquare, Phone, Menu, X, Search, ShieldCheck } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenLookup?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenLookup }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero-scroll-container' },
    { label: 'Services & Pricing', href: '#services' },
    { label: 'Our Masters', href: '#masters' },
    { label: 'Studio Gallery', href: '#gallery' },
    { label: 'About ANIQ', href: '#about' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream-100/90 backdrop-blur-md shadow-card border-b border-ivory-200 py-2.5'
          : 'bg-gradient-to-b from-charcoal/80 via-charcoal/40 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <AniqLogo
            variant={isScrolled ? 'gold' : 'gold'}
            className="h-10 sm:h-12 transition-transform duration-300 group-hover:scale-105"
            showTagline={true}
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-xs uppercase tracking-widest font-medium transition-colors hover:text-gold ${
                isScrolled ? 'text-charcoal' : 'text-cream-100 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          {/* Lookup Booking */}
          {onOpenLookup && (
            <button
              onClick={onOpenLookup}
              className={`text-xs px-3 py-2 rounded-full border transition-all ${
                isScrolled
                  ? 'border-beige text-charcoal hover:border-gold hover:text-gold'
                  : 'border-white/20 text-cream-100 hover:border-gold/60 hover:text-white'
              }`}
            >
              My Booking
            </button>
          )}

          {/* Direct WhatsApp Call/Chat */}
          <a
            href={buildWhatsAppUrl("Hello ANIQ Salon, I would like to enquire about appointments.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="p-2 rounded-full bg-emerald-600/15 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all border border-emerald-600/30"
          >
            <MessageSquare className="w-4 h-4" />
          </a>

          {/* Book Appointment CTA */}
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-gradient-to-r from-gold via-gold-champagne to-gold-hover text-charcoal text-xs font-semibold tracking-wider uppercase shadow-gold hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book Now
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center space-x-2">
          <button
            onClick={onOpenBooking}
            className="px-3 py-1.5 rounded-full bg-gold text-charcoal text-[11px] font-bold uppercase tracking-wider"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={`p-2 rounded-lg ${
              isScrolled ? 'text-charcoal' : 'text-white'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-cream-50/98 backdrop-blur-xl border-b border-beige px-6 pt-4 pb-6 shadow-xl animate-fadeIn">
          <nav className="flex flex-col space-y-3.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-charcoal hover:text-gold uppercase tracking-wider py-1 border-b border-ivory-200"
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
                  className="w-full py-2.5 rounded-xl border border-beige text-charcoal text-xs font-semibold tracking-wider uppercase text-center"
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

