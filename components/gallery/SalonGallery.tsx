'use client';

import React, { useState } from 'react';
import { Sparkles, Instagram, ExternalLink, Maximize2, Film } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface GalleryItem {
  id: string;
  title: string;
  category: 'styling' | 'facials' | 'interior' | 'hair-care';
  src: string;
  resolution: string;
  description: string;
  badgeColor: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Signature Hair Care & Blow Dry',
    category: 'styling',
    src: '/images/high_res/post_01_hair_care_1080p.jpg',
    resolution: '1080 × 1350 Ultra-HD',
    description: 'Expert volume blowout and nourished glossy hair texture.',
    badgeColor: 'from-[#D4AF37] to-[#9E7618]',
  },
  {
    id: 'g-2',
    title: 'Balayage & Hair Transformation',
    category: 'hair-care',
    src: '/images/high_res/post_02_hair_transformation_1080p.jpg',
    resolution: '1080 × 1350 Ultra-HD',
    description: 'Dimensional color tones and precision layered finish.',
    badgeColor: 'from-[#B76E79] to-[#8C4652]',
  },
  {
    id: 'g-3',
    title: 'Modern Fade & Sharp Beard Sculpting',
    category: 'styling',
    src: '/images/high_res/post_03_fresh_haircut_1080p.jpg',
    resolution: '1080 × 1350 Ultra-HD',
    description: 'Crisp taper fade, clean edge-up, and beard contouring.',
    badgeColor: 'from-[#C88A4B] to-[#945D25]',
  },
  {
    id: 'g-4',
    title: 'Silky Smooth Keratin Spa',
    category: 'hair-care',
    src: '/images/high_res/post_04_silky_smooth_1080p.jpg',
    resolution: '1080 × 1350 Ultra-HD',
    description: 'Frizz-free silk infusion providing months of mirror shine.',
    badgeColor: 'from-[#8A5A7A] to-[#5E3852]',
  },
  {
    id: 'g-5',
    title: 'Bespoke Studio Styling & Cut',
    category: 'styling',
    src: '/images/high_res/post_05_salon_style_1080p.jpg',
    resolution: '1080 × 1350 Ultra-HD',
    description: 'Contemporary hair shaping customized to facial features.',
    badgeColor: 'from-[#D4AF37] to-[#B76E79]',
  },
  {
    id: 'g-6',
    title: 'Luxury Styling Floor & Mirrors',
    category: 'interior',
    src: '/images/high_res/reel_07_salon_interior.jpg',
    resolution: '640 × 1136 HD',
    description: 'Illuminated golden arched mirrors, leather barber chairs, and luxury flooring.',
    badgeColor: 'from-[#2E2229] to-[#D4AF37]',
  },
  {
    id: 'g-7',
    title: 'Special Hydra Skincare Suite',
    category: 'facials',
    src: '/images/high_res/reel_11_beauty_care.jpg',
    resolution: '512 × 640 HD',
    description: 'Relaxing facial treatment beds with advanced skin hydration equipment.',
    badgeColor: 'from-[#D97F6C] to-[#A65341]',
  },
  {
    id: 'g-8',
    title: 'Sensory Hair Spa & Scalp Cleansing',
    category: 'hair-care',
    src: '/images/high_res/reel_06_hair_wash_spa.jpg',
    resolution: '512 × 640 HD',
    description: 'Reclining shampoo stations with hot towel massage therapy.',
    badgeColor: 'from-[#3B7A67] to-[#235344]',
  },
  {
    id: 'g-9',
    title: 'Precision Beard Grooming Session',
    category: 'styling',
    src: '/images/high_res/reel_04_beard_grooming.jpg',
    resolution: '512 × 640 HD',
    description: 'Hot lather razor detailing and herbal beard nourishment.',
    badgeColor: 'from-[#B58938] to-[#825E1A]',
  },
];

