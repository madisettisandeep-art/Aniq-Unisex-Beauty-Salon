'use client';

import React from 'react';
import { Sparkles, Shield, Heart, Award, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden bg-gradient-to-r from-[#F9ECE0] via-[#FFF6F0] to-[#F7E2E9] border-t border-[#E5CFC3]"
    >
      {/* Decorative Ambient Glows */}
      <div className="pointer-events-none absolute -top-20 right-1/3 w-80 h-80 rounded-full bg-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-10 w-80 h-80 rounded-full bg-rosegold/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual Showcase Collage (Slides in from Left) */}
          <ScrollReveal direction="left" className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gold/40 aspect-[4/3] bg-ivory-100 group">
              <img
                src="/images/high_res/reel_07_salon_interior.jpg"
                alt="ANIQ Unisex Salon Interior"
                width={640}
                height={480}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1419]/90 via-[#1E1419]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-gold to-rosegold text-white text-[10px] uppercase tracking-widest font-bold mb-2">
                  West Marredpally Sanctuary
                </span>
                <h3 className="text-2xl font-serif font-bold">
                  Luxury Grooming & Ink Artistry
                </h3>
              </div>
            </div>

            {/* Floating Animated Experience Badge */}
            <div className="absolute -bottom-6 right-4 sm:right-6 hidden sm:block bg-gradient-to-br from-[#281C22] to-[#3A2731] text-white p-5 rounded-3xl border border-gold/50 shadow-2xl max-w-xs animate-float-slow">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold to-rosegold flex items-center justify-center text-white shadow-gold flex-shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-lg font-serif font-bold text-gold-light">4.7 ★ Rated</span>
                  <p className="text-xs text-cream-200/80">91+ verified Secunderabad client reviews</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Narrative Content (Slides in from Right) */}
          <ScrollReveal direction="right" className="space-y-6">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-gold/25 to-rosegold/25 text-[#7A444E] border border-rosegold/40 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-rosegold" />
              The ANIQ Philosophy
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#22171C] tracking-tight leading-tight">
              A Refined Sanctuary for{' '}
              <span className="text-gradient-luxury">Modern Self-Expression</span>
            </h2>

            <p className="text-sm sm:text-base text-[#594A4E] leading-relaxed">
              Located in the heart of West Marredpally, Secunderabad, ANIQ Unisex Beauty Salon and Tattoo blends high-end salon craftsmanship with a warm, welcoming ambience. We reject the rushed, sterile salon environment in favor of personalized consultations, restorative scalp therapies, and meticulous attention to detail.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white via-[#FFFDF9] to-[#FBF0DA] border border-gold/40 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-[#9E7618] text-white flex items-center justify-center mb-3 shadow-sm">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-[#22171C] text-base mb-1.5">
                  Sterile & Medical Hygiene
                </h4>
                <p className="text-xs text-[#5E4E55] leading-relaxed">
                  Autoclaved instruments, single-use disposable capes, and sealed tattoo needles for your absolute safety.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-white via-[#FFF9FA] to-[#FAE8EC] border border-rosegold/40 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rosegold to-[#8C4652] text-white flex items-center justify-center mb-3 shadow-sm">
                  <Heart className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-[#22171C] text-base mb-1.5">
                  Bespoke Consultations
                </h4>
                <p className="text-xs text-[#5E4E55] leading-relaxed">
                  Every haircut and skin treatment begins with an in-depth conversation tailored to your face shape and routine.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-[#5A4B50]">
              <span className="inline-flex items-center gap-1.5 bg-white/80 px-3.5 py-2 rounded-full border border-[#E5CFC3]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                100% Authentic L’Oréal & O3+ Formulas
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/80 px-3.5 py-2 rounded-full border border-[#E5CFC3]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Open All 7 Days (10 AM – 9 PM)
              </span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
