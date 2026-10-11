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

                {/* Lighter Atmospheric Overlay so video is crystal clear through the transparent navbar */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/30 pointer-events-none" />
                <div className="absolute inset-0 bg-gold/5 mix-blend-screen pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* --- CENTER / HERO CONTENT OVERLAY --- */}
        <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center my-auto py-6">
          {/* Location & Chapter Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-black/50 border border-gold/45 backdrop-blur-md text-gold text-xs font-mono uppercase tracking-widest shadow-lg">
            <span className="inline-flex items-center gap-1.5 font-sans font-semibold text-gold-champagne">
              <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
              West Marredpally, Secunderabad
            </span>
            <span className="text-white/30">•</span>
            <span>Scene {activeScene.part} of {VIDEO_MANIFEST.length}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
            <span className="text-cream-100">{activeScene.category}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)] mb-3 transition-all duration-500">
            {activeScene.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-gold-champagne font-light max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)] mb-2">
            {activeScene.subtitle}
          </p>

          <p className="text-xs sm:text-sm text-cream-100/95 max-w-xl mx-auto hidden sm:block mb-8 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
            {activeScene.description}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <button
              onClick={onOpenBooking}
              className="whitespace-nowrap inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-gold to-gold-hover text-charcoal font-bold text-xs sm:text-sm uppercase tracking-wider shadow-gold hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </button>

            <a
              href={buildWhatsAppUrl("Hello ANIQ Salon, I would like to book an appointment at your West Marredpally studio.")}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-black/50 hover:bg-black/75 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider border border-white/35 backdrop-blur-md transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              WhatsApp Booking
            </a>
          </div>
        </div>

        {/* --- BOTTOM SCROLL PROGRESS & PLAYBACK DOCK --- */}
        {/* Constrained width and right margin clearance so it never overlaps the bottom-right WhatsApp pill */}
        <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-5 sm:pr-56">
          <div className="bg-charcoal/80 border border-white/15 backdrop-blur-xl rounded-2xl px-4 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
            {/* Left: Scene Thumbnail & Title Preview */}
            <div className="flex items-center gap-3 w-full md:w-auto min-w-0">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-gold/40 flex-shrink-0 relative">
                <img
                  src={activeScene.posterSrc}
                  alt={activeScene.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left min-w-0 flex-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-gold truncate">
                  Part {activeScene.part} • {activeScene.sceneName}
                </div>
                <div className="text-xs text-white font-medium truncate">
                  {activeScene.title}
                </div>
              </div>
            </div>

            {/* Center: Continuous Gold Scroll Progress Line */}
            <div className="flex-1 w-full max-w-sm mx-auto hidden sm:flex flex-col gap-1.5 px-2">
              <div className="flex justify-between text-[10px] text-cream-200/75 font-mono">
                <span>01 Exterior</span>
                <span className="text-gold font-semibold">{Math.round(scrollProgress * 100)}% Scroll</span>
                <span>11 Finale</span>
              </div>
              <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold-light via-gold to-rosegold rounded-full transition-all duration-150 ease-out"
                  style={{ width: `${Math.max(scrollProgress * 100, 5)}%` }}
                />
              </div>
            </div>

            {/* Right: Audio Toggle & Skip Intro Controls */}
            <div className="flex items-center justify-end gap-2.5 flex-shrink-0 w-full md:w-auto border-t md:border-t-0 border-white/10 pt-2.5 md:pt-0">
              <button
                onClick={() => setIsMuted(!isMuted)}
                aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-cream-100 border border-white/15 text-[11px] font-medium transition-all hover:border-gold/60"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-cream-200" />
                    <span className="hidden lg:inline">Muted</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-gold" />
                    <span className="hidden lg:inline text-gold">Sound On</span>
                  </>
                )}
              </button>

              <button
                onClick={handleSkipToContent}
                className="whitespace-nowrap inline-flex items-center gap-1 px-3.5 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-cream-100 hover:text-gold bg-white/10 hover:bg-white/20 border border-white/15 rounded-full transition-all"
              >
                <span>Skip Intro</span>
                <ChevronDown className="w-3.5 h-3.5 text-gold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
