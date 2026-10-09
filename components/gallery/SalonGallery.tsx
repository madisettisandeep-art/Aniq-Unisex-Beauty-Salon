'use client';

import React, { useState } from 'react';
import { Sparkles, Instagram, ExternalLink, Maximize2 } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'styling' | 'facials' | 'interior' | 'hair-care';
  src: string;
  resolution: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Signature Hair Care & Blow Dry',
    category: 'styling',
    src: '/images/high_res/post_01_hair_care_1080p.jpg',
    resolution: '1080 × 1350 Ultra-HD',
    description: 'Expert volume blowout and nourished glossy hair texture.'
  },
  {
    id: 'g-2',
    title: 'Balayage & Hair Transformation',
    category: 'hair-care',
    src: '/images/high_res/post_02_hair_transformation_1080p.jpg',
    resolution: '1080 × 1350 Ultra-HD',
    description: 'Dimensional color tones and precision layered finish.'
  },
  {
    id: 'g-3',
    title: 'Modern Fade & Sharp Beard Sculpting',
    category: 'styling',
    src: '/images/high_res/post_03_fresh_haircut_1080p.jpg',
    resolution: '1080 × 1350 Ultra-HD',
    description: 'Crisp taper fade, clean edge-up, and beard contouring.'
  },
  {
    id: 'g-4',
    title: 'Silky Smooth Keratin Spa',
    category: 'hair-care',
    src: '/images/high_res/post_04_silky_smooth_1080p.jpg',
    resolution: '1080 × 1350 Ultra-HD',
    description: 'Frizz-free silk infusion providing months of mirror shine.'
  },
  {
    id: 'g-5',
    title: 'Bespoke Studio Styling & Cut',
    category: 'styling',
    src: '/images/high_res/post_05_salon_style_1080p.jpg',
    resolution: '1080 × 1350 Ultra-HD',
    description: 'Contemporary hair shaping customized to facial features.'
  },
  {
    id: 'g-6',
    title: 'Luxury Styling Floor & Mirrors',
    category: 'interior',
    src: '/images/high_res/reel_07_salon_interior.jpg',
    resolution: '640 × 1136 HD',
    description: 'Illuminated golden arched mirrors, leather barber chairs, and luxury flooring.'
  },
  {
    id: 'g-7',
    title: 'Special Hydra Skincare Suite',
    category: 'facials',
    src: '/images/high_res/reel_11_beauty_care.jpg',
    resolution: '512 × 640 HD',
    description: 'Relaxing facial treatment beds with advanced skin hydration equipment.'
  },
  {
    id: 'g-8',
    title: 'Sensory Hair Spa & Scalp Cleansing',
    category: 'hair-care',
    src: '/images/high_res/reel_06_hair_wash_spa.jpg',
    resolution: '512 × 640 HD',
    description: 'Reclining shampoo stations with hot towel massage therapy.'
  },
  {
    id: 'g-9',
    title: 'Precision Beard Grooming Session',
    category: 'styling',
    src: '/images/high_res/reel_04_beard_grooming.jpg',
    resolution: '512 × 640 HD',
    description: 'Hot lather razor detailing and herbal beard nourishment.'
  }
];

export const SalonGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'styling' | 'facials' | 'hair-care' | 'interior'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = activeTab === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeTab);

  return (
    <section id="gallery" className="py-24 bg-cream-50 border-t border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-gold/15 text-gold border border-gold/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Visual Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-charcoal tracking-tight mb-4">
            The ANIQ Visual Journey
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted font-light leading-relaxed">
            Real transformations, luxury salon ambience, and client styling from our official Instagram studio profile.
          </p>

          <div className="mt-4">
            <a
              href="https://www.instagram.com/aniqstudio_westmarredpally/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-gold hover:text-gold-hover transition-colors"
            >
              <Instagram className="w-4 h-4" />
              Follow @aniqstudio_westmarredpally
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center items-center gap-2 mb-12 flex-wrap text-xs">
          {[
            { id: 'all', label: 'All Portfolio' },
            { id: 'styling', label: 'Haircuts & Styling' },
            { id: 'hair-care', label: 'Spa & Treatments' },
            { id: 'facials', label: 'Facials & Skincare' },
            { id: 'interior', label: 'Studio Ambience' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-charcoal text-white shadow-sm'
                  : 'bg-white border border-ivory-200 text-charcoal hover:border-beige'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative bg-white rounded-3xl overflow-hidden border border-ivory-200 shadow-sm hover:shadow-luxury cursor-pointer transition-all duration-300"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory-100">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold mb-1">
                    {item.resolution}
                  </span>
                  <h3 className="font-serif font-bold text-base mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-cream-100/80 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="absolute top-3 right-3 p-2 rounded-full bg-charcoal/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-lg animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-cream-50 rounded-3xl overflow-hidden border border-ivory-200 shadow-2xl p-4 sm:p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative aspect-[4/5] sm:aspect-[16/10] max-h-[70vh] w-full rounded-2xl overflow-hidden bg-black mb-4">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-gold font-bold">
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
                className="px-4 py-2 rounded-full bg-charcoal text-white text-xs font-medium"
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

