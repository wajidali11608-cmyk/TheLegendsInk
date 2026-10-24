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
    <section className="w-full bg-[#0A0B0E] text-[#FBF9F5] py-8 sm:py-14 md:py-20 border-y border-white/[0.08] relative overflow-hidden select-none">
      {/* Ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-[#C59E3F]/[0.05] rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle registration grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        
        {/* Top Archival Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-6 sm:mb-10">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C59E3F]" />
            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white/90">
              OFFICIAL PRINT & DIGITAL EDITION • {issueTitle.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#C59E3F] font-bold">
              {pageCount} GLOSSY PAGES • COMPLETE PDF
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C59E3F]" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* ━━━ Left Column: Physical Print Journal ━━━ */}
          <div className="lg:col-span-5 flex justify-center">
            <div 
              onClick={onOpenPdfReader}
              className="relative group/cover max-w-[260px] sm:max-w-xs md:max-w-sm w-full cursor-pointer"
              title="Click to read full magazine PDF"
            >
              {/* Outer Golden Aura Glow */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#C59E3F]/20 via-[#C59E3F]/10 to-transparent rounded-sm blur-xl opacity-40 group-hover/cover:opacity-75 transition-opacity duration-500 pointer-events-none" />
              
              {/* Physical Cover Container */}
              <div className="relative aspect-[3/4] bg-[#07080B] border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden transition-transform duration-500 ease-out group-hover/cover:scale-[1.015]">
                <img 
                  src={coverImage} 
                  alt="Magazine Cover"
                  className="w-full h-full object-cover filter contrast-[1.03] brightness-[0.98]" 
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/cover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="px-4 py-2 bg-[#C59E3F] text-[#0F1012] font-bold text-xs uppercase tracking-widest flex items-center space-x-2 shadow-2xl">
                    <BookOpen className="w-4 h-4" />
                    <span>Read Full PDF</span>
                  </div>
                </div>

                {/* Bottom Cover Band */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#08090C]/95 backdrop-blur-md border-t border-white/15 px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C59E3F] animate-pulse" />
                    <span className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase text-[#C59E3F] font-bold">
                      {issueTitle.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase text-emerald-400 font-bold">
                    FREE DIGITAL ACCESS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ━━━ Right Column: Typography & Specifications ━━━ */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-6 lg:pl-4">
            <div>
              {/* Kicker */}
              <div className="inline-flex items-center space-x-2 text-[9.5px] sm:text-[10.5px] font-mono tracking-[0.25em] text-[#C59E3F] uppercase font-bold mb-2 sm:mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59E3F]" />
                <span>COMPLETE {pageCount}-PAGE DIGITAL & PRINT ARCHIVE</span>
              </div>

              {/* Headline */}
              <h2 className="font-luxury font-black text-xl sm:text-3xl lg:text-4xl xl:text-5xl uppercase tracking-[0.05em] text-white leading-tight">
                THE TACTILE POWER OF THE PRINTED WORD
              </h2>

              {/* Epigraph Quote */}
              <div className="border-l-2 border-[#C59E3F] pl-3 sm:pl-4 my-3 sm:my-4">
                <p className="font-editorial italic text-sm sm:text-base lg:text-xl text-white/95 leading-relaxed">
                  "In an era of fleeting digital noise, ink on heavy archival stock remains a permanent contract with the truth."
                </p>
              </div>

              {/* Body Prose */}
              <p className="text-xs sm:text-[13px] font-sans text-white/70 leading-relaxed max-w-2xl line-clamp-3 sm:line-clamp-none">
                The edition features {pageCount} pages of exhaustive investigations, interviews, civic audits, and cultural dossiers. Read the entire publication right here in the digital suite or manage upcoming issues in the Editorial CMS.
              </p>
            </div>

            {/* 4 Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-2 pb-2 border-y border-white/[0.08]">
              <div className="flex items-center space-x-3 p-2.5 bg-white/[0.02] border border-white/[0.07]">
                <div className="p-1.5 bg-[#C59E3F]/10 border border-[#C59E3F]/25 text-[#C59E3F] flex-shrink-0">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] sm:text-xs font-sans font-semibold text-white/90">
                  {pageCount} Pages on Archival Paper & PDF
                </div>
              </div>

              <div className="flex items-center space-x-3 p-2.5 bg-white/[0.02] border border-white/[0.07]">
                <div className="p-1.5 bg-[#C59E3F]/10 border border-[#C59E3F]/25 text-[#C59E3F] flex-shrink-0">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] sm:text-xs font-sans font-semibold text-white/90">
                  Exclusive Interviews & Investigations
                </div>
              </div>

              <div className="flex items-center space-x-3 p-2.5 bg-white/[0.02] border border-white/[0.07]">
                <div className="p-1.5 bg-[#C59E3F]/10 border border-[#C59E3F]/25 text-[#C59E3F] flex-shrink-0">
                  <Download className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] sm:text-xs font-sans font-semibold text-white/90">
                  High-Resolution Vector Typography
                </div>
              </div>

              <div className="flex items-center space-x-3 p-2.5 bg-white/[0.02] border border-white/[0.07]">
                <div className="p-1.5 bg-[#C59E3F]/10 border border-[#C59E3F]/25 text-[#C59E3F] flex-shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] sm:text-xs font-sans font-semibold text-white/90">
                  100% Free Public Journal Access
                </div>
              </div>
            </div>

            {/* Multi-Issue Archive Switcher */}
            {archivedIssues && archivedIssues.length > 1 && (
              <div className="p-3 bg-white/[0.03] border border-white/10 flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono text-[#C59E3F] uppercase tracking-wider font-bold flex items-center space-x-1">
                  <Layers className="w-3.5 h-3.5 text-[#C59E3F]" />
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
                            ? 'bg-[#C59E3F] text-[#0A0B0E] font-bold border-[#C59E3F]'
                            : 'bg-white/5 border-white/20 text-white/70 hover:text-white hover:border-[#C59E3F]'
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
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
              <button
                onClick={onOpenPdfReader}
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white hover:bg-[#C59E3F] text-[#0A0B0E] text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.16em] transition-all duration-200 flex items-center justify-center space-x-2 focus:outline-none shadow-md"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#C59E3F]" />
                <span>Read Full Magazine (PDF)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={pdfUrl}
                download="The_Legends_Ink_Magazine.pdf"
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-transparent hover:bg-white/[0.06] text-[#C59E3F] hover:text-white border border-[#C59E3F]/70 text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.16em] transition-all duration-200 flex items-center justify-center space-x-2 focus:outline-none"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {onOpenCMS && (
                <button
                  onClick={onOpenCMS}
                  className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/20 text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.16em] transition-all duration-200 flex items-center justify-center space-x-2 focus:outline-none"
                  title="Upload another magazine issue or manage articles"
                >
                  <Upload className="w-3.5 h-3.5 text-[#C59E3F]" />
                  <span>Upload Issue / CMS</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
