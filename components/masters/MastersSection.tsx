'use client';

import React from 'react';
import { SalonMaster } from '@/lib/types/booking';
import { Sparkles, Calendar, Star, Clock } from 'lucide-react';

interface MastersSectionProps {
  masters: SalonMaster[];
  onSelectMaster: (masterId: string) => void;
}

export const MastersSection: React.FC<MastersSectionProps> = ({
  masters,
  onSelectMaster
}) => {
  return (
    <section id="masters" className="py-24 bg-ivory-50 border-t border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-gold/15 text-gold border border-gold/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Artisans of Beauty & Grooming
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-charcoal tracking-tight mb-4">
            Meet Our Masters
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted font-light leading-relaxed">
            Every haircut, facial treatment, and tattoo stroke is executed by experienced specialists dedicated to precision, hygiene, and individualized care.
          </p>
        </div>

        {/* Masters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {masters.map(master => (
            <div
              key={master.id}
              className="bg-white rounded-3xl border border-ivory-200 overflow-hidden shadow-card hover:shadow-luxury hover:border-gold/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo */}
                <div className="relative h-64 w-full overflow-hidden bg-ivory-100">
                  <img
                    src={master.photo}
                    alt={master.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-charcoal/80 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 text-gold text-xs font-bold border border-gold/30">
                    <Star className="w-3 h-3 fill-gold text-gold" />
                    <span>{master.rating}</span>
                    <span className="text-white/60 font-normal text-[10px]">({master.reviewsCount})</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-serif font-bold text-charcoal mb-1 group-hover:text-gold transition-colors">
                    {master.name}
                  </h3>
                  <p className="text-xs text-charcoal-muted font-medium mb-3">
                    {master.role}
                  </p>

                  <div className="text-[11px] text-charcoal-muted mb-4 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    <span>Hours: {master.workingHours.start} – {master.workingHours.end}</span>
                  </div>

                  {/* Specialisations */}
                  <div className="space-y-1.5 mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-muted block">
                      Core Specialisations:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {master.specialisations.map((spec, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-ivory-50 text-charcoal px-2 py-0.5 rounded-full border border-ivory-200"
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
                  className="w-full py-2.5 rounded-full border border-gold text-charcoal hover:bg-gold hover:text-charcoal text-xs font-semibold tracking-wider uppercase transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Select This Master
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

