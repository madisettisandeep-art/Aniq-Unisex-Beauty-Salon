'use client';

import React from 'react';
import { VERIFIED_REVIEWS, SALON_STATS } from '@/lib/data/reviews';
import { Star, ShieldCheck, Sparkles, ExternalLink, Quote } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const CARD_ACCENTS = [
  'from-white via-[#FFFDF8] to-[#FBF0DA] border-gold/40',
  'from-white via-[#FFF9FA] to-[#FAE8EC] border-rosegold/40',
  'from-white via-[#FCF9FB] to-[#F2E6EE] border-[#C9B3BF]',
  'from-white via-[#F9FDFB] to-[#E6F4EF] border-[#A7D4C5]',
];

export const ReviewsSection: React.FC = () => {
  return (
    <section
      id="reviews"
      className="relative py-24 overflow-hidden bg-gradient-to-br from-[#F7E5EA] via-[#FDF5EC] to-[#F9EAE2] border-t border-[#E5CFC3]"
    >
      {/* Ambient Color Orbs */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-rosegold/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-gold/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-gold/25 to-rosegold/25 text-[#7A444E] border border-rosegold/40 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-rosegold" />
            Verified Google Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#22171C] tracking-tight mb-4">
            Loved by <span className="text-gradient-luxury">Secunderabad</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5E4E55] leading-relaxed">
            Authentic guest feedback from verified patrons visiting ANIQ Unisex Salon & Tattoo in West Marredpally.
          </p>

          {/* Rating Summary Banner */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 bg-gradient-to-r from-[#261A20] via-[#382630] to-[#261A20] text-white px-7 py-4 rounded-2xl sm:rounded-full border border-gold/50 shadow-xl">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <div className="hidden sm:block h-4 w-px bg-white/20" />
            <span className="font-bold text-gold-light text-sm">{SALON_STATS.rating} / 5.0</span>
            <span className="text-xs text-cream-200/80">({SALON_STATS.totalReviews} Google Reviews)</span>
            <a
              href={SALON_STATS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-gold hover:text-gold-light flex items-center gap-1 sm:ml-2 underline underline-offset-4"
            >
              Verify on Google <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </ScrollReveal>

        {/* Reviews Cards Grid with Colorful Tints & ScrollReveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {VERIFIED_REVIEWS.map((review, idx) => (
            <ScrollReveal
              key={review.id}
              direction="up"
              delayMs={idx * 100}
              className="h-full"
            >
              <div
                className={`relative bg-gradient-to-br ${
                  CARD_ACCENTS[idx % CARD_ACCENTS.length]
                } rounded-3xl p-6 border shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between h-full`}
              >
                <Quote className="w-8 h-8 text-rosegold/20 absolute top-5 right-5 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                      ))}
                    </div>
                    <span className="text-[11px] font-medium text-[#6B5A61]">{review.date}</span>
                  </div>

                  <p className="text-xs text-[#2D2026] leading-relaxed mb-6 italic font-medium">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EAD8CD]/70 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#22171C]">
                      {review.author}
                    </h3>
                    <span className="text-[10px] text-rosegold-dark font-bold uppercase tracking-wider block mt-0.5">
                      {review.serviceMentioned}
                    </span>
                  </div>
                  {review.verifiedVisit && (
                    <span
                      className="p-1.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200"
                      title="Verified Customer"
                    >
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
