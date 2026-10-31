import React from 'react';
import { ArchivedIssue } from '../utils/issueArchive';

interface MastheadProps {
  onOpenArticle: (slug: string) => void;
  activeIssue?: ArchivedIssue | null;
  archivedIssues?: ArchivedIssue[];
  onSwitchIssue?: (issueId: string) => void;
  onOpenCMS?: () => void;
}

export const Masthead: React.FC<MastheadProps> = ({
  activeIssue: _activeIssue,
  archivedIssues: _archivedIssues,
  onSwitchIssue: _onSwitchIssue,
}) => {
  return (
    <div className="w-full bg-[#FAF9F5] text-[#121317] border-b border-[#121317]/08 select-none relative overflow-hidden py-4 sm:py-8 md:py-14">
      {/* Symmetrical fine hairlines and atmospheric warmth */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">

        {/* Tri-Column Symmetrical Swiss Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-4 sm:gap-6 lg:gap-8">

          {/* Left Metadata Column (span 3 on desktop) - Minimal Swiss Editorial */}
          <div className="hidden lg:flex lg:col-span-3 flex-col justify-center space-y-2 border-l border-[#C5A059]/50 pl-5 text-left">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span className="text-[10px] font-sans tracking-[0.28em] text-[#121317]/60 uppercase font-bold">
                KASHMIR VALLEY
              </span>
            </div>
            <span className="font-headline font-bold text-sm text-[#121317] tracking-wide uppercase">
              JOURNAL OF RECORD
            </span>
            <p className="text-sm font-editorial italic text-[#121317]/75 leading-relaxed">
              "Fearless, humane, and locally rooted investigative inquiry."
            </p>
            <div className="pt-0.5 text-[9px] font-mono tracking-wider text-[#121317]/50 uppercase">
              SRINAGAR • BANDIPORA • SONAWARI
            </div>
          </div>

          {/* Center Column (span 6 on desktop): The Master Swiss Brand Lockup */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center text-center">

            {/* The Official Circular Crest Seal Badge */}
            <div className="relative group transition-transform duration-500 hover:scale-105 cursor-pointer mb-1.5 sm:mb-3">
              <div className="relative">
                <img
                  src="/tli-seal-badge.png"
                  alt="The Legends Ink Official Golden Seal"
                  className="w-12 h-12 sm:w-18 sm:h-18 md:w-24 md:h-24 object-contain drop-shadow-[0_8px_24px_rgba(18,19,23,0.12)]"
                />
              </div>
            </div>

            {/* Regal Single-Line Typographic Masthead */}
            <div className="w-full">
              <h1 className="font-luxury font-black uppercase tracking-[0.08em] sm:tracking-[0.20em] md:tracking-[0.24em] text-xl sm:text-3xl md:text-5xl lg:text-6xl text-[#121317] transition-colors leading-tight">
                THE LEGENDS INK
              </h1>

              {/* Centered 'MONTHLY' Lockup flanked by fine golden hairlines */}
              <div className="flex items-center justify-center space-x-2 sm:space-x-6 my-1 sm:my-2.5">
                <span className="w-5 sm:w-20 md:w-32 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-[#121317]/20" />
                <span className="font-sans font-bold text-[8px] sm:text-xs tracking-[0.35em] sm:tracking-[0.45em] uppercase text-[#8F702D]">
                  MONTHLY
                </span>
                <span className="w-5 sm:w-20 md:w-32 h-[1px] bg-gradient-to-l from-transparent via-[#C5A059] to-[#121317]/20" />
              </div>

              {/* Philosophical Motto in Luxury Cursive Calligraphy */}
              <p className="font-cursive text-base sm:text-xl md:text-3xl text-amber-900 font-medium tracking-normal px-2 my-1 sm:my-1.5 leading-snug">
                Ink That Speaks The Truth. For a Better, Informed Society.
              </p>
            </div>

          </div>

          {/* Right Metadata Column (span 3 on desktop) - Minimal Swiss Editorial */}
          <div className="hidden lg:flex lg:col-span-3 flex-col justify-center space-y-2 border-r border-[#C5A059]/50 pr-5 text-right">
            <div className="flex items-center justify-end space-x-2">
              <span className="text-[10px] font-sans tracking-[0.28em] text-[#121317]/60 uppercase font-bold">
                EDITORIAL ARCHIVE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            </div>
            <span className="font-headline font-bold text-sm text-[#121317] tracking-wide uppercase">
              PRINT & DIGITAL
            </span>
            <p className="text-sm font-editorial italic text-[#121317]/75 leading-relaxed">
              Circulated monthly across Jammu & Kashmir and central archives.
            </p>
            <div className="pt-0.5 text-[9px] font-mono tracking-wider text-[#121317]/50 uppercase">
              ISSN: 2583-9985 • RNI REGISTERED
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
