import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, ZoomIn, ZoomOut, BookOpen, Download } from 'lucide-react';
import { MAGAZINE_DETAILS, MASTHEAD_MEMBERS } from '../data/magazineContent';

interface FlipbookReaderModalProps {
  onClose: () => void;
  onOpenArticle: (slug: string) => void;
}

export const FlipbookReaderModal: React.FC<FlipbookReaderModalProps> = ({ onClose, onOpenArticle }) => {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const totalSpreads = 5;

  const handleNext = () => {
    if (currentSpread < totalSpreads - 1) {
      setCurrentSpread(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSpread > 0) {
      setCurrentSpread(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07080A]/95 backdrop-blur-lg select-none p-2 sm:p-6 overflow-hidden">
      
      {/* Top Bar with Controls */}
      <div className="absolute top-0 inset-x-0 h-16 bg-[#0E1014] border-b border-white/10 px-4 md:px-8 flex items-center justify-between text-[#F7F5F0] z-30">
        <div className="flex items-center space-x-3">
          <BookOpen className="w-5 h-5 text-accent-gold" />
          <div>
            <h3 className="font-headline font-bold text-xs md:text-sm uppercase tracking-wider">
              {MAGAZINE_DETAILS.name} — DIGITAL PRINT FLIPBOOK
            </h3>
            <span className="text-[10px] font-editorial-mono text-[#F7F5F0]/60">
              VOL. 01 • ISSUE 03 • OCTOBER 2026 • 68 PAGES
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 border border-white/15 hover:bg-white/10 text-[#F7F5F0] text-xs font-editorial-mono flex items-center space-x-1"
            title="Toggle Magnification"
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            <span className="hidden md:inline">{isZoomed ? 'Actual' : 'Zoom'}</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 border border-white/15 hover:bg-white/10 text-[#F7F5F0] text-xs font-editorial-mono hidden sm:flex items-center space-x-1"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <a
            href="#download"
            onClick={(e) => {
              e.preventDefault();
              alert("The full 68-page high-resolution October 2026 PDF is being downloaded.");
            }}
            className="p-2 bg-accent-gold text-ink font-bold text-xs uppercase px-3 flex items-center space-x-1 hover:bg-accent-gold/90 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PDF Preview</span>
          </a>

          <button
            onClick={onClose}
            className="p-2 border border-white/20 hover:bg-white/15 text-[#F7F5F0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Flipbook Viewing Canvas */}
      <div className={`w-full max-w-6xl mx-auto mt-16 transition-transform duration-300 flex items-center justify-center ${
        isZoomed ? 'scale-110 md:scale-125' : 'scale-100'
      }`}>
        
        {/* Navigation Arrow Left */}
        <button
          onClick={handlePrev}
          disabled={currentSpread === 0}
          className={`hidden md:flex p-3 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F5F0] mr-4 transition-opacity ${
            currentSpread === 0 ? 'opacity-20 cursor-not-allowed' : 'opacity-100'
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Realistic Book Container */}
        <div className="relative w-full max-w-5xl h-[520px] sm:h-[600px] lg:h-[680px] bg-[#F7F5F0] text-ink shadow-2xl flex border border-black/40 overflow-hidden rounded-[2px]">
          
          {/* Central Book Spine Shadow */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/25 via-black/40 to-black/25 pointer-events-none z-20 hidden md:block" />

          {/* SPREAD 0: FRONT COVER SPREAD */}
          {currentSpread === 0 && (
            <div className="w-full h-full flex flex-col md:flex-row">
              {/* Inside Front (Desktop left) */}
              <div className="hidden md:flex flex-1 p-8 bg-[#EFECE3] border-r border-hairline flex-col justify-between">
                <div>
                  <div className="font-editorial-mono text-[10px] tracking-widest uppercase text-ink-muted">
                    {MAGAZINE_DETAILS.volume} • {MAGAZINE_DETAILS.issue}
                  </div>
                  <h4 className="mt-4 font-headline font-black text-2xl uppercase tracking-tight text-ink">
                    PUBLISHER'S CREED
                  </h4>
                  <p className="mt-4 text-xs font-editorial-mono italic leading-relaxed text-ink/80">
                    "We dedicate this issue to the persevering families, teachers, and students of Jammu & Kashmir. In a world inundated with soundbites, we stand for ink that endures, verifies, and enlightens."
                  </p>
                  <div className="mt-6 text-xs font-editorial-mono uppercase font-bold text-ink">
                    — PARVAIZ AHMAD RESHI
                    <span className="block text-[10px] text-ink-muted font-normal">Founder, Publisher & Editor</span>
                  </div>
                </div>

                <div className="text-[9px] font-editorial-mono text-ink-muted border-t border-hairline pt-4">
                  RNI REGISTRATION: JKENG/2026/89421 • PRINTED AT VALLEY OFFSET SRINAGAR
                </div>
              </div>

              {/* Cover Page (Desktop right) */}
              <div className="flex-1 h-full relative overflow-hidden bg-ink text-[#F7F5F0] p-6 sm:p-10 flex flex-col justify-between">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop" 
                  alt="Magazine Cover" 
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />

                {/* Top Cover Masthead */}
                <div className="relative z-10 border-b border-white/30 pb-3">
                  <div className="flex items-center justify-between text-[10px] font-editorial-mono tracking-[0.25em] text-accent-gold uppercase font-bold">
                    <span>PRINT & DIGITAL</span>
                    <span>OCTOBER 2026</span>
                    <span>RS. 50</span>
                  </div>
                  <h1 className="mt-2 font-headline font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none text-[#F7F5F0] uppercase">
                    THE LEGENDS INK
                  </h1>
                  <span className="block text-right text-xs font-headline font-bold tracking-widest text-[#F7F5F0]">
                    MONTHLY
                  </span>
                </div>

                {/* Cover Stories Callout */}
                <div className="relative z-10 space-y-3">
                  <span className="inline-block bg-accent-gold text-ink text-[10px] font-bold font-editorial-mono px-2 py-0.5 uppercase tracking-widest">
                    COVER INVESTIGATION
                  </span>
                  <h2 className="font-headline font-extrabold text-2xl sm:text-3xl uppercase leading-tight">
                    YOUNG ACHIEVERS OF KASHMIR
                  </h2>
                  <p className="text-xs font-editorial-mono italic text-[#F7F5F0]/90 max-w-sm">
                    UPSC Ranks 148, 207, 254, 456 & The New Wave of Merit in the Valley.
                  </p>
                </div>

                {/* Barcode & Bottom Strip */}
                <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-between text-[10px] font-editorial-mono text-[#F7F5F0]/70 uppercase">
                  <span>WWW.LEGENDSINK.COM</span>
                  <span>BANDIPORA • SRINAGAR</span>
                </div>
              </div>
            </div>
          )}

          {/* SPREAD 1: MASTHEAD & TABLE OF CONTENTS */}
          {currentSpread === 1 && (
            <div className="w-full h-full flex flex-col md:flex-row">
              {/* Left Page: Official Masthead */}
              <div className="flex-1 p-6 sm:p-8 bg-[#F7F5F0] border-r border-hairline overflow-y-auto">
                <h4 className="font-headline font-black text-xs uppercase tracking-[0.25em] text-ink border-b border-hairline pb-2">
                  THE EDITORIAL BOARD & MASTHEAD
                </h4>
                <div className="mt-4 space-y-3">
                  {MASTHEAD_MEMBERS.map((m, idx) => (
                    <div key={idx} className="border-b border-hairline/60 pb-2">
                      <div className="text-[10px] font-editorial-mono tracking-wider text-ink-muted uppercase">
                        {m.role}
                      </div>
                      <div className="font-headline font-bold text-xs sm:text-sm text-ink uppercase">
                        {m.name}
                      </div>
                      <div className="text-[10px] font-editorial-mono italic text-ink/70">
                        {m.credentials} • {m.location}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Page: Table of Contents */}
              <div className="flex-1 p-6 sm:p-8 bg-[#FAF9F6] overflow-y-auto">
                <h4 className="font-headline font-black text-xs uppercase tracking-[0.25em] text-ink border-b border-hairline pb-2">
                  CONTENTS • OCTOBER 2026
                </h4>
                <div className="mt-4 space-y-4">
                  <div 
                    onClick={() => onOpenArticle('young-achievers-of-kashmir-upsc-stars')}
                    className="group cursor-pointer hover:bg-ink/5 p-2 transition-colors"
                  >
                    <div className="flex items-baseline justify-between text-xs font-editorial-mono">
                      <span className="font-bold text-accent-gold">PAGE 04 — COVER STORY</span>
                      <span className="text-ink-muted">EDUCATION</span>
                    </div>
                    <h5 className="font-headline font-bold text-sm uppercase text-ink group-hover:text-accent-gold transition-colors">
                      Young Achievers of Kashmir: Quiet Toil, Unyielding Purpose
                    </h5>
                  </div>

                  <div 
                    onClick={() => onOpenArticle('omar-abdullah-chief-minister-expectations-delivery')}
                    className="group cursor-pointer hover:bg-ink/5 p-2 transition-colors"
                  >
                    <div className="flex items-baseline justify-between text-xs font-editorial-mono">
                      <span className="font-bold text-ink">PAGE 18 — SPECIAL FOCUS</span>
                      <span className="text-ink-muted">POLITICS</span>
                    </div>
                    <h5 className="font-headline font-bold text-sm uppercase text-ink group-hover:text-accent-gold transition-colors">
                      Omar Abdullah as Chief Minister: Delivery vs Rhetoric
                    </h5>
                  </div>

                  <div 
                    onClick={() => onOpenArticle('drugs-in-kashmir-the-battle-is-far-from-over')}
                    className="group cursor-pointer hover:bg-ink/5 p-2 transition-colors"
                  >
                    <div className="flex items-baseline justify-between text-xs font-editorial-mono">
                      <span className="font-bold text-ink">PAGE 28 — INVESTIGATION</span>
                      <span className="text-ink-muted">SOCIAL ISSUES</span>
                    </div>
                    <h5 className="font-headline font-bold text-sm uppercase text-ink group-hover:text-accent-gold transition-colors">
                      Drugs in Kashmir: The Police Mission & Rehabilitation
                    </h5>
                  </div>

                  <div 
                    onClick={() => onOpenArticle('sumbal-footbridge-a-decade-of-waiting')}
                    className="group cursor-pointer hover:bg-ink/5 p-2 transition-colors"
                  >
                    <div className="flex items-baseline justify-between text-xs font-editorial-mono">
                      <span className="font-bold text-ink">PAGE 42 — CIVIC AUDIT</span>
                      <span className="text-ink-muted">INFRASTRUCTURE</span>
                    </div>
                    <h5 className="font-headline font-bold text-sm uppercase text-ink group-hover:text-accent-gold transition-colors">
                      Sumbal Footbridge: A Decade of Waiting over Jehlum
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SPREAD 2: FEATURE SPREAD */}
          {currentSpread === 2 && (
            <div className="w-full h-full flex flex-col md:flex-row">
              <div className="flex-1 p-6 sm:p-8 bg-[#F7F5F0] border-r border-hairline overflow-y-auto">
                <span className="text-[10px] font-editorial-mono text-accent-gold tracking-widest uppercase font-bold">
                  COVER STORY • PAGES 04-05
                </span>
                <h3 className="font-headline font-black text-xl uppercase tracking-tight mt-2 text-ink">
                  SUVAN SHARMA & SUGANDHA GUPTA
                </h3>
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" 
                  alt="Feature Portrait" 
                  className="w-full h-44 object-cover my-4 border border-hairline"
                />
                <p className="text-xs font-editorial-mono leading-relaxed text-ink/80 italic">
                  "When the rank roll appeared, there were no triumphant fireworks in our home. Just a profound sense of gravity. An administrator in Jammu & Kashmir has the chance to restore faith in public service every single day."
                </p>
              </div>

              <div className="flex-1 p-6 sm:p-8 bg-[#FAF9F6] overflow-y-auto">
                <span className="text-[10px] font-editorial-mono text-ink-muted tracking-widest uppercase">
                  PAGES 06-07 • THE DATA BREAKDOWN
                </span>
                <h3 className="font-headline font-black text-xl uppercase tracking-tight mt-2 text-ink">
                  VALLEY MERITOCRACY IN NUMBERS
                </h3>
                <div className="grid grid-cols-2 gap-3 my-4">
                  <div className="p-3 bg-ink/5 border border-hairline text-center">
                    <span className="font-headline font-black text-2xl text-ink">AIR 148</span>
                    <span className="block text-[9px] font-editorial-mono uppercase text-ink-muted">Suvan Sharma</span>
                  </div>
                  <div className="p-3 bg-ink/5 border border-hairline text-center">
                    <span className="font-headline font-black text-2xl text-ink">AIR 207</span>
                    <span className="block text-[9px] font-editorial-mono uppercase text-ink-muted">Sugandha Gupta</span>
                  </div>
                  <div className="p-3 bg-ink/5 border border-hairline text-center">
                    <span className="font-headline font-black text-2xl text-ink">AIR 254</span>
                    <span className="block text-[9px] font-editorial-mono uppercase text-ink-muted">Towseef Ahmad</span>
                  </div>
                  <div className="p-3 bg-ink/5 border border-hairline text-center">
                    <span className="font-headline font-black text-2xl text-ink">AIR 456</span>
                    <span className="block text-[9px] font-editorial-mono uppercase text-ink-muted">Ritika Bhan</span>
                  </div>
                </div>
                <p className="text-xs font-editorial-mono leading-relaxed text-ink/80">
                  Their success highlights the urgent requirement for high-speed digital public libraries in Bandipora, Baramulla, and rural South Kashmir to ensure equal preparation resources.
                </p>
              </div>
            </div>
          )}

          {/* SPREAD 3: INVESTIGATION & OMAR ABDULLAH */}
          {currentSpread === 3 && (
            <div className="w-full h-full flex flex-col md:flex-row">
              <div className="flex-1 p-6 sm:p-8 bg-[#F7F5F0] border-r border-hairline overflow-y-auto">
                <span className="text-[10px] font-editorial-mono text-accent-gold tracking-widest uppercase font-bold">
                  SPECIAL INVESTIGATION • PAGE 28
                </span>
                <h3 className="font-headline font-black text-xl uppercase tracking-tight mt-2 text-ink">
                  NARCOTICS: THE UNTOLD COSTS
                </h3>
                <img 
                  src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop" 
                  alt="Investigation" 
                  className="w-full h-44 object-cover my-4 border border-hairline"
                />
                <p className="text-xs font-editorial-mono leading-relaxed text-ink/80 italic">
                  Field reports from 12 de-addiction centers across Baramulla, Bandipora, and Anantnag document synthetic opioids infiltrating rural hamlets.
                </p>
              </div>

              <div className="flex-1 p-6 sm:p-8 bg-[#FAF9F6] overflow-y-auto">
                <span className="text-[10px] font-editorial-mono text-ink-muted tracking-widest uppercase">
                  POLITICAL AUDIT • PAGE 34
                </span>
                <h3 className="font-headline font-black text-xl uppercase tracking-tight mt-2 text-ink">
                  OMAR ABDULLAH: THE 2026 BENCHMARKS
                </h3>
                <img 
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop" 
                  alt="Political Analysis" 
                  className="w-full h-44 object-cover my-4 border border-hairline"
                />
                <p className="text-xs font-editorial-mono leading-relaxed text-ink/80">
                  Assessing administrative velocity, resolution of smart meter power billing grievances, and restoration of statehood resolutions in the J&K Assembly.
                </p>
              </div>
            </div>
          )}

          {/* SPREAD 4: CIVIC AUDIT & BACK COVER */}
          {currentSpread === 4 && (
            <div className="w-full h-full flex flex-col md:flex-row">
              <div className="flex-1 p-6 sm:p-8 bg-[#F7F5F0] border-r border-hairline overflow-y-auto">
                <span className="text-[10px] font-editorial-mono text-accent-gold tracking-widest uppercase font-bold">
                  INFRASTRUCTURE AUDIT • PAGE 42
                </span>
                <h3 className="font-headline font-black text-xl uppercase tracking-tight mt-2 text-ink">
                  SUMBAL FOOTBRIDGE: 12 YEARS LATER
                </h3>
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop" 
                  alt="Sumbal Bridge" 
                  className="w-full h-44 object-cover my-4 border border-hairline"
                />
                <p className="text-xs font-editorial-mono leading-relaxed text-ink/80 italic">
                  Skeletal pillars on the Jehlum: an investigation into delayed public works, recurring tenders, and the impact on school children of Sonawari.
                </p>
              </div>

              {/* Back Cover */}
              <div className="flex-1 p-6 sm:p-8 bg-[#0E1014] text-[#F7F5F0] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-editorial-mono text-accent-gold tracking-[0.25em] uppercase font-bold">
                    THE LEGENDS INK MONTHLY
                  </span>
                  <h3 className="font-headline font-black text-2xl uppercase tracking-tight mt-2 text-[#F7F5F0]">
                    SUBSCRIBE TO TRUTH
                  </h3>
                  <p className="mt-2 text-xs font-editorial-mono italic text-[#F7F5F0]/70">
                    Join thousands of civil servants, educators, students, and conscientious citizens across Jammu & Kashmir.
                  </p>
                  
                  <div className="mt-6 p-4 border border-white/20 bg-white/5 space-y-2 text-xs font-editorial-mono">
                    <div className="flex justify-between">
                      <span>Monthly Print Copy:</span>
                      <span className="font-bold text-accent-gold">Rs. 50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annual Print (12 Issues):</span>
                      <span className="font-bold text-accent-gold">Rs. 550</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Digital All-Access:</span>
                      <span className="font-bold text-accent-gold">Rs. 399/yr</span>
                    </div>
                  </div>
                </div>

                <div className="text-[9px] font-editorial-mono text-[#F7F5F0]/50 border-t border-white/10 pt-4 space-y-1">
                  <div>HEADQUARTERS: RESHI COMPLEX, HILAL ABAD, NESBAL SUMBAL, BANDIPORE, J&K</div>
                  <div>EMAIL: THELEGENDSINK@GMAIL.COM • TEL: +91 1957 220000</div>
                  <div className="text-amber-200/60 uppercase">"All disputes subject to the jurisdiction of Srinagar Courts only."</div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Navigation Arrow Right */}
        <button
          onClick={handleNext}
          disabled={currentSpread === totalSpreads - 1}
          className={`hidden md:flex p-3 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F5F0] ml-4 transition-opacity ${
            currentSpread === totalSpreads - 1 ? 'opacity-20 cursor-not-allowed' : 'opacity-100'
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

      </div>

      {/* Bottom Spread Indicator and Mobile Nav */}
      <div className="absolute bottom-4 inset-x-0 flex items-center justify-center space-x-4 text-xs font-editorial-mono text-[#F7F5F0] z-30">
        <button 
          onClick={handlePrev}
          disabled={currentSpread === 0}
          className="md:hidden px-3 py-1 bg-white/20 rounded disabled:opacity-30"
        >
          Prev
        </button>

        <span className="tracking-widest uppercase">
          Spread {currentSpread + 1} of {totalSpreads}
        </span>

        <button 
          onClick={handleNext}
          disabled={currentSpread === totalSpreads - 1}
          className="md:hidden px-3 py-1 bg-white/20 rounded disabled:opacity-30"
        >
          Next
        </button>
      </div>

    </div>
  );
};
