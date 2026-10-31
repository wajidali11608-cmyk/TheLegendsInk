import { ArrowUpRight, BookOpen, Layers, Download, ShieldCheck, Upload, FileText } from 'lucide-react';
import { ArchivedIssue } from '../utils/issueArchive';

interface PrintEditionShowcaseProps {
  onOpenPdfReader: () => void;
  onOpenCMS?: () => void;
  pdfUrl: string;
  coverImage?: string;
  issueTitle?: string;
  pageCount?: number;
  archivedIssues?: ArchivedIssue[];
  activeIssueId?: string;
  onSwitchIssue?: (issueId: string) => void;
}

export const PrintEditionShowcase: React.FC<PrintEditionShowcaseProps> = ({
  onOpenPdfReader,
  onOpenCMS,
  pdfUrl,
  coverImage = '/october-2026-cover.png',
  issueTitle = 'OCTOBER 2026',
  pageCount = 68,
  archivedIssues = [],
  activeIssueId,
  onSwitchIssue,
}) => {
  return (
    <section className="w-full bg-[#F5F2EA] text-[#121317] py-8 sm:py-16 md:py-24 border-y border-[#121317]/10 relative overflow-hidden select-none">
      {/* Ambient soft warm lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-[#C5A059]/[0.08] rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle Swiss registration grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(18, 19, 23, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(18, 19, 23, 0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        
        {/* Top Archival Bar */}
        <div className="flex items-center justify-between border-b border-[#121317]/10 pb-3 mb-6 sm:mb-12">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <span className="font-mono text-[9.5px] sm:text-xs font-bold tracking-[0.18em] sm:tracking-[0.25em] uppercase text-[#121317]/80">
              OFFICIAL PRINT & DIGITAL EDITION • {issueTitle.toUpperCase()}
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-2 sm:space-x-3">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#8F702D] font-bold">
              {pageCount} GLOSSY PAGES • VECTOR ARCHIVE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* ━━━ Left Column: Physical Print Journal ━━━ */}
          <div className="lg:col-span-5 flex justify-center">
            <div 
              onClick={onOpenPdfReader}
              className="relative group/cover max-w-[280px] sm:max-w-xs md:max-w-sm w-full cursor-pointer"
              title="Click to read full magazine PDF"
            >
              {/* Outer Golden Aura Glow */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#C5A059]/30 via-[#C5A059]/15 to-transparent rounded-sm blur-2xl opacity-50 group-hover/cover:opacity-85 transition-opacity duration-500 pointer-events-none" />
              
              {/* Physical Cover Container */}
              <div className="relative aspect-[3/4] bg-white border border-[#121317]/15 shadow-[0_25px_60px_-15px_rgba(18,19,23,0.22)] overflow-hidden transition-transform duration-500 ease-out group-hover/cover:scale-[1.02]">
                <img 
                  src={coverImage} 
                  alt="Magazine Cover"
                  className="w-full h-full object-cover filter contrast-[1.02] brightness-[0.99]" 
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-[#121317]/30 opacity-0 group-hover/cover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                  <div className="px-5 py-2.5 bg-[#C5A059] text-[#121317] font-bold text-xs uppercase tracking-widest flex items-center space-x-2 shadow-xl">
                    <BookOpen className="w-4 h-4 text-[#121317]" />
                    <span>Read Full PDF</span>
                  </div>
                </div>

                {/* Bottom Cover Band */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#121317]/10 px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                    <span className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase text-[#8F702D] font-bold">
                      {issueTitle.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase text-emerald-800 font-bold">
                    FREE DIGITAL ACCESS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ━━━ Right Column: Typography & Specifications ━━━ */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5 sm:space-y-6 lg:pl-4">
            <div>
              {/* Kicker */}
              <div className="inline-flex items-center space-x-2 text-[9.5px] sm:text-[10.5px] font-mono tracking-[0.25em] text-[#8F702D] uppercase font-bold mb-2 sm:mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                <span>COMPLETE {pageCount}-PAGE DIGITAL & PRINT SUITE</span>
              </div>

              {/* Headline */}
              <h2 className="font-luxury font-black text-2xl sm:text-3xl lg:text-4xl xl:text-5xl uppercase tracking-[0.05em] text-[#121317] leading-tight">
                THE TACTILE POWER OF THE PRINTED WORD
              </h2>

              {/* Epigraph Quote in Luxury Cursive */}
              <div className="border-l-2 border-[#C5A059] pl-4 sm:pl-5 my-3 sm:my-4">
                <p className="font-cursive text-2xl sm:text-3xl lg:text-4xl text-[#8F702D] leading-snug">
                  "In an era of fleeting digital noise, ink on heavy archival stock remains a permanent contract with the truth."
                </p>
              </div>

              {/* Body Prose */}
              <p className="text-xs sm:text-sm font-sans text-[#121317]/70 leading-relaxed max-w-2xl">
                The edition features {pageCount} pages of exhaustive field inquiries, interviews, civic audits, and cultural records. Read the entire publication in the digital reader or manage publications in the CMS studio.
              </p>
            </div>

            {/* 4 Points Bento Grid with Editorial Tints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2 pb-2 border-y border-[#121317]/10">
              <div className="flex items-center space-x-3 p-3 bg-amber-50/60 border border-amber-900/15 rounded-xs shadow-2xs">
                <div className="p-2 bg-amber-100/80 text-amber-900 flex-shrink-0 rounded-xs">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] sm:text-xs font-sans font-semibold text-amber-950">
                  {pageCount} Pages on Archival Paper &amp; PDF
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-emerald-50/60 border border-emerald-900/15 rounded-xs shadow-2xs">
                <div className="p-2 bg-emerald-100/80 text-emerald-900 flex-shrink-0 rounded-xs">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] sm:text-xs font-sans font-semibold text-emerald-950">
                  Exclusive Ground Investigations
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-sky-50/60 border border-sky-900/15 rounded-xs shadow-2xs">
                <div className="p-2 bg-sky-100/80 text-sky-900 flex-shrink-0 rounded-xs">
                  <Download className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] sm:text-xs font-sans font-semibold text-sky-950">
                  High-Resolution Vector Typography
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-stone-50/70 border border-stone-900/15 rounded-xs shadow-2xs">
                <div className="p-2 bg-stone-200/80 text-stone-900 flex-shrink-0 rounded-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] sm:text-xs font-sans font-semibold text-stone-900">
                  100% Free Public Journal Access
                </div>
              </div>
            </div>

            {/* Multi-Issue Archive Switcher */}
            {archivedIssues && archivedIssues.length > 1 && (
              <div className="p-3 bg-white border border-[#121317]/08 flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono text-[#8F702D] uppercase tracking-wider font-bold flex items-center space-x-1">
                  <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Available Issues:</span>
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {archivedIssues.map((iss) => {
                    const isActive = (activeIssueId ? activeIssueId === iss.id : iss.id === 'oct-2026');
                    return (
                      <button
                        key={iss.id}
                        onClick={() => onSwitchIssue?.(iss.id)}
                        className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider border transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#C5A059] text-[#121317] font-bold border-[#C5A059]'
                            : 'bg-[#FAF8F4] border-[#121317]/15 text-[#121317]/70 hover:text-[#121317] hover:border-[#C5A059]'
                        }`}
                      >
                        {iss.monthYear}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action CTA Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={onOpenPdfReader}
                className="px-6 py-3.5 bg-[#121317] hover:bg-[#C5A059] text-[#FAF9F5] hover:text-[#121317] text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.18em] transition-all duration-300 flex items-center justify-center space-x-2 focus:outline-none shadow-sm cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#C5A059] hover:text-[#121317]" />
                <span>Read Full Magazine (PDF)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={pdfUrl}
                download="The_Legends_Ink_Magazine.pdf"
                className="px-6 py-3.5 bg-white hover:bg-[#FAF8F4] text-[#8F702D] hover:text-[#121317] border border-[#C5A059]/60 text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.18em] transition-all duration-300 flex items-center justify-center space-x-2 focus:outline-none shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {onOpenCMS && (
                <button
                  onClick={onOpenCMS}
                  className="px-5 py-3.5 bg-white hover:bg-[#FAF8F4] text-[#121317] border border-[#121317]/15 text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.18em] transition-all duration-300 flex items-center justify-center space-x-2 focus:outline-none cursor-pointer"
                  title="Upload another magazine issue or manage articles"
                >
                  <Upload className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>CMS Studio</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
