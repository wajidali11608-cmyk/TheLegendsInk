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
    <div className="w-full bg-[#FBF9F5] border-b border-[rgba(15,16,18,0.12)] select-none py-8 md:py-12">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center">
        {/* Subtle decorative gold tick */}
        <div className="flex items-center space-x-3 mb-3">
          <span className="w-8 md:w-16 h-[1px] bg-[rgba(15,16,18,0.2)]" />
          <span className="w-1.5 h-1.5 bg-[#C59E3F] rotate-45" />
          <span className="w-8 md:w-16 h-[1px] bg-[rgba(15,16,18,0.2)]" />
        </div>

        <h2 className="font-headline font-black text-[#0F1012] uppercase tracking-[0.06em] text-2xl sm:text-4xl md:text-5xl leading-tight">
          {title}
        </h2>

        <p className="mt-2 text-xs md:text-sm font-sans tracking-[0.25em] text-[#0F1012]/60 uppercase max-w-2xl">
          {tagline}
        </p>
      </div>
    </div>
  );
};
