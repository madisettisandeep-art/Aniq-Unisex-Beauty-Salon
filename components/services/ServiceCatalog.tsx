'use client';

import React, { useState } from 'react';
import { SalonService } from '@/lib/types/booking';
import { SERVICE_CATEGORIES } from '@/lib/data/service-catalog';
import { Clock, Search, Sparkles, MessageSquare, Plus, Check } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface ServiceCatalogProps {
  services: SalonService[];
  onSelectService: (serviceId: string) => void;
}

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({
  services,
  onSelectService
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredServices = services
    .filter(service => {
      const matchesCategory = selectedCategory === 'all' || service.categoryId === selectedCategory;
      const matchesSearch = 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return (a.price ?? 9999) - (b.price ?? 9999);
      if (sortBy === 'price-desc') return (b.price ?? 0) - (a.price ?? 0);
      if (a.isPopular && !b.isPopular) return -1;
      if (!a.isPopular && b.isPopular) return 1;
      return 0;
    });

  return (
    <section id="services" className="py-24 bg-cream-50 border-t border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-gold/15 text-gold border border-gold/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Service Menu & Verified Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-charcoal tracking-tight mb-4">
            Artistry in Every Detail
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted font-light leading-relaxed">
            Discover precision haircuts, restorative hair spas, 24K gold facials, and tattoo artistry at our West Marredpally studio. All prices reflect verified salon menu rates.
          </p>
        </div>

        {/* Controls: Search, Sort, Category Filter */}
        <div className="bg-white p-4 rounded-3xl border border-ivory-200 shadow-card mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 text-charcoal-muted absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search haircuts, facials, detan, hair spa..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full border border-beige bg-cream-50 text-xs sm:text-sm text-charcoal focus:outline-none focus:border-gold"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 self-end text-xs text-charcoal-muted">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-cream-50 border border-beige rounded-xl px-3 py-2 text-charcoal focus:outline-none focus:border-gold font-medium"
              >
                <option value="featured">Featured & Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-charcoal text-white shadow-sm'
                  : 'bg-cream-100 text-charcoal hover:bg-beige'
              }`}
            >
              All Categories ({services.length})
            </button>
            {SERVICE_CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gold text-charcoal font-semibold shadow-gold'
                    : 'bg-cream-100 text-charcoal hover:bg-beige'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-ivory-200">
            <p className="text-charcoal-muted text-sm">No services found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => (
              <div
                key={service.id}
                className="group bg-white rounded-3xl border border-ivory-200 overflow-hidden shadow-sm hover:shadow-luxury hover:border-gold/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Media Preview (if available) */}
                  {service.image && (
                    <div className="relative h-44 w-full overflow-hidden bg-ivory-100">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {service.isPopular && (
                        <span className="absolute top-3 left-3 bg-charcoal/80 backdrop-blur-md text-gold text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-gold/30">
                          Popular Choice
                        </span>
                      )}
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-serif font-bold text-lg text-charcoal leading-snug group-hover:text-gold transition-colors">
                        {service.name}
                      </h3>
                      <div className="text-right flex-shrink-0">
                        <span className="text-base font-bold text-gold">
                          {service.priceDisplay}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-charcoal-muted line-clamp-3 leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-ivory-100 flex items-center justify-between gap-2">
                  <span className="text-xs text-charcoal-muted flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    {service.durationMinutes} mins
                  </span>

                  <div className="flex items-center gap-2">
                    {/* WhatsApp Inquiry */}
                    <a
                      href={buildWhatsAppUrl(`Hello ANIQ Salon, I would like to enquire about ${service.name} (${service.priceDisplay}).`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Enquire on WhatsApp"
                      className="p-2 rounded-full border border-ivory-200 text-emerald-600 hover:bg-emerald-50 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </a>

                    {/* Book Now */}
                    <button
                      onClick={() => onSelectService(service.id)}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-gold hover:bg-gold-hover text-charcoal text-xs font-semibold tracking-wider uppercase transition-all shadow-sm hover:shadow-gold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

