'use client';

import React, { memo } from 'react';
import { SalonMaster } from '@/lib/types/booking';
import { Sparkles, Calendar, Star, Clock, Award } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface MasterCardProps {
  master: SalonMaster;
  onSelectMaster: (masterId: string) => void;
  index: number;
}

const MasterCard = memo<MasterCardProps>(({ master, onSelectMaster, index }) => {
  return (
    <ScrollReveal
      direction={index % 2 === 0 ? 'up' : 'scale'}
      delayMs={index * 100}
      className="h-full"
    >
      <div className="bg-gradient-to-b from-[#36242E]/90 via-[#281B23]/95 to-[#1E141A] backdrop-blur-xl rounded-3xl border border-gold/35 overflow-hidden shadow-2xl hover:border-gold hover:shadow-[0_12px_40px_rgba(212,175,55,0.22)] transition-all duration-500 transform hover:-translate-y-2 flex flex-col justify-between group h-full">
        <div>
          {/* Photo */}
          <div className="relative h-64 w-full overflow-hidden bg-[#1A1216]">
            <img
              src={master.photo}
              alt={master.name}
              width={320}
              height={256}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E141A] via-transparent to-transparent" />

            {/* Rating Pill */}
            <div className="absolute top-3 right-3 bg-[#1E141A]/85 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-gold text-xs font-bold border border-gold/50 shadow-lg">
              <Star className="w-3.5 h-3.5 fill-gold text-gold" />
              <span>{master.rating}</span>
              <span className="text-cream-200/70 font-normal text-[10px]">
                ({master.reviewsCount})
              </span>
            </div>

            {/* Verified Artisan Badge */}
            <div className="absolute bottom-3 left-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-gold to-rosegold text-white text-[10px] font-bold uppercase tracking-wider shadow">
              <Award className="w-3 h-3" />
              Master Stylist
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-serif font-bold text-white mb-1 group-hover:text-gold-light transition-colors">
              {master.name}
            </h3>
            <p className="text-xs text-rosegold-light font-semibold mb-3">
              {master.role}
            </p>

            <div className="text-[11px] text-cream-200/80 mb-4 flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
              <Clock className="w-3.5 h-3.5 text-gold" />
              <span>
                Shift: {master.workingHours.start} – {master.workingHours.end}
              </span>
            </div>

            {/* Specialisations */}
            <div className="space-y-2 mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-gold-champagne/80 block">
                Core Specialisations:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {master.specialisations.map((spec, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-white/10 text-cream-100 px-2.5 py-1 rounded-full border border-gold/25"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-6 pt-0">
          <button
            onClick={() => onSelectMaster(master.id)}
            className="w-full py-3 rounded-full bg-gradient-to-r from-gold via-[#E8C86B] to-rosegold text-[#1E141A] hover:brightness-110 text-xs font-bold tracking-wider uppercase transition-all shadow-gold flex items-center justify-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book With {master.name.split(' ')[0]}
          </button>
        </div>
      </div>
    </ScrollReveal>
  );
});

MasterCard.displayName = 'MasterCard';

interface MastersSectionProps {
  masters: SalonMaster[];
  onSelectMaster: (masterId: string) => void;
}

export const MastersSection: React.FC<MastersSectionProps> = memo(
  ({ masters, onSelectMaster }) => {
    return (
      <section
        id="masters"
        className="relative py-24 overflow-hidden bg-gradient-to-br from-[#1C1217] via-[#2B1B24] to-[#160F14] border-t border-gold/30 text-white"
      >
        {/* Ambient Glowing Spotlights */}
        <div className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-gold/15 blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-rosegold/20 blur-3xl animate-float-slow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gold/15 text-gold-light border border-gold/40 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              Artisans of Beauty & Grooming
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
              Meet Our <span className="text-gradient-gold-bright">Master Stylists</span>
            </h2>
            <p className="text-sm sm:text-base text-cream-200/80 font-light leading-relaxed">
              Every haircut, facial treatment, and tattoo stroke is executed by experienced specialists dedicated to precision, medical hygiene, and individualized care.
            </p>
          </ScrollReveal>

          {/* Masters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {masters.map((master, idx) => (
              <MasterCard
                key={master.id}
                index={idx}
                master={master}
                onSelectMaster={onSelectMaster}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
);

MastersSection.displayName = 'MastersSection';
