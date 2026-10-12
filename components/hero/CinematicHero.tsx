'use client';

import React, { useEffect, useRef, useState } from 'react';
import { VIDEO_MANIFEST, VideoScene } from '@/lib/data/video-manifest';
import { Calendar, ChevronDown, MessageSquare, Volume2, VolumeX, Sparkles } from 'lucide-react';
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
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Throttled scroll listener using requestAnimationFrame to eliminate unnecessary re-renders
  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      ticking = false;
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrollableDistance = containerHeight - windowHeight;
      if (scrollableDistance <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / scrollableDistance, 0), 1);

      // Quantize progress to 1% steps to avoid 60fps React tree re-renders
      const quantizedProgress = Math.round(progress * 100) / 100;
      setScrollProgress((prev) => (prev === quantizedProgress ? prev : quantizedProgress));

      const totalScenes = VIDEO_MANIFEST.length;
      const sceneIndex = Math.min(Math.floor(progress * totalScenes), totalScenes - 1);
      setActiveSceneIndex((prev) => (prev === sceneIndex ? prev : sceneIndex));
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollState();

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
      style={{ height: isMobile ? '350vh' : '550vh' }}
    >
      {/* Pinned Viewport Container with pt-20 clearance below the transparent 80px Navbar */}
      <div className="sticky top-0 w-full h-screen pt-20 overflow-hidden flex flex-col justify-between select-none">
        {/* --- BACKGROUND VIDEO PLAYERS (All 11 clips preloaded & crossfaded) --- */}
        <div className="absolute inset-0 w-full h-full bg-charcoal z-0 overflow-hidden">
          {VIDEO_MANIFEST.map((scene, idx) => {
            const isActive = idx === activeSceneIndex;
            const shouldLoad = Math.abs(idx - activeSceneIndex) <= 1;

            return (
              <div
                key={scene.id}
                className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-700 ease-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                {/* Poster Frame Fallback (scaled to crop out bottom-right Flow watermark) */}
                <img
                  src={scene.posterSrc}
                  alt={scene.title}
                  className={`absolute inset-0 w-full h-full object-cover scale-[1.16] origin-[35%_20%] transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />

                {/* Video Tag (scaled to crop out bottom-right Google Flow watermark across all 11 clips) */}
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
                    className="absolute inset-0 w-full h-full object-cover scale-[1.16] origin-[35%_20%]"
                  />
                )}

                {/* Ultra-subtle edge-only vignette so the center of the video is 100% crystal clear */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* --- OPEN VIEWPORT CANVAS (No center text blocking the 11-part film) --- */}
        <div className="flex-1 pointer-events-none" />

        {/* --- UNIFIED COMPACT BOTTOM LOWER-THIRD CINEMA HUD --- */}
        {/* Anchored at the very bottom edge with right clearance for the WhatsApp pill so the video center is 100% clear */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 pb-4 sm:pr-56">
          <div className="bg-black/45 hover:bg-black/60 transition-colors duration-300 border border-gold/30 backdrop-blur-md rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 lg:gap-5">
              {/* Left: Scene Thumbnail + Chapter Badge + Scene Title & Subtitle */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden border border-gold/50 flex-shrink-0 hidden sm:block shadow-md">
                  <img
                    src={activeScene.posterSrc}
                    alt={activeScene.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1 text-left">
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-gold-champagne mb-0.5">
                    <Sparkles className="w-3 h-3 text-gold flex-shrink-0" />
                    <span className="font-semibold text-gold">
                      Scene {activeScene.part}/11
                    </span>
                    <span className="text-white/40">•</span>
                    <span className="text-cream-100 font-semibold">{activeScene.category}</span>
                    <span className="text-white/40 hidden md:inline">•</span>
                    <span className="text-cream-200/80 hidden md:inline truncate">
                      West Marredpally, Secunderabad
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2.5 min-w-0">
                    <h1 className="text-base sm:text-xl md:text-2xl font-serif font-bold text-white tracking-tight truncate drop-shadow">
                      {activeScene.title}
                    </h1>
                    <p className="text-[11px] sm:text-xs text-cream-100/85 font-light truncate hidden sm:block">
                      — {activeScene.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Center: Compact Gold Scroll Progress Bar */}
              <div className="w-full lg:w-44 xl:w-52 hidden md:flex flex-col gap-1 flex-shrink-0">
                <div className="flex justify-between text-[9px] text-cream-200/85 font-mono uppercase tracking-wider">
                  <span>01 Exterior</span>
                  <span className="text-gold font-bold">{Math.round(scrollProgress * 100)}%</span>
                  <span>11 Finale</span>
                </div>
                <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-light via-gold to-rosegold rounded-full transition-all duration-150 ease-out"
                    style={{ width: `${Math.max(scrollProgress * 100, 5)}%` }}
                  />
                </div>
              </div>

              {/* Right: Compact Action Buttons & Audio/Skip Controls */}
              <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 flex-shrink-0">
                <button
                  onClick={onOpenBooking}
                  className="whitespace-nowrap inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-gold to-gold-hover text-charcoal font-bold text-[11px] uppercase tracking-wider shadow-gold hover:brightness-105 transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment</span>
                </button>

                <a
                  href={buildWhatsAppUrl("Hello ANIQ Salon, I would like to book an appointment at your West Marredpally studio.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap hidden xl:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-[11px] uppercase tracking-wider border border-white/25 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                  title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-cream-100 border border-white/20 text-[11px] font-medium transition-all hover:border-gold/60"
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-cream-200" />
                      <span className="hidden sm:inline">Muted</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-gold" />
                      <span className="hidden sm:inline text-gold">Sound</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleSkipToContent}
                  className="whitespace-nowrap inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-cream-100 hover:text-gold bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all"
                >
                  <span>Skip</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gold" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
