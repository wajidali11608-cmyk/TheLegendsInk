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
    <div className="w-full bg-[#FBF9F5] text-[#0F1012] border-b border-[rgba(15,16,18,0.12)] select-none relative overflow-hidden py-6 sm:py-8 md:py-12">
      {/* Symmetrical fine hairlines and atmospheric warmth */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">

        {/* Tri-Column Symmetrical Swiss Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-8">

          {/* Left Metadata Column (span 3 on desktop) - Minimal Swiss Editorial */}
          <div className="hidden lg:flex lg:col-span-3 flex-col justify-center space-y-2 border-l-2 border-[#C59E3F] pl-5 text-left">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59E3F]" />
              <span className="text-[10px] font-sans tracking-[0.28em] text-[#0F1012]/60 uppercase font-bold">
                KASHMIR VALLEY
              </span>
            </div>
            <span className="font-headline font-bold text-sm text-[#0F1012] tracking-wide uppercase">
              JOURNAL OF RECORD
            </span>
            <p className="text-[11px] font-editorial italic text-[#0F1012]/75 leading-relaxed">
              "Dedicated to fearless, humane, and locally rooted journalism."
            </p>
            <div className="pt-0.5 text-[9.5px] font-mono tracking-wider text-[#0F1012]/50 uppercase">
              FOUNDED IN BANDIPORA & SRINAGAR
            </div>
          </div>

          {/* Center Column (span 6 on desktop): The Master Swiss Brand Lockup */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center text-center">

            {/* The Official Circular Crest Seal Badge */}
            <div className="relative group transition-transform duration-500 hover:scale-105 cursor-pointer mb-2.5 sm:mb-3">
              <div className="relative">
                <img
                  src="/tli-seal-badge.png"
                  alt="The Legends Ink Official Golden Seal"
                  className="w-16 h-16 sm:w-22 sm:h-22 md:w-28 md:h-28 object-contain drop-shadow-[0_8px_20px_rgba(15,16,18,0.18)]"
                />
              </div>
            </div>

            {/* Regal Single-Line Typographic Masthead */}
            <div className="w-full">
              <h1 className="font-luxury font-black uppercase tracking-[0.14em] sm:tracking-[0.18em] md:tracking-[0.22em] text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0F1012] transition-colors leading-tight">
                THE LEGENDS INK
              </h1>

              {/* Centered 'MONTHLY' Lockup flanked by fine golden hairlines */}
              <div className="flex items-center justify-center space-x-3 sm:space-x-6 my-2 sm:my-2.5">
                <span className="w-8 sm:w-20 md:w-32 h-[1px] bg-gradient-to-r from-transparent via-[#C59E3F] to-[#0F1012]/30" />
                <span className="font-sans font-bold text-[9px] sm:text-xs tracking-[0.45em] uppercase text-[#C59E3F]">
                  MONTHLY
                </span>
                <span className="w-8 sm:w-20 md:w-32 h-[1px] bg-gradient-to-l from-transparent via-[#C59E3F] to-[#0F1012]/30" />
              </div>

              {/* Philosophical Motto in Classical Editorial Italic */}
              <p className="font-editorial italic text-sm sm:text-base md:text-xl text-[#0F1012]/85 tracking-wide px-2">
                "Ink That Speaks The Truth. For a Better, Informed Society."
              </p>
            </div>

          </div>

          {/* Right Metadata Column (span 3 on desktop) - Minimal Swiss Editorial */}
          <div className="hidden lg:flex lg:col-span-3 flex-col justify-center space-y-2 border-r-2 border-[#C59E3F] pr-5 text-right">
            <div className="flex items-center justify-end space-x-2">
              <span className="text-[10px] font-sans tracking-[0.28em] text-[#0F1012]/60 uppercase font-bold">
                EDITORIAL ARCHIVE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59E3F]" />
            </div>
            <span className="font-headline font-bold text-sm text-[#0F1012] tracking-wide uppercase">
              PRINT & DIGITAL
            </span>
            <p className="text-[11px] font-editorial italic text-[#0F1012]/75 leading-relaxed">
              Circulated monthly across Jammu & Kashmir and central repositories.
            </p>
            <div className="pt-0.5 text-[9.5px] font-mono tracking-wider text-[#0F1012]/50 uppercase">
              ISSN: 2583-9985 • RNI REGISTERED
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
