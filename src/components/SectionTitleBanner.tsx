import React from 'react';

interface SectionTitleBannerProps {
  title?: string;
  tagline?: string;
}

export const SectionTitleBanner: React.FC<SectionTitleBannerProps> = ({
  title = "THE EDITORIAL DOSSIER",
  tagline = "INDEPENDENT INVESTIGATIVE INQUIRY • DOCUMENTARY RIGOR • PUBLIC ACCOUNTABILITY"
}) => {
  return (
    <div className="w-full bg-[#FAF9F5] border-b border-[rgba(18,19,23,0.08)] select-none py-10 md:py-14 relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center relative z-10">
        
        {/* Luxury Cursive Kicker */}
        <p className="font-cursive text-2xl md:text-3xl text-amber-900 font-medium mb-2 tracking-normal">
          Curated Monthly Compendium
        </p>

        {/* Minimalist Swiss Rule */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="w-12 md:w-24 h-[1px] bg-[#121317]/15" />
          <span className="w-1.5 h-1.5 bg-[#8E7128] rotate-45" />
          <span className="w-12 md:w-24 h-[1px] bg-[#121317]/15" />
        </div>

        <h2 className="font-headline font-black text-[#121317] uppercase tracking-[0.1em] text-2xl sm:text-4xl md:text-5xl leading-tight">
          {title}
        </h2>

        <p className="mt-3 text-[10px] md:text-xs font-sans tracking-[0.28em] text-[#73757C] uppercase max-w-2xl">
          {tagline}
        </p>
      </div>
    </div>
  );
};
