'use client';

import React, { useEffect, useRef, useState } from 'react';
import { VIDEO_MANIFEST, VideoScene } from '@/lib/data/video-manifest';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';

interface CinematicHeroProps {
  onOpenBooking: () => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({ onOpenBooking }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isHeroInView, setIsHeroInView] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Video element refs for preloading and strict single-scene audio control
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const prevSceneIndexRef = useRef<number>(0);

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

      // Check whether the hero section is still visible in the viewport
      const inView = rect.bottom > 120 && rect.top < windowHeight;
      setIsHeroInView((prev) => (prev === inView ? prev : inView));

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

  // Pause and silence all playback when browser tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        videoRefs.current.forEach((v) => {
          if (!v) return;
          v.muted = true;
          v.pause();
        });
      } else if (isHeroInView) {
        const currentVideo = videoRefs.current[activeSceneIndex];
        if (currentVideo) {
          currentVideo.muted = isMuted;
          currentVideo.volume = isMuted ? 0 : 1;
          currentVideo.play().catch(() => {});
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [activeSceneIndex, isMuted, isHeroInView]);

  // Strict single-slide video & audio synchronization:
  // Only the activeSceneIndex (when hero is in view) can play or produce sound.
  // Every other slide is immediately paused, muted, and rewound.
  useEffect(() => {
    const sceneChanged = prevSceneIndexRef.current !== activeSceneIndex;
    prevSceneIndexRef.current = activeSceneIndex;

    videoRefs.current.forEach((video, idx) => {
      if (!video) return;

      if (idx === activeSceneIndex && isHeroInView && !document.hidden) {
        video.muted = isMuted;
        video.volume = isMuted ? 0 : 1;
        if (sceneChanged) {
          video.currentTime = 0;
        }
        video.play().catch(() => {});
      } else {
        video.muted = true;
        video.volume = 0;
        if (!video.paused) {
          video.pause();
        }
        video.currentTime = 0;
      }
    });
  }, [activeSceneIndex, isMuted, isHeroInView]);

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

                {/* Video Tag (strictly muted & paused unless this exact slide is active) */}
                {!prefersReducedMotion && shouldLoad && (
                  <video
                    ref={(el) => {
                      videoRefs.current[idx] = el;
                      if (el && (idx !== activeSceneIndex || !isHeroInView)) {
                        el.muted = true;
                        el.volume = 0;
                        if (!el.paused) el.pause();
                      }
                    }}
                    src={scene.videoSrc}
                    poster={scene.posterSrc}
                    autoPlay={isActive && isHeroInView}
                    loop
                    muted={isMuted || !isActive || !isHeroInView}
                    playsInline
                    preload={idx === 0 ? 'auto' : 'metadata'}
                    className="absolute inset-0 w-full h-full object-cover scale-[1.16] origin-[35%_20%]"
                  />
                )}

                {/* Subtle top-edge only gradient so transparent navbar links stay legible while 100% of the video is crystal clear */}
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/35 to-transparent pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* --- ULTRA-THIN TRANSPARENT VERTICAL SEQUENCE LINE & MUTE BUTTON (LEFT EDGE) --- */}
        <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2.5 select-none">
          {/* Active Scene Number (01 - 11) */}
          <span className="text-[10px] font-mono font-bold tracking-widest text-gold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            {activeScene.part}
          </span>

          {/* Vertical Thin Sequence Line */}
          <div className="w-[2px] h-28 sm:h-36 bg-white/25 rounded-full overflow-hidden relative shadow-[0_0_8px_rgba(0,0,0,0.5)]">
            <div
              className="w-full bg-gradient-to-b from-gold-light via-gold to-rosegold rounded-full transition-all duration-150 ease-out"
              style={{ height: `${Math.max(scrollProgress * 100, 6)}%` }}
            />
          </div>

          {/* Total Scenes (11) */}
          <span className="text-[10px] font-mono font-medium tracking-widest text-white/75 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            11
          </span>

          {/* Transparent Mute / Unmute Icon Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="mt-1 w-8 h-8 rounded-full bg-black/20 hover:bg-black/45 text-white border border-white/25 hover:border-gold/70 backdrop-blur-[2px] flex items-center justify-center transition-all shadow-sm"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-white/90" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-gold" />
            )}
          </button>

          {/* Transparent Skip-Down Icon Button */}
          <button
            onClick={handleSkipToContent}
            aria-label="Skip intro to content"
            title="Skip to Content"
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/45 text-white/85 hover:text-gold border border-white/20 hover:border-gold/70 backdrop-blur-[2px] flex items-center justify-center transition-all shadow-sm"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
