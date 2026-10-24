import React from 'react';
import { ArrowUpRight, Check, ShieldCheck } from 'lucide-react';

interface LandingSubscriptionSectionProps {
  onOpenSubscribe: () => void;
}

export const LandingSubscriptionSection: React.FC<LandingSubscriptionSectionProps> = ({
  onOpenSubscribe,
}) => {
  return (
    <section className="w-full bg-[#FAF8F3] py-16 md:py-24 border-b border-[rgba(15,16,18,0.12)]">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2 text-[10px] font-sans tracking-[0.25em] text-[#C59E3F] uppercase font-bold mb-3">
            <span>THE PATRON CIRCLE</span>
          </div>
          <h2 className="font-headline font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#0F1012]">
            SUPPORT INDEPENDENT JOURNALISM IN J&K
          </h2>
          <p className="mt-3 text-xs sm:text-sm font-editorial italic text-[#0F1012]/75 max-w-xl mx-auto">
            "Questioning institutions without hostility, celebrating achievers without flattery. Delivered directly to your doorstep and digital library."
          </p>
        </div>

        {/* 3 Prominent Featured Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {/* Tier 1: Single Issue */}
          <div className="p-8 bg-[#FBF9F5] border border-[rgba(15,16,18,0.12)] flex flex-col justify-between hover:border-[#0F1012] transition-all duration-300">
            <div>
              <span className="text-[10px] font-sans font-bold tracking-widest text-[#0F1012]/60 uppercase bg-[#0F1012]/5 px-2.5 py-1">
                SINGLE ISSUE
              </span>
              <div className="mt-4">
                <span className="font-headline font-black text-3xl text-[#0F1012]">Rs. 50</span>
                <span className="text-xs font-sans text-[#0F1012]/60 block mt-0.5">October 2026 Print Journal</span>
              </div>
              <p className="mt-4 text-xs font-sans text-[#0F1012]/75 leading-relaxed">
                The complete 68-page high-resolution collector's copy featuring the Young Achievers of Kashmir.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs font-sans text-[#0F1012]/80 pt-6 border-t border-[rgba(15,16,18,0.1)]">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#C59E3F] flex-shrink-0" />
                  <span>Full 68-page high-bulk print issue</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#C59E3F] flex-shrink-0" />
                  <span>Protective archival packaging</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#C59E3F] flex-shrink-0" />
                  <span>Postal delivery across J&K</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenSubscribe}
              className="mt-8 w-full py-3 bg-[#0F1012] hover:bg-[#C59E3F] text-white hover:text-[#0F1012] text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2"
            >
              <span>Order Single Copy</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tier 2: Annual Patron (Featured in Center with Gold border) */}
          <div className="p-8 bg-white border-2 border-[#C59E3F] shadow-xl flex flex-col justify-between relative -translate-y-0 md:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C59E3F] text-[#0F1012] text-[10px] font-sans font-black tracking-widest uppercase px-3 py-1 shadow">
              MOST POPULAR PATRON PLAN
            </div>

            <div>
              <span className="text-[10px] font-sans font-bold tracking-widest text-[#C59E3F] uppercase">
                ANNUAL PRINT + DIGITAL
              </span>
              <div className="mt-4">
                <span className="font-headline font-black text-4xl text-[#0F1012]">Rs. 550</span>
                <span className="text-xs font-sans text-[#0F1012]/60 block mt-0.5">/ year (12 complete issues)</span>
              </div>
              <p className="mt-4 text-xs font-sans text-[#0F1012]/75 leading-relaxed">
                All 12 monthly issues couriered to your doorstep in J&K, plus unlimited digital flipbook access and the 2026 archive.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs font-sans text-[#0F1012]/80 pt-6 border-t border-[rgba(15,16,18,0.1)]">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#C59E3F] flex-shrink-0 font-bold" />
                  <span><strong>12 Print Issues</strong> couriered across all 20 J&K districts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#C59E3F] flex-shrink-0 font-bold" />
                  <span>Early digital flipbook release on day 1</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#C59E3F] flex-shrink-0 font-bold" />
                  <span>Complete 2026 Valley investigative archive</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#C59E3F] flex-shrink-0 font-bold" />
                  <span>Special supplement election & economy editions</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenSubscribe}
              className="mt-8 w-full py-3.5 bg-[#C59E3F] hover:bg-amber-400 text-[#0F1012] text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <span>Join as Annual Patron</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tier 3: Student & Aspirant Pass */}
          <div className="p-8 bg-[#FBF9F5] border border-[rgba(15,16,18,0.12)] flex flex-col justify-between hover:border-[#0F1012] transition-all duration-300">
            <div>
              <span className="text-[10px] font-sans font-bold tracking-widest text-[#0F1012]/60 uppercase bg-[#0F1012]/5 px-2.5 py-1">
                ASPIRANT SCHOLARSHIP (45% OFF)
              </span>
              <div className="mt-4">
                <span className="font-headline font-black text-3xl text-[#0F1012]">Rs. 300</span>
                <span className="text-xs font-sans text-[#0F1012]/60 block mt-0.5">/ year (Digital + 6 Print Issues)</span>
              </div>
              <p className="mt-4 text-xs font-sans text-[#0F1012]/75 leading-relaxed">
                Subsidized rate for verified UPSC, JKAS, NEET, JEE candidates and college students across Jammu & Kashmir.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs font-sans text-[#0F1012]/80 pt-6 border-t border-[rgba(15,16,18,0.1)]">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#C59E3F] flex-shrink-0" />
                  <span>Full digital flipbook access on mobile/desktop</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#C59E3F] flex-shrink-0" />
                  <span>6 printed master issues delivered</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#C59E3F] flex-shrink-0" />
                  <span>Civil services topper interview transcripts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#C59E3F] flex-shrink-0" />
                  <span>Monthly J&K Current Affairs dossier</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenSubscribe}
              className="mt-8 w-full py-3 bg-[#0F1012] hover:bg-[#C59E3F] text-white hover:text-[#0F1012] text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2"
            >
              <span>Apply for Aspirant Pass</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Footer info strip */}
        <div className="mt-12 text-center text-xs font-sans text-[#0F1012]/60 flex items-center justify-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Doorstep courier delivery guaranteed across all 20 Jammu & Kashmir districts.</span>
        </div>

      </div>
    </section>
  );
};
