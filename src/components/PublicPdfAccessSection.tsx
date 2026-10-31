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
    <section className="w-full bg-[#FAF9F5] py-8 sm:py-16 md:py-24 border-b border-[rgba(18,19,23,0.08)] relative overflow-hidden">
      
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Header with Swiss Cursive Touches */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2 text-[10px] font-sans tracking-[0.25em] text-[#8E7128] uppercase font-bold mb-2 sm:mb-3">
            <FileText className="w-3.5 h-3.5 text-[#8E7128]" />
            <span>OPEN EDITORIAL ARCHIVE &bull; PUBLIC ACCESS</span>
          </div>
          <h2 className="font-headline font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-[0.08em] text-[#121317] leading-tight">
            READ COMPLETE ISSUE AS A PDF
          </h2>
          <p className="font-cursive text-xl sm:text-3xl text-amber-900 font-medium mt-2 sm:mt-3 max-w-2xl mx-auto leading-relaxed">
            "We believe investigative reporting and public accountability must remain universally accessible to all readers."
          </p>
        </div>

        {/* 3 Prominent Swiss Bento Cards with Color Harmonies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
          
          {/* Card 1: Read Full Magazine Online - Sand Pearl */}
          <div className="bento-card bento-sand p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans font-bold tracking-widest text-[#73757C] uppercase bg-[#121317]/5 px-2.5 py-1">
                  DIGITAL EDITION
                </span>
                <span className="text-[10px] font-sans font-bold text-emerald-800 uppercase tracking-wider">
                  Open Public Access
                </span>
              </div>

              <div className="mt-5 flex items-center space-x-3">
                <div className="p-2.5 bg-amber-100/80 border border-amber-900/20 text-amber-900 rounded-xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headline font-black text-xl text-[#121317] uppercase tracking-tight">
                    Read Online
                  </h3>
                  <span className="text-xs font-sans text-amber-950/70 block">Interactive Digital Reader</span>
                </div>
              </div>

              <p className="mt-4 text-xs font-sans text-[#525560] leading-relaxed">
                Flip through the complete pages in high-fidelity right in your browser. Includes smooth page navigation, responsive zoom, and full typographical fidelity.
              </p>

              <ul className="mt-6 space-y-2.5 text-xs font-sans text-[#4A4C54] pt-6 border-t border-[rgba(18,19,23,0.08)]">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#8E7128] flex-shrink-0" />
                  <span>Full high-definition digital folio view</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#8E7128] flex-shrink-0" />
                  <span>Vector typography and authentic print layout</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#8E7128] flex-shrink-0" />
                  <span>Instant access without subscription barrier</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenPdfReader}
              className="mt-8 w-full py-3.5 bg-[#121317] hover:bg-[#8E7128] text-[#FBF9F5] text-xs font-sans font-semibold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center space-x-2 shadow-xs"
            >
              <BookOpen className="w-4 h-4" />
              <span>Open Online Viewer</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#E2BC6A]" />
            </button>
          </div>

          {/* Card 2: Download Full Issue PDF (Featured Bento) - Warm Saffron Silk */}
          <div className="bento-card bento-saffron p-6 sm:p-8 flex flex-col justify-between relative md:-translate-y-2 border-2 border-amber-600/50 shadow-md">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-700 text-white text-[9px] font-sans font-bold tracking-[0.22em] uppercase px-3.5 py-1 shadow-xs rounded-xs">
              OFFICIAL ARCHIVAL COPY
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans font-bold tracking-widest text-amber-900 uppercase">
                  COMPLETE ISSUE
                </span>
                <span className="text-[10px] font-sans font-bold text-emerald-800 uppercase tracking-wider">
                  Full Resolution PDF
                </span>
              </div>

              <div className="mt-5 flex items-center space-x-3">
                <div className="p-2.5 bg-amber-700 text-white rounded-xs">
                  <Download className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-headline font-black text-xl text-[#121317] uppercase tracking-tight">
                    Download PDF
                  </h3>
                  <span className="text-xs font-sans text-amber-950/70 block">Permanent Archival File</span>
                </div>
              </div>

              <p className="mt-4 text-xs font-sans text-[#4A4C54] leading-relaxed">
                Download the complete high-resolution digital print file to your phone, tablet, or desktop for offline reading and research anytime.
              </p>

              <ul className="mt-6 space-y-2.5 text-xs font-sans text-[#4A4C54] pt-6 border-t border-amber-900/10">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-amber-700 flex-shrink-0 font-bold" />
                  <span><strong>Complete Publication</strong> with cover &amp; investigative dossiers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-amber-700 flex-shrink-0 font-bold" />
                  <span>High-resolution vector text and photography</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-amber-700 flex-shrink-0 font-bold" />
                  <span>Permanent archival copy for civic record</span>
                </li>
              </ul>
            </div>

            <a
              href={pdfUrl}
              download="The_Legends_Ink_Monthly.pdf"
              className="mt-8 w-full py-3.5 bg-amber-700 hover:bg-[#121317] text-white text-xs font-sans font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-sm flex items-center justify-center space-x-2 rounded-xs"
            >
              <Download className="w-4 h-4 stroke-[2]" />
              <span>Download Complete PDF</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Card 3: Institutional & Research Circulation - Kashmir Indigo (Desktop only to prevent mobile scroll fatigue) */}
          <div className="hidden md:flex md:flex-col bento-card bento-indigo p-6 sm:p-8 justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans font-bold tracking-widest text-sky-950/70 uppercase bg-[#121317]/5 px-2.5 py-1">
                  PUBLIC RECORD
                </span>
                <span className="text-[10px] font-sans font-bold text-sky-800 uppercase tracking-wider">
                  Open Repository
                </span>
              </div>

              <div className="mt-5 flex items-center space-x-3">
                <div className="p-2.5 bg-sky-900 text-white rounded-xs">
                  <Library className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headline font-black text-xl text-[#121317] uppercase tracking-tight">
                    Library Access
                  </h3>
                  <span className="text-xs font-sans text-sky-950/70 block">Academic &amp; Public Records</span>
                </div>
              </div>

              <p className="mt-4 text-xs font-sans text-[#525560] leading-relaxed">
                Indexed for university libraries, civic researchers, and legal archives across Jammu &amp; Kashmir and international academic departments.
              </p>

              <ul className="mt-6 space-y-2.5 text-xs font-sans text-[#4A4C54] pt-6 border-t border-[rgba(18,19,23,0.08)]">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#8E7128] flex-shrink-0" />
                  <span>Unrestricted rights for classroom &amp; scholarly citation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#8E7128] flex-shrink-0" />
                  <span>Permanent archival registration under PRB Act</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#8E7128] flex-shrink-0" />
                  <span>Complete investigative dossiers with data tables</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenPdfReader}
              className="mt-8 w-full py-3.5 bg-[#121317] hover:bg-[#8E7128] text-[#FBF9F5] text-xs font-sans font-semibold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center space-x-2 shadow-xs"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Institutional Copy</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#E2BC6A]" />
            </button>
          </div>

        </div>

        {/* Footer info strip */}
        <div className="mt-12 text-center text-xs font-sans text-[#73757C] flex items-center justify-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>The Legends Ink Monthly &bull; Open Public Access Repository &bull; Press Council of India Standards</span>
        </div>

      </div>
    </section>
  );
};
