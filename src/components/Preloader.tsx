import React, { useEffect, useState, useCallback } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleFinish = useCallback(() => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 400);
  }, [onComplete]);

  // Keyboard shortcut listener (ESC, Space, Enter) or click anywhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleFinish();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleFinish]);

  // Reduced motion check
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setIsVisible(false);
      onComplete();
      return;
    }

    // Auto-advance after 1.5 seconds (1-2s range)
    const timer = setTimeout(() => {
      handleFinish();
    }, 1500);

    return () => clearTimeout(timer);
  }, [handleFinish, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      onClick={handleFinish}
      className={`fixed inset-0 z-50 flex flex-col justify-center items-center bg-[#060709] text-[#F7F5F0] select-none cursor-pointer transition-all duration-500 ease-out ${
        isFadingOut ? 'opacity-0 scale-[0.985] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(46, 36, 18, 0.45) 0%, rgba(6, 7, 9, 0.96) 60%, #060709 100%)
        `,
      }}
    >
      {/* ── Central Brand & Motto Showcase ── */}
      <div className="flex flex-col items-center text-center max-w-2xl px-6 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Official Gold Seal Badge with Radiant Ambient Halo */}
        <div className="relative mb-7 group">
          {/* Breathing golden ambient glow */}
          <div className="absolute inset-0 rounded-full bg-[#C59E3F]/20 blur-3xl transform scale-150 animate-pulse pointer-events-none" />

          {/* Thin concentric accent ring */}
          <div className="absolute -inset-2.5 rounded-full border border-[#C59E3F]/25 pointer-events-none" />

          {/* Crest Badge */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-[#8E6C1D] via-[#F5D884] to-[#755513] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(197,158,63,0.3)] transition-transform duration-500 group-hover:scale-105">
            <img
              src="/tli-seal-badge.png"
              alt="The Legends Ink Official Seal"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Regal Masthead Title in Luxury Cinzel Typography */}
        <h1 className="font-luxury font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-[0.24em] sm:tracking-[0.28em] text-transparent bg-clip-text bg-gradient-to-r from-[#F7F5F0] via-[#F4D984] to-[#F7F5F0] drop-shadow-[0_6px_20px_rgba(0,0,0,0.9)]">
          THE LEGENDS INK
        </h1>

        {/* Centered 'MONTHLY' Lockup flanked by fine golden hairlines */}
        <div className="flex items-center justify-center space-x-6 my-4 w-full">
          <span className="w-16 sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-[#C59E3F] to-[#C59E3F]/60" />
          <span className="font-sans font-bold text-[11px] sm:text-xs tracking-[0.5em] uppercase text-[#C59E3F]">
            MONTHLY
          </span>
          <span className="w-16 sm:w-28 h-[1px] bg-gradient-to-l from-transparent via-[#C59E3F] to-[#C59E3F]/60" />
        </div>

        {/* The Founding Motto in Classical Editorial Italic */}
        <p className="font-editorial italic text-base sm:text-xl md:text-2xl text-[#F7F5F0]/90 tracking-wide mt-1 max-w-xl leading-relaxed">
          "Ink That Speaks The Truth. For a Better, Informed Society."
        </p>

      </div>
    </div>
  );
};
