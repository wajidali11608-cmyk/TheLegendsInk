import React from 'react';
import { ArrowUpRight, Quote } from 'lucide-react';

interface DarkSplitFeatureProps {
  onOpenManifesto: () => void;
}

export const DarkSplitFeature: React.FC<DarkSplitFeatureProps> = ({ onOpenManifesto }) => {
  return (
    <section className="w-full bg-[#0F1012] text-[#FBF9F5] select-none border-b border-[rgba(255,255,255,0.1)] relative overflow-hidden py-16 md:py-24">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C59E3F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (span 7 cols): The Founding Creed */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="flex items-center space-x-3 text-xs font-sans tracking-[0.25em] text-[#C59E3F] uppercase font-bold">
              <span className="w-2 h-2 rounded-full bg-[#C59E3F]" />
              <span>THE FOUNDING EDITORIAL CREED</span>
            </div>

            <div className="relative pl-6 border-l-2 border-[#C59E3F]">
              <Quote className="w-8 h-8 text-[#C59E3F]/30 -ml-10 -mt-2 mb-2 rotate-180" />
              <p className="font-editorial italic text-xl sm:text-2xl md:text-3xl text-[#FBF9F5]/90 leading-relaxed">
                "Ink That Speaks The Truth. For a Better, Informed Society. Published from Bandipora and printed in Srinagar, The Legends Ink Monthly questions institutions without hostility and celebrates achievers without flattery. We document the unvarnished realities of Jammu & Kashmir—from remote classroom chalkboards along Wular Lake to the legislative corridors of the Civil Secretariat."
              </p>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <img 
                src="/logo.png" 
                alt="Emblem" 
                className="w-12 h-12 object-contain filter brightness-110"
              />
              <div>
                <h4 className="font-sans font-bold text-sm tracking-wider uppercase text-[#FBF9F5]">
                  PARVAIZ AHMAD RESHI
                </h4>
                <p className="text-xs font-sans tracking-widest uppercase text-[#C59E3F]">
                  OWNER, PUBLISHER & EDITOR-IN-CHIEF
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (span 5 cols): Architectural Callout Box */}
          <div className="lg:col-span-5 bg-[#17181C] border border-white/10 p-8 md:p-12 flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="space-y-4">
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#C59E3F] font-bold block">
                INDEPENDENT PRESS JURISDICTION
              </span>
              <h3 className="font-headline font-black text-2xl uppercase tracking-tight text-[#FBF9F5]">
                CIVIC & INVESTIGATIVE INTEGRITY
              </h3>
              <p className="text-xs font-sans text-white/70 leading-relaxed">
                Registered under the Press and Registration of Books Act. Distributed across all 20 districts of Jammu & Kashmir and Ladakh. Printed at Valley Offset Printers, Srinagar.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">
                MEET THE BOARD
              </span>
              <button
                onClick={onOpenManifesto}
                className="px-6 py-3 bg-[#C59E3F] hover:bg-amber-400 text-[#0F1012] text-xs font-bold uppercase tracking-widest transition-all flex items-center space-x-2"
              >
                <span>Read Charter</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
