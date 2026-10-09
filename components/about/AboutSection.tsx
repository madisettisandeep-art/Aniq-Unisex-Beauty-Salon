'use client';

import React from 'react';
import { Sparkles, Shield, Heart, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-cream-50 border-t border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual Showcase Collage */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-ivory-200 aspect-[4/3] bg-ivory-100">
              <img
                src="/images/high_res/reel_07_salon_interior.jpg"
                alt="ANIQ Unisex Salon Interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest text-gold font-bold">
                  West Marredpally Sanctuary
                </span>
                <h3 className="text-xl font-serif font-bold mt-1">
                  Luxury Grooming & Ink Artistry
                </h3>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:block bg-white p-5 rounded-3xl border border-ivory-200 shadow-luxury max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gold/15 flex items-center justify-center text-gold border border-gold/30">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-lg font-bold text-charcoal">4.7 Stars</span>
                  <p className="text-xs text-charcoal-muted">Over 90+ verified local client reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-gold/15 text-gold border border-gold/30">
              <Sparkles className="w-3.5 h-3.5" />
              The ANIQ Philosophy
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-charcoal tracking-tight leading-tight">
              A Refined Sanctuary for Modern Self-Expression
            </h2>

            <p className="text-sm sm:text-base text-charcoal-muted font-light leading-relaxed">
              Located in the heart of West Marredpally, Secunderabad, ANIQ Unisex Beauty Salon and Tattoo blends high-end salon craftsmanship with a warm, welcoming ambience. We reject the rushed, sterile salon environment in favor of personalized consultations, restorative scalp therapies, and meticulous attention to detail.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              <div className="p-4.5 rounded-2xl bg-white border border-ivory-200">
                <Shield className="w-5 h-5 text-gold mb-2" />
                <h4 className="font-serif font-bold text-charcoal text-sm mb-1">
                  Sterile & Medical Hygiene
                </h4>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  Autoclaved instruments, single-use disposable capes, and sealed tattoo needles for your absolute safety.
                </p>
              </div>

              <div className="p-4.5 rounded-2xl bg-white border border-ivory-200">
                <Heart className="w-5 h-5 text-rosegold mb-2" />
                <h4 className="font-serif font-bold text-charcoal text-sm mb-1">
                  Bespoke Consultations
                </h4>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  Every haircut and skin treatment begins with an in-depth conversation tailored to your face shape and routine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

