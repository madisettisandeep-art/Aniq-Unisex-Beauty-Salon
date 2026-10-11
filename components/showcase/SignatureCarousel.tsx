'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Scissors,
  ShieldCheck,
  Calendar,
  ArrowRight,
  Star,
  Flame,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface SignatureSlide {
  id: string;
  serviceId: string;
  badge: string;
  title: string;
  subtitle: string;
  price: string;
  duration: string;
  image: string;
  accentGradient: string;
}

const SIGNATURE_SLIDES: SignatureSlide[] = [
  {
    id: 'slide-1',
    serviceId: 'gents-haircut-beard-combos',
    badge: 'Most Booked Grooming',
    title: 'Precision Fade & Beard Sculpting',
    subtitle: 'Razor-sharp skin fades paired with hot-towel beard contouring and organic oil finish.',
    price: '₹250',
    duration: '45 mins',
    image: '/images/high_res/post_03_fresh_haircut_1080p.jpg',
    accentGradient: 'from-[#D4AF37] to-[#9A6F1A]',
  },
  {
    id: 'slide-2',
    serviceId: 'facial-special-hydra',
    badge: 'Celebrity Skin Ritual',
    title: 'Special Hydra & 24K Gold Facial',
    subtitle: 'Multi-step vortex hydro-dermabrasion, antioxidant serum infusion, and instant glass-skin radiance.',
    price: '₹2,000',
    duration: '75 mins',
    image: '/images/high_res/reel_11_beauty_care.jpg',
    accentGradient: 'from-[#B76E79] to-[#8E4A55]',
  },
  {
    id: 'slide-3',
    serviceId: 'spa-loreal-smooth',
    badge: 'Mirror Shine Therapy',
    title: 'Silky Smooth Keratin & Hair Spa',
    subtitle: 'Deep lipid reconstruction and steam-infused L’Oréal masque for frizz-free, liquid-silk hair.',
    price: '₹700',
    duration: '60 mins',
    image: '/images/high_res/post_04_silky_smooth_1080p.jpg',
    accentGradient: 'from-[#C88A4B] to-[#965D26]',
  },
  {
    id: 'slide-4',
    serviceId: 'colour-global-highlights',
    badge: 'Haute Colour Studio',
    title: 'Dimensional Balayage & Styling',
    subtitle: 'Ammonia-free global colour, sun-kissed highlights, and bouncy editorial blowout.',
    price: '₹600+',
    duration: '90 mins',
    image: '/images/high_res/post_02_hair_transformation_1080p.jpg',
    accentGradient: 'from-[#8A5A7A] to-[#5E3852]',
  },
  {
    id: 'slide-5',
    serviceId: 'massage-olive-oil',
    badge: 'Deep Stress Relief',
    title: 'Sensory Scalp & Argan Ritual',
    subtitle: 'Reclining shiatsu wash station with warm herbal oil acupressure and steam therapy.',
    price: '₹300',
    duration: '30 mins',
    image: '/images/high_res/reel_06_hair_wash_spa.jpg',
    accentGradient: 'from-[#3B7A67] to-[#235344]',
  },
  {
    id: 'slide-6',
    serviceId: 'tattoo-consultation',
    badge: 'Custom Ink Sanctuary',
    title: 'Bespoke Fine-Line Tattoo Studio',
    subtitle: '1-on-1 custom stencil artistry with 100% single-use medical sterile needles and organic pigments.',
    price: 'Free Consult',
    duration: '30 mins',
    image: '/images/high_res/reel_07_salon_interior.jpg',
    accentGradient: 'from-[#2E2229] to-[#D4AF37]',
  },
];

const MARQUEE_ITEMS = [
  'PRECISION HAIRCUTS & FADES',
  'SPECIAL HYDRA FACIAL ₹2,000',
  '24K GOLD & O3+ BRIDAL GLOW',
  'SILKY SMOOTH L’ORÉAL HAIR SPA',
  'STERILE CUSTOM TATTOO STUDIO',
  'DETAN & BODY POLISHING',
  'WEST MARREDPALLY • SECUNDERABAD',
  '4.7★ VERIFIED GOOGLE RATING',
];

