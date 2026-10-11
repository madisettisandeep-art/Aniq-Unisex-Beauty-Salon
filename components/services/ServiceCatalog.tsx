'use client';

import React, { useState, useMemo, useEffect, memo } from 'react';
import { SalonService } from '@/lib/types/booking';
import { SERVICE_CATEGORIES } from '@/lib/data/service-catalog';
import { Clock, Search, Sparkles, MessageSquare, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { ServiceGridSkeleton } from '@/components/ui/Skeletons';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

// O(1) Category Name & Color Theme Lookup Map
const CATEGORY_NAME_MAP = new Map<string, string>(
  SERVICE_CATEGORIES.map((c) => [c.id, c.name])
);

const CATEGORY_THEME_MAP: Record<
  string,
  { bar: string; badgeBg: string; badgeText: string; cardTint: string }
> = {
  'grooming-haircuts': {
    bar: 'from-[#D4AF37] via-[#E8C86B] to-[#9E7618]',
    badgeBg: 'bg-[#FFF5D6] border-[#E6C65A]',
    badgeText: 'text-[#825E0E]',
    cardTint: 'from-white via-[#FFFCF5] to-[#FAF0DD]',
  },
  'styling-chemical': {
    bar: 'from-[#B76E79] via-[#D88F9A] to-[#8C4652]',
    badgeBg: 'bg-[#FCE8EB] border-[#E2B2B9]',
    badgeText: 'text-[#853D49]',
    cardTint: 'from-white via-[#FFF9FA] to-[#F9E9EC]',
  },
  'hair-colour': {
    bar: 'from-[#8A5A7A] via-[#B47FA3] to-[#5E3852]',
    badgeBg: 'bg-[#F5E8F1] border-[#D2B0C7]',
    badgeText: 'text-[#663A57]',
    cardTint: 'from-white via-[#FDF9FC] to-[#F4E8F0]',
  },
  facials: {
    bar: 'from-[#D97F6C] via-[#EDA393] to-[#A65341]',
    badgeBg: 'bg-[#FDECE8] border-[#E8B8AD]',
    badgeText: 'text-[#8C4131]',
    cardTint: 'from-white via-[#FFF9F7] to-[#FCECE8]',
  },
  detan: {
    bar: 'from-[#C88A4B] via-[#E3AF78] to-[#945D25]',
    badgeBg: 'bg-[#FBF0E4] border-[#DFC09F]',
    badgeText: 'text-[#7D4B19]',
    cardTint: 'from-white via-[#FFFBF7] to-[#F9EFE2]',
  },
  cleanups: {
    bar: 'from-[#3B7A67] via-[#5CA38E] to-[#265748]',
    badgeBg: 'bg-[#E6F4EF] border-[#A7D4C5]',
    badgeText: 'text-[#235948]',
    cardTint: 'from-white via-[#F9FDFB] to-[#E9F5F0]',
  },
  'manicure-pedicure': {
    bar: 'from-[#C46D85] via-[#E094A9] to-[#8F4358]',
    badgeBg: 'bg-[#FCEBF0] border-[#E3B5C2]',
    badgeText: 'text-[#82384C]',
    cardTint: 'from-white via-[#FFF9FB] to-[#FAEAEE]',
  },
  'head-massage': {
    bar: 'from-[#5A7A5E] via-[#81A686] to-[#3B543E]',
    badgeBg: 'bg-[#EBF3EC] border-[#B4CEB7]',
    badgeText: 'text-[#365239]',
    cardTint: 'from-white via-[#FAFDFB] to-[#ECF4ED]',
  },
  'hair-spa': {
    bar: 'from-[#B58938] via-[#DEC06F] to-[#825E1A]',
    badgeBg: 'bg-[#FDF4DC] border-[#E2C885]',
    badgeText: 'text-[#735112]',
    cardTint: 'from-white via-[#FFFDF7] to-[#FAF1DC]',
  },
  tattoo: {
    bar: 'from-[#2E2229] via-[#B76E79] to-[#D4AF37]',
    badgeBg: 'bg-[#F2E9EE] border-[#C9B3BF]',
    badgeText: 'text-[#422B38]',
    cardTint: 'from-white via-[#FCF9FB] to-[#F3E9EF]',
  },
};

const DEFAULT_THEME = CATEGORY_THEME_MAP['grooming-haircuts'];
const ITEMS_PER_PAGE = 12;

interface ServiceCardProps {
  service: SalonService;
  categoryName: string;
  onSelectService: (serviceId: string) => void;
  index: number;
}

/**
 * Memoized ServiceCard with category color themes and hover lift
 */
const ServiceCard = memo<ServiceCardProps>(({ service, categoryName, onSelectService, index }) => {
  const theme = CATEGORY_THEME_MAP[service.categoryId] || DEFAULT_THEME;

  return (
    <ScrollReveal direction="up" delayMs={(index % 6) * 60} className="h-full">
      <div
        className={`group relative bg-gradient-to-br ${theme.cardTint} rounded-3xl border border-[#EAD8CD] overflow-hidden p-6 shadow-md hover:shadow-2xl hover:border-gold transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between h-full`}
      >
        {/* Top Colorful Category Accent Stripe */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.bar}`} />

        <div>
          {/* Top Meta Row: Category + Popular Badge */}
          <div className="flex items-center justify-between gap-2 mb-3.5 pt-1">
            <span
              className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${theme.badgeBg} ${theme.badgeText}`}
            >
              {categoryName}
            </span>
            {service.isPopular && (
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#B76E79] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-white" />
                Popular
              </span>
            )}
          </div>

          {/* Title, Thumbnail & Price Row */}
          <div className="flex items-start justify-between gap-3.5 mb-3">
            <div className="flex items-start gap-3 min-w-0">
              {service.image && (
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-ivory-100 border-2 border-gold/40 shadow-sm flex-shrink-0">
                  <img
                    src={service.image}
                    alt={service.name}
                    width={56}
                    height={56}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              )}
              <h3 className="font-serif font-bold text-lg text-[#24191E] leading-snug group-hover:text-[#9E6B20] transition-colors">
                {service.name}
              </h3>
            </div>

            <div className="text-right flex-shrink-0">
              <span className="inline-block px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#281C22] to-[#3E2B35] text-[#F7E29C] border border-gold/40 text-sm font-bold shadow-sm">
                {service.priceDisplay}
              </span>
            </div>
          </div>

          <p className="text-xs text-[#5E4E55] line-clamp-2 leading-relaxed mb-5">
            {service.description}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-4 border-t border-[#EAD8CD]/70 flex items-center justify-between gap-2 mt-auto">
          <span className="text-xs text-[#5E4E55] flex items-center gap-1.5 font-semibold">
            <Clock className="w-3.5 h-3.5 text-[#B76E79]" />
            {service.durationMinutes} mins
          </span>

          <div className="flex items-center gap-2">
            {/* WhatsApp Inquiry */}
            <a
              href={buildWhatsAppUrl(
                `Hello ANIQ Salon, I would like to enquire about ${service.name} (${service.priceDisplay}).`
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Enquire about ${service.name} on WhatsApp`}
              title="Enquire on WhatsApp"
              className="p-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </a>

            {/* Book Now */}
            <button
              onClick={() => onSelectService(service.id)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-gold via-[#E5C158] to-rosegold hover:from-gold-hover hover:to-rosegold-dark text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg transform group-hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5" />
              Book
            </button>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
});

ServiceCard.displayName = 'ServiceCard';

interface ServiceCatalogProps {
  services: SalonService[];
  isLoading?: boolean;
  onSelectService: (serviceId: string) => void;
}

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({
  services,
  isLoading = false,
  onSelectService,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAll, setShowAll] = useState<boolean>(false);

  // Debounce search input handler (250ms)
  const debouncedSearch = useDebounce(searchQuery, 250);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, debouncedSearch, sortBy]);

  const filteredServices = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    return services
      .filter((service) => {
        const matchesCategory =
          selectedCategory === 'all' || service.categoryId === selectedCategory;
        if (!matchesCategory) return false;
        if (!q) return true;
        return (
          service.name.toLowerCase().includes(q) ||
          service.description.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return (a.price ?? 9999) - (b.price ?? 9999);
        if (sortBy === 'price-desc') return (b.price ?? 0) - (a.price ?? 0);
        if (a.isPopular && !b.isPopular) return -1;
        if (!a.isPopular && b.isPopular) return 1;
        return 0;
      });
  }, [services, selectedCategory, debouncedSearch, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredServices.length / ITEMS_PER_PAGE));

  const paginatedServices = useMemo(() => {
    if (showAll) return filteredServices;
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredServices.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [filteredServices, currentPage, showAll]);

  return (
    <section
      id="services"
      className="relative py-24 overflow-hidden bg-gradient-to-b from-[#FAF0E4] via-[#FFF6F2] to-[#F6E4EA] border-t border-[#E8D2C5]"
    >
      {/* Decorative Ambient Color Orbs */}
      <div className="pointer-events-none absolute top-16 -left-32 w-96 h-96 rounded-full bg-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-16 -right-32 w-96 h-96 rounded-full bg-rosegold/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-gold/25 to-rosegold/25 text-[#7A444E] border border-rosegold/40 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-rosegold" />
            Curated Service Menu & Verified Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#22171C] tracking-tight mb-4">
            Artistry in <span className="text-gradient-luxury">Every Detail</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5E4E55] leading-relaxed">
            Discover precision haircuts, restorative hair spas, 24K gold facials, and tattoo artistry at our West Marredpally studio. All prices reflect verified salon menu rates.
          </p>
        </ScrollReveal>

        {/* Controls: Search, Sort, Category Filter */}
        <ScrollReveal
          direction="up"
          delayMs={80}
          className="bg-gradient-to-r from-white/95 via-[#FFFDF9]/95 to-[#FDF3F0]/95 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-[#E5CFC3] shadow-xl mb-12 space-y-5"
        >
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 text-rosegold absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                aria-label="Search salon services"
                placeholder="Search haircuts, facials, detan, hair spa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full border border-[#E2C8BC] bg-[#FFF9F6] text-xs sm:text-sm text-charcoal focus:outline-none focus:border-rosegold transition-colors"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center justify-end gap-2.5 text-xs text-[#5E4E55]">
              <label htmlFor="service-sort" className="font-semibold whitespace-nowrap">
                Sort by:
              </label>
              <select
                id="service-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FFF9F6] border border-[#E2C8BC] rounded-full px-4 py-2 text-charcoal focus:outline-none focus:border-rosegold font-semibold cursor-pointer"
              >
                <option value="featured">Featured & Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#EFE0D6] text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full font-bold whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-[#281C22] to-[#422D38] text-[#F7E29C] shadow-md scale-105'
                  : 'bg-[#F9EFEA] text-[#4A3B41] hover:bg-[#F2DFD7]'
              }`}
            >
              All Services ({services.length})
            </button>
            {SERVICE_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-gold via-[#E0BA52] to-rosegold text-white font-bold shadow-md scale-105'
                    : 'bg-[#F9EFEA] text-[#4A3B41] hover:bg-[#F2DFD7]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Loading Skeleton State */}
        {isLoading ? (
          <ServiceGridSkeleton count={6} />
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-white/90 rounded-3xl border border-[#EAD8CD]">
            <p className="text-[#5E4E55] text-sm">No services found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {paginatedServices.map((service, idx) => (
                <ServiceCard
                  key={service.id}
                  index={idx}
                  service={service}
                  categoryName={CATEGORY_NAME_MAP.get(service.categoryId) || 'Salon Service'}
                  onSelectService={onSelectService}
                />
              ))}
            </div>

            {/* Pagination Controls for Large Lists */}
            {filteredServices.length > ITEMS_PER_PAGE && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-white via-[#FFFBF8] to-[#FDF2EE] px-6 py-4 rounded-3xl border border-[#E5CFC3] shadow-lg">
                <div className="text-xs text-[#5E4E55]">
                  Showing{' '}
                  <span className="font-bold text-charcoal">
                    {showAll
                      ? `all ${filteredServices.length}`
                      : `${(currentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(
                          currentPage * ITEMS_PER_PAGE,
                          filteredServices.length
                        )}`}
                  </span>{' '}
                  of <span className="font-bold text-charcoal">{filteredServices.length}</span>{' '}
                  verified salon services
                </div>

                <div className="flex items-center gap-2 flex-wrap justify-center">
                  {!showAll && (
                    <>
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        aria-label="Previous page"
                        className="p-2 rounded-full border border-[#E2C8BC] text-charcoal disabled:opacity-40 hover:bg-[#F9EFEA] transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {Array.from({ length: totalPages }).map((_, idx) => {
                        const pageNum = idx + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                              currentPage === pageNum
                                ? 'bg-gradient-to-r from-gold to-rosegold text-white shadow-md scale-110'
                                : 'bg-[#F9EFEA] text-[#5E4E55] hover:bg-[#EFE0D6]'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        aria-label="Next page"
                        className="p-2 rounded-full border border-[#E2C8BC] text-charcoal disabled:opacity-40 hover:bg-[#F9EFEA] transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="ml-2 px-4 py-1.5 rounded-full bg-[#281C22] text-[#F7E29C] text-xs font-semibold hover:bg-[#3B2A32] transition-colors shadow-sm"
                  >
                    {showAll ? 'Paginate (12 / page)' : `Show All (${filteredServices.length})`}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
