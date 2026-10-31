import React, { useState, useEffect, useRef } from 'react';
import { Menu, BookOpen, ArrowUpRight, Search, Sliders, ChevronDown, Check, Upload } from 'lucide-react';
import { ArchivedIssue } from '../utils/issueArchive';

interface HeaderUtilityBarProps {
  onOpenMenu: () => void;
  onOpenPdfReader: () => void;
  onOpenCMS: () => void;
  activeIssue?: ArchivedIssue | null;
  archivedIssues?: ArchivedIssue[];
  onSwitchIssue?: (issueId: string) => void;
}

export const HeaderUtilityBar: React.FC<HeaderUtilityBarProps> = ({
  onOpenMenu,
  onOpenPdfReader,
  onOpenCMS,
  activeIssue,
  archivedIssues = [],
  onSwitchIssue,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isIssueMenuOpen, setIsIssueMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsIssueMenuOpen(false);
      }
    };
    if (isIssueMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isIssueMenuOpen]);

  const activeMonthDisplay = activeIssue?.monthYear || 'October 2026';

  return (
    <header
      className={`w-full sticky top-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(18,19,23,0.06)] border-b border-[#121317]/10 text-[#121317]'
          : 'bg-[#FAF9F5] border-b border-[#121317]/08 text-[#121317]'
      }`}
    >
      {/* Luxurious thin gold accent rule at very top */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

      <div className="w-full max-w-[1920px] mx-auto relative flex items-stretch justify-between h-12 md:h-[3.25rem]">

        {/* ── Left cluster: Directory & Issue Badge ── */}
        <div className="flex items-stretch relative z-20">
          <button
            onClick={onOpenMenu}
            aria-label="Open Navigation Directory"
            className="flex items-center space-x-2 px-3 sm:px-5 md:px-7
              border-r border-[#121317]/10
              hover:bg-[#121317] hover:text-[#FAF9F5]
              transition-all duration-300 group focus:outline-none cursor-pointer text-[#121317]"
          >
            <Menu className="w-[15px] h-[15px] stroke-[2.2] transition-transform duration-300 group-hover:rotate-90" />
            <span className="hidden sm:inline text-[10.5px] font-semibold tracking-[0.25em] uppercase font-sans">
              Directory
            </span>
          </button>

          {/* Quick Active Issue Dropdown Switcher */}
          <div className="relative flex items-stretch" ref={dropdownRef}>
            <button
              onClick={() => setIsIssueMenuOpen(!isIssueMenuOpen)}
              className="flex items-center space-x-2 px-2.5 sm:px-4
                border-r border-[#121317]/10
                hover:bg-[#121317]/05 text-[#121317]/85 hover:text-[#121317]
                text-[10px] sm:text-[11px] font-mono tracking-wider uppercase
                transition-all duration-200 cursor-pointer"
              title="Switch magazine edition / issue"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse flex-shrink-0" />
              <span className="font-bold text-[#8F702D] truncate max-w-[85px] sm:max-w-none">
                {activeMonthDisplay}
              </span>
              <ChevronDown className={`w-3 h-3 text-[#121317]/40 transition-transform duration-200 ${isIssueMenuOpen ? 'rotate-180 text-[#C5A059]' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isIssueMenuOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 sm:w-72 bg-white border border-[#C5A059]/40 shadow-2xl z-50 overflow-hidden text-[#121317] animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-3 bg-[#FAF8F4] border-b border-[#121317]/08 flex items-center justify-between">
                  <span className="text-[9.5px] font-mono text-[#8F702D] uppercase tracking-[0.2em] font-bold">
                    EDITIONS ARCHIVE
                  </span>
                  <span className="text-[9px] font-mono text-[#121317]/50">
                    {archivedIssues.length} Available
                  </span>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-[#121317]/06">
                  {archivedIssues.map((issue) => {
                    const isActive = (activeIssue?.id ? activeIssue.id === issue.id : issue.id === 'oct-2026');

                    return (
                      <button
                        key={issue.id}
                        onClick={() => {
                          onSwitchIssue?.(issue.id);
                          setIsIssueMenuOpen(false);
                        }}
                        className={`w-full p-3 flex items-center justify-between text-left transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#C5A059]/15 text-[#8F702D]'
                            : 'hover:bg-[#FAF8F4] text-[#121317]/80'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <img
                            src={issue.coverImage}
                            alt=""
                            className="w-7 h-9 object-cover border border-[#121317]/15 bg-[#FAF8F4] flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="font-headline font-bold text-xs uppercase block truncate text-[#121317]">
                              {issue.monthYear}
                            </span>
                            <span className="text-[9.5px] font-mono text-[#121317]/55 block truncate">
                              {issue.title}
                            </span>
                          </div>
                        </div>

                        {isActive ? (
                          <span className="p-1 rounded-full bg-[#C5A059] text-[#121317] flex-shrink-0 ml-2">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        ) : (
                          <span className="text-[9px] font-mono text-[#121317]/40 uppercase group-hover:text-[#C5A059]">
                            Load
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="p-2.5 bg-[#FAF8F4] border-t border-[#121317]/08 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setIsIssueMenuOpen(false);
                      onOpenCMS();
                    }}
                    className="w-full py-1.5 text-center text-[10px] font-mono text-[#8F702D] hover:text-[#121317] uppercase tracking-wider flex items-center justify-center space-x-1"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Upload New Magazine (PDF)...</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── True Dead Center: The Legends Ink with Logo (hidden on tiny screens if crowded) ── */}
        <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-10">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-2.5 group cursor-pointer focus:outline-none"
          >
            <img
              src="/tli-seal-badge.png"
              alt="The Legends Ink"
              className="w-6 h-6 sm:w-7 sm:h-7 object-contain rounded-full ring-1 ring-[#C5A059]/50 group-hover:ring-[#C5A059] transition-all"
            />
            <span className="font-luxury font-black text-xs sm:text-sm md:text-base tracking-[0.22em] uppercase text-[#121317] whitespace-nowrap group-hover:text-[#8F702D] transition-colors">
              The Legends Ink
            </span>
          </a>
        </div>

        {/* ── Right cluster: Search · Editorial CMS · Read PDF ── */}
        <div className="flex items-stretch relative z-20">
          <button
            onClick={onOpenMenu}
            aria-label="Search stories"
            className="flex items-center space-x-1.5 px-2.5 sm:px-4 md:px-5
              border-l border-[#121317]/10
              hover:bg-[#121317]/05
              transition-all duration-200 focus:outline-none group cursor-pointer text-[#121317]"
          >
            <Search className="w-[13px] h-[13px] sm:w-[14px] sm:h-[14px] stroke-[2] text-[#121317]/60 group-hover:text-[#C5A059] transition-colors" />
            <span className="hidden md:inline text-[10.5px] uppercase tracking-[0.2em] text-[#121317]/70 group-hover:text-[#121317] transition-colors">
              Search
            </span>
          </button>

          {/* Editorial CMS Studio button */}
          <button
            onClick={onOpenCMS}
            aria-label="Editorial CMS & Issue Studio"
            className="flex items-center space-x-1.5 px-2.5 sm:px-4 md:px-5
              border-l border-[#121317]/10
              hover:bg-[#C5A059]/10
              transition-all duration-200 focus:outline-none group cursor-pointer"
            title="Open Editorial CMS & PDF Auto-Extraction Studio"
          >
            <Sliders className="w-[13px] h-[13px] sm:w-[14px] sm:h-[14px] stroke-[2] text-[#8F702D] group-hover:rotate-45 transition-transform" />
            <span className="hidden sm:inline text-[10.5px] uppercase tracking-[0.2em] text-[#8F702D] font-bold group-hover:text-[#121317] transition-colors">
              CMS Studio
            </span>
          </button>

          {/* Primary Gold Action: Read Magazine PDF */}
          <button
            onClick={onOpenPdfReader}
            className="flex items-center space-x-1.5 px-3 sm:px-5 md:px-7
              border-l border-[#121317]/10
              bg-[#C5A059] text-[#121317]
              hover:bg-[#D4B06A] hover:shadow-[0_4px_20px_rgba(197,160,89,0.30)]
              text-[10px] sm:text-[10.5px] md:text-[11px] font-bold tracking-[0.18em] sm:tracking-[0.22em] uppercase
              transition-all duration-300 focus:outline-none group cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 stroke-[2.2] hidden sm:inline text-[#121317]" />
            <span>Read PDF</span>
            <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </header>
  );
};