export const SalonGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'styling' | 'facials' | 'hair-care' | 'interior'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeTab === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeTab);

  return (
    <section
      id="gallery"
      className="relative py-24 overflow-hidden bg-gradient-to-br from-[#FBE9E6] via-[#FFF8F1] to-[#F4E3EA] border-t border-[#E5CFC3]"
    >
      {/* Ambient Color Orbs */}
      <div className="pointer-events-none absolute top-20 -right-28 w-96 h-96 rounded-full bg-rosegold/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 -left-28 w-96 h-96 rounded-full bg-gold/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-gold/25 to-rosegold/25 text-[#7A444E] border border-rosegold/40 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-rosegold" />
            Visual Portfolio & Transformations
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#22171C] tracking-tight mb-4">
            The ANIQ <span className="text-gradient-luxury">Visual Journey</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5E4E55] leading-relaxed">
            Real transformations, luxury salon ambience, and client styling from our official Instagram studio profile.
          </p>

          <div className="mt-5">
            <a
              href="https://www.instagram.com/aniqstudio_westmarredpally/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white text-xs font-bold tracking-wider uppercase shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <Instagram className="w-4 h-4" />
              Follow @aniqstudio_westmarredpally
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* --- AUTO-SLIDING CONTINUOUS FILMSTRIP REEL --- */}
      <div className="mb-14 py-4 bg-gradient-to-r from-[#261A21] via-[#38252F] to-[#261A21] border-y border-gold/40 shadow-xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-2.5 flex items-center justify-between text-[11px] text-gold-light font-mono uppercase tracking-widest">
          <span className="flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5 text-gold" />
            Live Studio Filmstrip • Hover to Pause & Click Any Frame to Expand
          </span>
          <span>@aniqstudio_westmarredpally</span>
        </div>
        <div className="animate-marquee-reverse flex gap-4 px-4">
          {[...GALLERY_ITEMS, ...GALLERY_ITEMS].map((item, idx) => (
            <div
              key={`${item.id}-reel-${idx}`}
              onClick={() => setSelectedImage(item)}
              className="relative w-56 h-40 rounded-2xl overflow-hidden border border-gold/40 flex-shrink-0 cursor-pointer group"
            >
              <img
                src={item.src}
                alt={item.title}
                width={224}
                height={160}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-serif font-bold text-white truncate">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Tabs */}
        <ScrollReveal
          direction="up"
          className="flex justify-center items-center gap-2.5 mb-12 flex-wrap text-xs"
        >
          {[
            { id: 'all', label: 'All Portfolio' },
            { id: 'styling', label: 'Haircuts & Styling' },
            { id: 'hair-care', label: 'Spa & Treatments' },
            { id: 'facials', label: 'Facials & Skincare' },
            { id: 'interior', label: 'Studio Ambience' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#281C22] to-[#422D38] text-[#F7E29C] shadow-lg scale-105'
                  : 'bg-white/90 border border-[#E5CFC3] text-[#4A3B41] hover:bg-[#F9EFEA]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </ScrollReveal>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredItems.map((item, idx) => (
            <ScrollReveal
              key={item.id}
              direction="up"
              delayMs={(idx % 3) * 90}
              className="h-full"
            >
              <div
                onClick={() => setSelectedImage(item)}
                className="group relative bg-gradient-to-b from-white to-[#FCF2EE] rounded-3xl overflow-hidden border border-[#E8D2C5] shadow-md hover:shadow-2xl hover:border-gold cursor-pointer transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full"
              >
                <div className="relative aspect-[4/4.2] w-full overflow-hidden bg-ivory-100">
                  <img
                    src={item.src}
                    alt={item.title}
                    width={400}
                    height={420}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r ${item.badgeColor} shadow-md`}
                  >
                    {item.resolution}
                  </span>

                  <div className="absolute top-3 right-3 p-2.5 rounded-full bg-charcoal/70 text-white backdrop-blur-md opacity-85 group-hover:opacity-100 group-hover:bg-gold group-hover:text-charcoal transition-all">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-br from-white via-[#FFFDFB] to-[#FBF0EC] border-t border-[#EFE0D6] flex-1 flex flex-col justify-between">
                  <h3 className="font-serif font-bold text-lg text-[#24191E] group-hover:text-[#9E6B20] transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5E4E55] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/85 backdrop-blur-lg animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-cream-50 rounded-3xl overflow-hidden border border-gold/40 shadow-2xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/5] sm:aspect-[16/10] max-h-[70vh] w-full rounded-2xl overflow-hidden bg-black mb-4">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase text-rosegold font-bold">
                  {selectedImage.resolution}
                </span>
                <h3 className="text-lg font-serif font-bold text-charcoal">
                  {selectedImage.title}
                </h3>
                <p className="text-xs text-charcoal-muted">
                  {selectedImage.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-gold to-rosegold text-white text-xs font-bold uppercase tracking-wider shadow-md"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
