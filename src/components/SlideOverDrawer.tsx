import React, { useState, useEffect, useRef } from 'react';
import { X, Search, ArrowUpRight, BookOpen, Users, Sliders, Layers, Check } from 'lucide-react';
import { NAVIGATION_CATEGORIES, ARTICLES, MAGAZINE_DETAILS, Article } from '../data/magazineContent';
import { ArchivedIssue } from '../utils/issueArchive';

interface SlideOverDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (cat: string) => void;
  onOpenArticle: (slug: string) => void;
  onOpenFlipbook: () => void;
  onOpenMasthead: () => void;
  onOpenCMS?: () => void;
  articles?: Article[];
  archivedIssues?: ArchivedIssue[];
  activeIssueId?: string;
  onSwitchIssue?: (issueId: string) => void;
}

export const SlideOverDrawer: React.FC<SlideOverDrawerProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onOpenArticle,
  onOpenFlipbook,
  onOpenMasthead,
  onOpenCMS,
  articles,
  archivedIssues = [],
  activeIssueId,
  onSwitchIssue,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    } else {
      setIsVisible(false);
      setSearchQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentArticles = articles || ARTICLES;

  const filteredArticles = searchQuery.trim()
    ? currentArticles.filter(a =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const articleCountByCategory = (cat: string) =>
    cat === "Home"
      ? currentArticles.length
      : currentArticles.filter(a =>
          a.category.toLowerCase().includes(cat.toLowerCase()) ||
          a.tags.some(t => t.toLowerCase() === cat.toLowerCase())
        ).length;

  return (
    <div className="fixed inset-0 z-50 flex select-none">
      {/* ━━━ Architectural Backdrop Tint ━━━ */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-[#07080A]/60 backdrop-blur-sm transition-opacity duration-500 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* ━━━ Minimal Swiss Architectural Drawer ━━━ */}
      <div
        className={`relative w-full max-w-[420px] sm:max-w-[460px]
          bg-[#FAF8F5] text-[#0E0F12]
          h-full shadow-[25px_0_70px_rgba(0,0,0,0.25)]
          flex flex-col z-10 overflow-hidden
          border-r border-[#0E0F12]/[0.12]
          transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${isVisible ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Subtle Gold Hairline Edge Accent */}
        <div className="absolute top-0 right-0 w-[1px] h-full bg-[#C59E3F]/40 pointer-events-none" />

        {/* ━━━ 1. Minimal Swiss Header ━━━ */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#0E0F12]/[0.08] bg-[#F5F2EC]">
          <div className="flex items-center space-x-3.5">
            <img
              src="/tli-seal-badge.png"
              alt="The Legends Ink Crest"
              className="w-9 h-9 rounded-full ring-1 ring-[#C59E3F]/50 object-contain bg-white shadow-sm"
            />
            <div>
              <div className="font-luxury font-bold text-[14px] tracking-[0.18em] uppercase text-[#0E0F12] leading-none">
                The Legends Ink
              </div>
              <div className="text-[9px] font-mono tracking-[0.24em] text-[#C59E3F] uppercase font-bold mt-1">
                Journal of Record · Vol. 01
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close directory"
            className="w-8 h-8 flex items-center justify-center
              border border-[#0E0F12]/15 rounded-[2px] bg-white
              hover:bg-[#0E0F12] hover:text-white hover:border-[#0E0F12]
              transition-all duration-200 focus:outline-none group shadow-xs"
          >
            <X className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover:rotate-90" />
          </button>
        </div>

        {/* ━━━ 2. Seamless Swiss Search Input ━━━ */}
        <div className="px-6 py-3.5 bg-white border-b border-[#0E0F12]/[0.08]">
          <div className="relative flex items-center bg-[#FAF8F5] border border-[#0E0F12]/10 rounded-[2px] px-3.5 py-2
            focus-within:border-[#C59E3F] focus-within:ring-1 focus-within:ring-[#C59E3F]/20 transition-all duration-200">
            <Search className="w-3.5 h-3.5 text-[#C59E3F] mr-2.5 flex-shrink-0 stroke-[2]" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dossiers, authors, keywords…"
              className="w-full bg-transparent text-[11.5px] font-sans tracking-wide text-[#0E0F12] placeholder-[#0E0F12]/40 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#0E0F12]/40 hover:text-[#0E0F12] p-0.5 ml-1.5 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Instant Search Results */}
          {searchQuery && (
            <div className="mt-3 max-h-56 overflow-y-auto space-y-1.5 custom-scrollbar pr-1">
              {filteredArticles.length > 0 ? (
                filteredArticles.map(a => (
                  <button
                    key={a.id}
                    onClick={() => { onOpenArticle(a.slug); onClose(); }}
                    className="w-full text-left p-2.5 rounded-[2px] bg-[#FAF8F5] border border-[#0E0F12]/[0.08]
                      hover:border-[#C59E3F] transition-all duration-150 group"
                  >
                    <div className="flex items-center justify-between text-[8.5px] font-mono uppercase tracking-wider text-[#C59E3F] font-bold">
                      <span>{a.category}</span>
                      <span className="text-[#0E0F12]/40 font-normal">{a.readTime}</span>
                    </div>
                    <div className="text-[12px] font-serif font-bold text-[#0E0F12] group-hover:text-[#C59E3F] transition-colors mt-0.5 line-clamp-1">
                      {a.title}
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-3 text-[11px] font-sans text-[#0E0F12]/50 italic text-center bg-[#FAF8F5] border border-[#0E0F12]/[0.06]">
                  No investigations found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* ━━━ 3. Main Navigation List (Pure Swiss Editorial Architecture) ━━━ */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          
          {/* Section Header 01 */}
          <div className="px-6 pt-5 pb-2 flex items-center justify-between border-b border-[#0E0F12]/[0.04]">
            <span className="text-[9px] font-mono tracking-[0.28em] uppercase text-[#0E0F12]/45 font-bold flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 bg-[#C59E3F] inline-block rounded-xs" />
              <span>EDITORIAL ARCHIVE</span>
            </span>
            <span className="text-[9px] font-mono text-[#0E0F12]/40 tracking-wider">
              {NAVIGATION_CATEGORIES.length} DOMAINS
            </span>
          </div>

          {/* 10 Editorial Categories */}
          <ul className="px-4 py-1.5 divide-y divide-[#0E0F12]/[0.04]">
            {NAVIGATION_CATEGORIES.map((cat, index) => {
              const isHovered = hoveredIndex === index;
              const count = articleCountByCategory(cat);
              const indexNum = String(index + 1).padStart(2, '0');

              return (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      onClose();
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`
                      w-full text-left flex items-center justify-between
                      px-3 py-2.5 transition-all duration-200 group rounded-[2px]
                      ${isHovered ? 'bg-[#F2EEE4] pl-4' : 'hover:bg-[#F6F3EC]'}
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      {/* Swiss Monospace Number */}
                      <span className={`
                        text-[9.5px] font-mono font-bold tracking-wider w-5 transition-colors duration-200
                        ${isHovered ? 'text-[#C59E3F]' : 'text-[#0E0F12]/35'}
                      `}>
                        {indexNum}
                      </span>

                      {/* Category Title */}
                      <span className={`
                        font-sans text-[12.5px] uppercase tracking-[0.14em] font-semibold transition-colors duration-200
                        ${isHovered ? 'text-[#0E0F12]' : 'text-[#0E0F12]/80'}
                      `}>
                        {cat}
                      </span>
                    </div>

                    {/* Subtle dossier count */}
                    <span className={`
                      text-[9px] font-mono transition-colors duration-200
                      ${isHovered ? 'text-[#C59E3F] font-bold' : 'text-[#0E0F12]/35'}
                    `}>
                      {count > 0 ? `(${count})` : ''}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Archived Editions Selector (October, November, etc.) */}
          {archivedIssues && archivedIssues.length > 0 && (
            <div className="px-4 pt-4 pb-2 border-t border-[#0E0F12]/[0.08] bg-[#F5F2EC]/60">
              <div className="flex items-center justify-between px-2 mb-2">
                <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#C59E3F] font-bold flex items-center space-x-1.5">
                  <Layers className="w-3 h-3 text-[#C59E3F]" />
                  <span>MAGAZINE EDITIONS ({archivedIssues.length})</span>
                </span>
                <span className="text-[9px] font-mono text-[#0E0F12]/40 uppercase">Tap to Switch</span>
              </div>

              <div className="space-y-1.5">
                {archivedIssues.map((iss) => {
                  const isActive = (activeIssueId ? activeIssueId === iss.id : iss.id === 'oct-2026');
                  return (
                    <button
                      key={iss.id}
                      onClick={() => {
                        onSwitchIssue?.(iss.id);
                        onClose();
                      }}
                      className={`w-full p-2 text-left rounded-[2px] transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'bg-[#0E0F12] text-[#FBF9F5] shadow-sm'
                          : 'bg-white/80 hover:bg-white text-[#0E0F12] border border-[#0E0F12]/10'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <img
                          src={iss.coverImage}
                          alt=""
                          className="w-6 h-8 object-cover border border-black/20 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <span className={`text-[11px] font-headline font-bold uppercase truncate block ${isActive ? 'text-[#C59E3F]' : 'text-[#0E0F12]'}`}>
                            {iss.monthYear}
                          </span>
                          <span className={`text-[9px] font-mono block truncate ${isActive ? 'text-white/60' : 'text-[#0E0F12]/50'}`}>
                            {iss.pageCount} Pages • {iss.articles.length} Dossiers
                          </span>
                        </div>
                      </div>

                      {isActive ? (
                        <span className="px-1.5 py-0.5 bg-[#C59E3F] text-[#0E0F12] text-[8.5px] font-mono font-bold tracking-wider uppercase flex items-center space-x-1">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                          <span>Active</span>
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono text-[#0E0F12]/40 uppercase hover:text-[#C59E3F]">
                          Load
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section Header 02: Publications & Registry */}
          <div className="px-6 pt-5 pb-2 flex items-center justify-between border-t border-b border-[#0E0F12]/[0.06] mt-2">
            <span className="text-[9px] font-mono tracking-[0.28em] uppercase text-[#0E0F12]/45 font-bold flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 bg-[#C59E3F] inline-block rounded-xs" />
              <span>PUBLICATIONS & DESK</span>
            </span>
          </div>

          {/* Mature Swiss Utility Links */}
          <div className="px-4 py-2 space-y-1">
            
            {/* Read Complete Magazine PDF */}
            <button
              onClick={() => { onOpenFlipbook(); onClose(); }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-[2px]
                hover:bg-[#F2EEE4] transition-colors duration-200 text-left group"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="w-3.5 h-3.5 text-[#C59E3F] flex-shrink-0" />
                <div>
                  <div className="text-[12px] font-sans font-semibold uppercase tracking-[0.12em] text-[#0E0F12] group-hover:text-[#C59E3F] transition-colors">
                    Read Magazine (PDF)
                  </div>
                  <div className="text-[9px] font-mono text-[#0E0F12]/50 tracking-wider uppercase">
                    Complete 68 Pages · Free Access
                  </div>
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold text-emerald-700 tracking-wider uppercase">
                Free
              </span>
            </button>

            {/* Editorial Board */}
            <button
              onClick={() => { onOpenMasthead(); onClose(); }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-[2px]
                hover:bg-[#F2EEE4] transition-colors duration-200 text-left group"
            >
              <div className="flex items-center space-x-3">
                <Users className="w-3.5 h-3.5 text-[#C59E3F] flex-shrink-0" />
                <div>
                  <div className="text-[12px] font-sans font-semibold uppercase tracking-[0.12em] text-[#0E0F12] group-hover:text-[#C59E3F] transition-colors">
                    Editorial Board & Bureau
                  </div>
                  <div className="text-[9px] font-mono text-[#0E0F12]/50 tracking-wider uppercase">
                    Masthead, Editors & Legal Advisers
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#0E0F12]/30 group-hover:text-[#C59E3F] transition-colors" />
            </button>

            {/* Editorial CMS Studio & PDF Extraction */}
            {onOpenCMS && (
              <button
                onClick={() => { onOpenCMS(); onClose(); }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-[2px]
                  hover:bg-[#F2EEE4] transition-colors duration-200 text-left group border border-[#C59E3F]/30 bg-[#FAF8F3]"
              >
                <div className="flex items-center space-x-3">
                  <Sliders className="w-3.5 h-3.5 text-[#C59E3F] flex-shrink-0" />
                  <div>
                    <div className="text-[12px] font-sans font-semibold uppercase tracking-[0.12em] text-[#0E0F12] group-hover:text-[#C59E3F] transition-colors">
                      Editorial CMS & Studio
                    </div>
                    <div className="text-[9px] font-mono text-[#0E0F12]/50 tracking-wider uppercase">
                      Upload New Month PDF · Auto-Extract
                    </div>
                  </div>
                </div>
                <span className="text-[9px] font-mono font-bold text-[#C59E3F] tracking-wider uppercase">
                  CMS
                </span>
              </button>
            )}

          </div>
        </div>

        {/* ━━━ 4. Swiss Architectural Footer ━━━ */}
        <div className="px-6 py-3.5 border-t border-[#0E0F12]/[0.08] bg-[#F5F2EC] flex items-center justify-between text-[9px] font-mono tracking-[0.2em] uppercase text-[#0E0F12]/50">
          <span>SRINAGAR & BANDIPORA</span>
          <span className="text-[#C59E3F] font-bold">ISSN {MAGAZINE_DETAILS.issn}</span>
        </div>

      </div>
    </div>
  );
};