interface SignatureCarouselProps {
  onSelectService: (serviceId: string) => void;
  onOpenBooking: () => void;
}

export const SignatureCarousel: React.FC<SignatureCarouselProps> = ({
  onSelectService,
  onOpenBooking,
}) => {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollToSlide = (index: number) => {
    const track = scrollTrackRef.current;
    if (!track) return;
    const total = SIGNATURE_SLIDES.length;
    const clamped = ((index % total) + total) % total;
    const cardElement = track.children[clamped] as HTMLElement | undefined;
    if (cardElement) {
      track.scrollTo({
        left: cardElement.offsetLeft - 24,
        behavior: 'smooth',
      });
    }
    setActiveSlide(clamped);
  };

  // Auto-advance carousel every 4.2 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      scrollToSlide(activeSlide + 1);
    }, 4200);
    return () => clearInterval(timer);
  }, [activeSlide, isPaused]);

  return (
    <section
      id="brand-intro"
      className="relative z-10 overflow-hidden bg-gradient-to-br from-[#FBEAE7] via-[#FDF5EB] to-[#F4E2E8] border-b border-[#E8D2C5]"
    >
      {/* --- 1. INFINITE LUXURY MARQUEE TICKER --- */}
      <div className="bg-gradient-to-r from-[#21161C] via-[#34212B] to-[#21161C] border-y border-gold/40 py-3.5 overflow-hidden shadow-lg">
        <div className="animate-marquee flex items-center">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center mx-6 whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5 text-gold mr-3 flex-shrink-0" />
              <span className="text-xs font-serif font-bold tracking-[0.22em] text-gold-light uppercase">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* --- AMBIENT GLOWING COLOR ORBS --- */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-br from-rosegold/30 to-blush-300/30 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute top-1/3 -right-24 w-[28rem] h-[28rem] rounded-full bg-gradient-to-tr from-gold/25 to-rosegold/20 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-gradient-to-r from-blush-300/30 to-gold/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        {/* --- 2. SECTION HEADER & SLIDER CONTROLS --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <ScrollReveal direction="left" className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-gold/25 to-rosegold/25 text-[#7A444E] border border-rosegold/40 mb-3 shadow-sm">
              <Flame className="w-3.5 h-3.5 text-rosegold" />
              Trending Studio Experiences
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-charcoal tracking-tight leading-tight">
              Slide Through Our{' '}
              <span className="text-gradient-luxury">Signature Rituals</span>
            </h2>
            <p className="text-sm sm:text-base text-[#594A4E] mt-2 leading-relaxed">
              Swipe or use the arrows to explore West Marredpally’s most requested transformations—crafted with luxury formulas and verified salon pricing.
            </p>
          </ScrollReveal>

          {/* Carousel Navigation Arrows */}
          <ScrollReveal direction="right" className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={() => scrollToSlide(activeSlide - 1)}
              aria-label="Slide left"
              className="w-12 h-12 rounded-full bg-white/90 hover:bg-charcoal text-charcoal hover:text-gold border border-rosegold/30 shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/80 border border-ivory-200">
              {SIGNATURE_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeSlide === idx
                      ? 'w-7 bg-gradient-to-r from-gold to-rosegold'
                      : 'w-2 bg-rosegold/30 hover:bg-rosegold/60'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => scrollToSlide(activeSlide + 1)}
              aria-label="Slide right"
              className="w-12 h-12 rounded-full bg-white/90 hover:bg-charcoal text-charcoal hover:text-gold border border-rosegold/30 shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </ScrollReveal>
        </div>

        {/* --- 3. INTERACTIVE HORIZONTAL SLIDING CARDS TRACK --- */}
        <div
          ref={scrollTrackRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x snap-mandatory"
        >
          {SIGNATURE_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              onClick={() => setActiveSlide(idx)}
              className="snap-start flex-shrink-0 w-[85vw] sm:w-[370px] group relative rounded-3xl overflow-hidden bg-white border border-white/80 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col justify-between"
            >
              {/* Top Image with Rich Color Overlay */}
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  width={370}
                  height={256}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1418]/90 via-[#1E1418]/25 to-transparent" />

                {/* Floating Category Pill */}
                <span
                  className={`absolute top-4 left-4 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white bg-gradient-to-r ${slide.accentGradient} shadow-lg`}
                >
                  {slide.badge}
                </span>

                {/* Floating Price Pill */}
                <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md text-charcoal font-serif font-bold text-base shadow-lg border border-gold/40">
                  {slide.price}
                </div>

                <div className="absolute bottom-4 left-4 right-24 text-white">
                  <span className="text-[11px] text-gold-light font-mono uppercase tracking-wider block">
                    {slide.duration} Session
                  </span>
                  <h3 className="text-xl font-serif font-bold leading-snug drop-shadow">
                    {slide.title}
                  </h3>
                </div>
              </div>

              {/* Card Body with Warm Tinted Surface */}
              <div className="p-6 bg-gradient-to-b from-white via-[#FFFBF8] to-[#FBF0EC] flex-1 flex flex-col justify-between">
                <p className="text-xs text-[#5A4B50] leading-relaxed mb-5">
                  {slide.subtitle}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectService(slide.serviceId);
                  }}
                  className={`w-full py-3 px-5 rounded-2xl bg-gradient-to-r ${slide.accentGradient} text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-xl flex items-center justify-center gap-2 transition-all group-hover: tracking-widest`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book This Ritual</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- 4. THREE COLORFUL LUXURY PILLARS WITH SCROLL-REVEAL --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 pt-2">
          <ScrollReveal direction="up" delayMs={0}>
            <div className="relative overflow-hidden rounded-3xl p-7 bg-gradient-to-br from-[#FFF9EB] via-white to-[#F9EBD2] border border-gold/40 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 h-full">
              <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-gold/20 blur-xl" />
              <div className="w-13 h-13 w-12 h-12 rounded-2xl bg-gradient-to-br from-gold to-[#9E7618] text-white flex items-center justify-center mb-5 shadow-gold">
                <Scissors className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-charcoal mb-2">
                Unisex Hair & Grooming
              </h3>
              <p className="text-xs text-[#5A4B50] leading-relaxed">
                Precision taper fades, classic scissor styling, hot-lather beard sculpting, and customized keratin silk infusions.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delayMs={120}>
            <div className="relative overflow-hidden rounded-3xl p-7 bg-gradient-to-br from-[#FDF0F2] via-white to-[#F7DCE0] border border-rosegold/40 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 h-full">
              <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-rosegold/20 blur-xl" />
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rosegold to-[#8C4652] text-white flex items-center justify-center mb-5 shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-charcoal mb-2">
                Luxury Skin & Hydra Facials
              </h3>
              <p className="text-xs text-[#5A4B50] leading-relaxed">
                Special Hydra therapies, 24K Gold facials, O3+ bridal illuminations, and deep cellular detan rituals for luminous skin.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delayMs={240}>
            <div className="relative overflow-hidden rounded-3xl p-7 bg-gradient-to-br from-[#281C23] via-[#34242D] to-[#1E151B] border border-gold/40 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 text-white h-full">
              <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-gold/25 blur-xl" />
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold to-rosegold text-charcoal flex items-center justify-center mb-5 shadow-gold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gold-light mb-2">
                Sterile Tattoo Sanctuary
              </h3>
              <p className="text-xs text-cream-200/85 leading-relaxed">
                Custom stencil artwork, 100% single-use medical needles, fine-line minimalist ink, and 1-on-1 artist consultations.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

