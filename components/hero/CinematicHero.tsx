'use client';

import React, { useEffect, useRef, useState } from 'react';
import { VIDEO_MANIFEST, VideoScene } from '@/lib/data/video-manifest';
import { AniqLogo } from '@/components/brand/AniqLogo';
import { Calendar, ChevronDown, MessageSquare, Volume2, VolumeX, Sparkles, Scissors, Clock } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface CinematicHeroProps {
  onOpenBooking: () => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({ onOpenBooking }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Video element refs for preloading and smooth crossfades
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll listener tracking scroll percentage through hero container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      const scrollableDistance = containerHeight - windowHeight;
      if (scrollableDistance <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / scrollableDistance, 0), 1);
      
      setScrollProgress(progress);

      // Determine active scene (11 scenes, mapped evenly across progress 0..1)
      const totalScenes = VIDEO_MANIFEST.length;
      const sceneIndex = Math.min(Math.floor(progress * totalScenes), totalScenes - 1);
      setActiveSceneIndex(sceneIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pause playback when tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        videoRefs.current.forEach(v => v?.pause());
      } else {
        const currentVideo = videoRefs.current[activeSceneIndex];
        if (currentVideo) {
          currentVideo.play().catch(() => {});
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [activeSceneIndex]);

  // Manage video play/pause sync across scenes
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === activeSceneIndex) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else if (Math.abs(idx - activeSceneIndex) > 1) {
        video.pause();
      }
    });
  }, [activeSceneIndex]);

  const activeScene: VideoScene = VIDEO_MANIFEST[activeSceneIndex] || VIDEO_MANIFEST[0];

  const handleSkipToContent = () => {
    const target = document.getElementById('brand-intro');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      id="hero-scroll-container"
      className="relative w-full bg-cream-50"
      // Container height gives 600vh scroll space on desktop, 350vh on mobile
      style={{ height: isMobile ? '350vh' : '550vh' }}
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between select-none">
        {/* --- BACKGROUND VIDEO PLAYERS (All 11 clips preloaded & crossfaded) --- */}
        <div className="absolute inset-0 w-full h-full bg-charcoal z-0">
          {VIDEO_MANIFEST.map((scene, idx) => {
            const isActive = idx === activeSceneIndex;
            // Preload current, previous, and next videos
            const shouldLoad = Math.abs(idx - activeSceneIndex) <= 1;

            return (
              <div
                key={scene.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                {/* Poster Frame Fallback */}
                <img
                  src={scene.posterSrc}
                  alt={scene.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />

                {/* Video Tag */}
                {!prefersReducedMotion && shouldLoad && (
                  <video
                    ref={(el) => { videoRefs.current[idx] = el; }}
                    src={scene.videoSrc}
                    poster={scene.posterSrc}
                    autoPlay={isActive}
                    loop
                    muted={isMuted}
                    playsInline
                    preload={idx === 0 ? 'auto' : 'metadata'}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                {/* Atmospheric Warm Luxury Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/35 to-charcoal/60 mix-blend-multiply" />
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/50" />
                <div className="absolute inset-0 bg-gold/5 mix-blend-screen pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* --- TOP BAR / HUD OVERLAY --- */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-gold/20 text-gold border border-gold/30 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              West Marredpally, Secunderabad
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Audio Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
              className="p-2.5 rounded-full bg-charcoal/60 hover:bg-charcoal/80 text-cream-100 border border-white/20 backdrop-blur-md transition-all hover:border-gold/60"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-gold" />}
            </button>

            {/* Skip To Content */}
            <button
              onClick={handleSkipToContent}
              className="px-4 py-2 text-xs font-medium tracking-wider text-cream-200 hover:text-white bg-charcoal/50 hover:bg-charcoal/70 border border-white/15 rounded-full backdrop-blur-md transition-all"
            >
              Skip Intro
            </button>
          </div>
        </div>

        {/* --- CENTER / HERO CONTENT OVERLAY --- */}
        <div className="relative z-20 w-full max-w-5xl mx-auto px-6 text-center my-auto">
          {/* Chapter indicator */}
          <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full bg-black/40 border border-gold/40 backdrop-blur-md text-gold text-xs font-mono uppercase tracking-widest">
            <span>Scene {activeScene.part} of {VIDEO_MANIFEST.length}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
            <span>{activeScene.category}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight drop-shadow-xl mb-3 transition-all duration-500">
            {activeScene.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-gold-champagne font-light max-w-2xl mx-auto drop-shadow-md mb-2">
            {activeScene.subtitle}
          </p>

          <p className="text-xs sm:text-sm text-cream-200/80 max-w-xl mx-auto hidden sm:block mb-8">
            {activeScene.description}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-gold to-gold-hover text-charcoal font-semibold text-sm tracking-wide shadow-gold hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </button>

            <a
              href={buildWhatsAppUrl("Hello ANIQ Salon, I would like to book an appointment at your West Marredpally studio.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-medium text-sm tracking-wide border border-white/30 backdrop-blur-md transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              WhatsApp Booking
            </a>
          </div>
        </div>

        {/* --- BOTTOM SCROLL PROGRESS DOCK --- */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-6">
          <div className="bg-charcoal/65 border border-white/15 backdrop-blur-xl rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Scene Thumbnail / Title Preview */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-gold/40 flex-shrink-0 relative">
                <img
                  src={activeScene.posterSrc}
                  alt={activeScene.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-mono uppercase tracking-wider text-gold">
                  Part {activeScene.part} • {activeScene.sceneName}
                </div>
                <div className="text-xs text-white font-medium truncate max-w-[240px] sm:max-w-xs">
                  {activeScene.title}
                </div>
              </div>
            </div>

            {/* Continuous Gold Scroll Progress Line */}
            <div className="flex-1 w-full max-w-md mx-auto hidden sm:flex flex-col gap-1.5">
              <div className="flex justify-between text-[10px] text-cream-200/70 font-mono">
                <span>01 Exterior</span>
                <span>{Math.round(scrollProgress * 100)}% Progress</span>
                <span>11 Brand Finale</span>
              </div>
              <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold-light via-gold to-rosegold rounded-full transition-all duration-150 ease-out"
                  style={{ width: `${Math.max(scrollProgress * 100, 5)}%` }}
                />
              </div>
            </div>

            {/* Scroll Indicator Prompt */}
            <div className="flex items-center gap-2 text-xs text-cream-200/80 font-medium">
              <span className="hidden lg:inline">Scroll to Experience</span>
              <ChevronDown className="w-4 h-4 text-gold animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

