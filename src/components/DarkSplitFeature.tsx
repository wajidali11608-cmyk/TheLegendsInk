import React from 'react';
import { ArrowUpRight, Quote, Shield } from 'lucide-react';

interface DarkSplitFeatureProps {
  onOpenManifesto: () => void;
}

export const DarkSplitFeature: React.FC<DarkSplitFeatureProps> = ({ onOpenManifesto }) => {
  return (
    <section className="w-full bg-[#FAF9F5] text-[#121317] select-none border-b border-[#121317]/08 relative overflow-hidden py-8 sm:py-16 md:py-24">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A059]/05 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center">
          
          {/* Left Column (span 7 cols): The Founding Creed */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-7">
            <div className="flex items-center space-x-2.5 text-xs font-mono tracking-[0.25em] text-[#8F702D] uppercase font-bold">
              <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
              <span>THE FOUNDING EDITORIAL CREED</span>
            </div>

            <div className="relative pl-4 sm:pl-8 border-l-2 border-amber-600">
              <Quote className="w-5 h-5 sm:w-7 sm:h-7 text-amber-500/40 -ml-7 sm:-ml-10 -mt-1 sm:-mt-2 mb-1 sm:mb-2 rotate-180" />
              <p className="font-cursive text-xl sm:text-3xl md:text-4xl text-amber-900 font-medium leading-snug mb-2 sm:mb-3">
                "Ink That Speaks The Truth. For a Better, Informed Society."
              </p>
              <p className="font-editorial italic text-xs sm:text-base md:text-xl text-[#121317]/85 leading-relaxed line-clamp-3 md:line-clamp-none">
                Published from Bandipora and printed in Srinagar, The Legends Ink Monthly questions institutions without hostility and celebrates achievers without flattery. We document the unvarnished realities of Jammu & Kashmir—from remote classrooms along Wular Lake to administrative corridors across the region.
              </p>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4 pt-1 sm:pt-2">
              <img 
                src="/tli-seal-badge.png" 
                alt="Emblem" 
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              />
              <div>
                <h4 className="font-sans font-bold text-xs sm:text-sm tracking-wider uppercase text-[#121317]">
                  PARVAIZ AHMAD RESHI
                </h4>
                <p className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-amber-800 font-semibold">
                  OWNER, PUBLISHER & EDITOR-IN-CHIEF
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (span 5 cols): Architectural Bento Callout Box in Saffron Silk */}
          <div className="lg:col-span-5 bento-card bento-saffron p-5 sm:p-8 md:p-10 flex flex-col justify-between space-y-4 sm:space-y-6 shadow-sm">
            <div className="space-y-2.5 sm:space-y-3.5">
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.25em] uppercase text-amber-800 font-bold">
                <Shield className="w-3.5 h-3.5 text-amber-600" />
                <span>INDEPENDENT PRESS JURISDICTION</span>
              </div>
              <h3 className="font-headline font-black text-xl sm:text-2xl uppercase tracking-tight text-[#121317]">
                CIVIC &amp; INVESTIGATIVE INTEGRITY
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#4A4C54] leading-relaxed">
                Registered under the Press and Registration of Books Act. Circulated monthly across all districts of Jammu &amp; Kashmir and central archival libraries.
              </p>
            </div>

            <div className="pt-3.5 sm:pt-5 border-t border-amber-900/10 flex items-center justify-between">
              <span className="text-[9.5px] sm:text-[10px] font-mono tracking-widest uppercase text-amber-900/60 font-semibold">
                EDITORIAL PROTOCOL
              </span>
              <button
                onClick={onOpenManifesto}
                className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[#121317] hover:bg-amber-800 text-[#FAF9F5] text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center space-x-2 cursor-pointer shadow-2xs rounded-sm"
              >
                <span>Read Charter</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
