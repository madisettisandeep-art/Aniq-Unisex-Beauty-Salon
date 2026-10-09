'use client';

import React from 'react';
import { VERIFIED_REVIEWS, SALON_STATS } from '@/lib/data/reviews';
import { Star, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-ivory-50 border-t border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-gold/15 text-gold border border-gold/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Verified Google Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-charcoal tracking-tight mb-4">
            Loved by Secunderabad
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted font-light leading-relaxed">
            Authentic guest feedback from verified patrons visiting ANIQ Unisex Salon & Tattoo in West Marredpally.
          </p>

          {/* Rating Summary Banner */}
          <div className="mt-8 inline-flex items-center gap-4 bg-white px-6 py-3.5 rounded-full border border-ivory-200 shadow-sm">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <div className="h-4 w-px bg-beige" />
            <span className="font-bold text-charcoal text-sm">{SALON_STATS.rating} / 5.0</span>
            <span className="text-xs text-charcoal-muted">({SALON_STATS.totalReviews} Google Reviews)</span>
            <a
              href={SALON_STATS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-gold hover:text-gold-hover flex items-center gap-1 ml-2"
            >
              Verify on Google <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VERIFIED_REVIEWS.map(review => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-6 border border-ivory-200 shadow-card hover:shadow-luxury hover:border-gold/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <span className="text-[11px] text-charcoal-muted">{review.date}</span>
                </div>

                <p className="text-xs text-charcoal leading-relaxed mb-6 italic">
                  "{review.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-ivory-100 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-charcoal">
                    {review.author}
                  </h4>
                  <span className="text-[10px] text-gold font-medium block">
                    {review.serviceMentioned}
                  </span>
                </div>
                {review.verifiedVisit && (
                  <span className="p-1 rounded-full bg-emerald-50 text-emerald-600" title="Verified Customer">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

