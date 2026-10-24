import React from 'react';
import { ArrowUpRight, BookOpen, Download, Library, Check, FileText, ShieldCheck } from 'lucide-react';

interface PublicPdfAccessSectionProps {
  onOpenPdfReader: () => void;
  onOpenCMS?: () => void;
  pdfUrl: string;
}

export const PublicPdfAccessSection: React.FC<PublicPdfAccessSectionProps> = ({
  onOpenPdfReader,
  onOpenCMS: _onOpenCMS,
  pdfUrl,
}) => {
  return (
    <section className="w-full bg-[#FAF8F3] py-14 sm:py-20 md:py-24 border-b border-[rgba(15,16,18,0.12)] relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-[0.25em] text-[#C59E3F] uppercase font-bold mb-3">
            <FileText className="w-3.5 h-3.5 text-[#C59E3F]" />
            <span>OPEN EDITORIAL ACCESS • PUBLIC JOURNAL</span>
          </div>
          <h2 className="font-headline font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#0F1012] leading-tight">
            READ THE ENTIRE MAGAZINE AS A PDF
          </h2>
          <p className="mt-3 text-xs sm:text-sm font-editorial italic text-[#0F1012]/75 max-w-2xl mx-auto leading-relaxed">
            "We believe investigative reporting and public accountability must remain universally accessible. Read all 68 pages online or download the complete issue free of charge."
          </p>
        </div>

        {/* 3 Prominent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {/* Card 1: Read Full Magazine Online */}
          <div className="p-6 sm:p-8 bg-[#FBF9F5] border border-[rgba(15,16,18,0.14)] flex flex-col justify-between hover:border-[#0F1012] hover:shadow-lg transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#0F1012]/70 uppercase bg-[#0F1012]/5 px-2.5 py-1">
                  DIGITAL EDITION
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase">
                  100% Free
                </span>
              </div>

              <div className="mt-5 flex items-center space-x-3">
                <div className="p-2.5 bg-[#C59E3F]/15 border border-[#C59E3F]/30 text-[#C59E3F]">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headline font-black text-xl text-[#0F1012] uppercase tracking-tight">
                    Read Online
                  </h3>
                  <span className="text-xs font-mono text-[#0F1012]/60 block">Full Interactive PDF</span>
                </div>
              </div>

              <p className="mt-4 text-xs font-sans text-[#0F1012]/75 leading-relaxed">
                Flip through all 68 pages of the October 2026 issue right in your browser. Includes full zoom, high-definition page rendering, and seamless reading.
              </p>

              <ul className="mt-6 space-y-2.5 text-xs font-sans text-[#0F1012]/80 pt-6 border-t border-[rgba(15,16,18,0.1)]">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#C59E3F] flex-shrink-0" />
                  <span>Full 68-page high-definition PDF view</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#C59E3F] flex-shrink-0" />
                  <span>Interactive zoom and high-resolution layout</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#C59E3F] flex-shrink-0" />
                  <span>Instant access without account registration</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenPdfReader}
              className="mt-8 w-full py-3.5 bg-[#0F1012] hover:bg-[#C59E3F] text-white hover:text-[#0F1012] text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-2 shadow"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Full Magazine</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Download Full Issue PDF (Featured) */}
          <div className="p-6 sm:p-8 bg-white border-2 border-[#C59E3F] shadow-xl flex flex-col justify-between relative -translate-y-0 md:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C59E3F] text-[#0F1012] text-[10px] font-sans font-black tracking-widest uppercase px-3 py-1 shadow">
              OFFICIAL COLLECTOR ARCHIVE
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#C59E3F] uppercase">
                  COMPLETE ISSUE
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase">
                  17.2 MB • Unlocked
                </span>
              </div>

              <div className="mt-5 flex items-center space-x-3">
                <div className="p-2.5 bg-[#C59E3F] text-[#0F1012]">
                  <Download className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-headline font-black text-xl text-[#0F1012] uppercase tracking-tight">
                    Download PDF
                  </h3>
                  <span className="text-xs font-mono text-[#0F1012]/60 block">Offline Archival Copy</span>
                </div>
              </div>

              <p className="mt-4 text-xs font-sans text-[#0F1012]/75 leading-relaxed">
                Download the complete high-resolution digital print file to your phone, tablet, or desktop for offline reading anytime.
              </p>

              <ul className="mt-6 space-y-2.5 text-xs font-sans text-[#0F1012]/80 pt-6 border-t border-[rgba(15,16,18,0.1)]">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#C59E3F] flex-shrink-0 font-bold" />
                  <span><strong>Complete 68 Pages</strong> including cover & investigative dossiers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#C59E3F] flex-shrink-0 font-bold" />
                  <span>High-resolution vector text and photography</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#C59E3F] flex-shrink-0 font-bold" />
                  <span>Permanent archival copy for libraries and researchers</span>
                </li>
              </ul>
            </div>

            <a
              href={pdfUrl}
              download="The_Legends_Ink_October_2026.pdf"
              className="mt-8 w-full py-3.5 bg-[#C59E3F] hover:bg-amber-400 text-[#0F1012] text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Download Complete PDF</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Card 3: Institutional & Research Circulation */}
          <div className="p-6 sm:p-8 bg-[#FBF9F5] border border-[rgba(15,16,18,0.14)] flex flex-col justify-between hover:border-[#0F1012] hover:shadow-lg transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#0F1012]/70 uppercase bg-[#0F1012]/5 px-2.5 py-1">
                  PUBLIC ARCHIVE
                </span>
                <span className="text-[10px] font-mono font-bold text-[#C59E3F] uppercase">
                  Open Repository
                </span>
              </div>

              <div className="mt-5 flex items-center space-x-3">
                <div className="p-2.5 bg-[#0F1012] text-white">
                  <Library className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headline font-black text-xl text-[#0F1012] uppercase tracking-tight">
                    Library Access
                  </h3>
                  <span className="text-xs font-mono text-[#0F1012]/60 block">Academic & Public Records</span>
                </div>
              </div>

              <p className="mt-4 text-xs font-sans text-[#0F1012]/75 leading-relaxed">
                Indexed for university libraries, civic researchers, and legal archives across all 20 districts of Jammu & Kashmir and national institutions.
              </p>

              <ul className="mt-6 space-y-2.5 text-xs font-sans text-[#0F1012]/80 pt-6 border-t border-[rgba(15,16,18,0.1)]">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#C59E3F] flex-shrink-0" />
                  <span>Unrestricted rights for classroom & scholarly citation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#C59E3F] flex-shrink-0" />
                  <span>Permanent archival registration under PRB Act</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#C59E3F] flex-shrink-0" />
                  <span>Complete investigative dossiers with data tables</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenPdfReader}
              className="mt-8 w-full py-3.5 bg-[#0F1012] hover:bg-[#C59E3F] text-white hover:text-[#0F1012] text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-2 shadow"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Institutional Copy</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Footer info strip */}
        <div className="mt-12 text-center text-xs font-sans text-[#0F1012]/60 flex items-center justify-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>The Legends Ink Monthly • Open Public Access Repository • Press Council of India Standards</span>
        </div>

      </div>
    </section>
  );
};
