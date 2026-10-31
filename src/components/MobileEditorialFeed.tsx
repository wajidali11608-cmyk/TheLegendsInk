import React, { useState } from 'react';
import { ArrowUpRight, BookOpen, Download, ChevronRight, Layers } from 'lucide-react';
import { Article } from '../data/magazineContent';
import { ArchivedIssue } from '../utils/issueArchive';

interface MobileEditorialFeedProps {
  articles: Article[];
  onOpenArticle: (slug: string) => void;
  activeIssue?: ArchivedIssue | null;
  archivedIssues?: ArchivedIssue[];
  onSwitchIssue?: (issueId: string) => void;
  onOpenPdfReader: () => void;
  onOpenCMS: () => void;
  onOpenManifesto: () => void;
  pdfUrl: string;
}

export const MobileEditorialFeed: React.FC<MobileEditorialFeedProps> = ({
  articles,
  onOpenArticle,
  activeIssue,
  archivedIssues = [],
  onSwitchIssue,
  onOpenPdfReader,
  onOpenManifesto,
  pdfUrl,
}) => {
  const [selectedTopic, setSelectedTopic] = useState('All');

  // 1. Identify primary Cover Story (to be featured exclusively in Hero Spotlight)
  const leadArticle = articles.find((a) => a.isCoverStory) || articles[0];

  // 2. CRITICAL DEDUPLICATION: Exclude leadArticle from the stream so NO story appears twice
  const nonLeadArticles = articles.filter((a) => a.id !== leadArticle?.id);

  // 3. Filter remaining articles by topic
  const filteredArticles = selectedTopic === 'All'
    ? nonLeadArticles
    : nonLeadArticles.filter(
        (a) =>
          a.category.toLowerCase().includes(selectedTopic.toLowerCase()) ||
          a.tags.some((t) => t.toLowerCase().includes(selectedTopic.toLowerCase()))
      );

  const secondaryFeature = filteredArticles[0];
  const compactDispatches = filteredArticles.slice(1, 6);

  const topics = ['All', 'Social Issues', 'National', 'Medical', 'Interviews', 'Culture'];

  return (
    <div className="w-full bg-[#FAF9F5] text-[#121317] flex flex-col py-3 px-3 space-y-5 select-none">
      
      {/* ━━━ 1. MOBILE SPOTLIGHT: Single Lead Cover Investigation (NO DUPLICATES) ━━━ */}
      {leadArticle && (
        <section aria-label="Cover Investigation" className="w-full">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-900/10">
            <div className="flex items-center space-x-1.5 text-[9.5px] font-mono tracking-[0.2em] uppercase text-amber-900 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
              <span>COVER INVESTIGATION</span>
            </div>
            <span className="font-mono text-[9px] text-[#121317]/50 tracking-wider uppercase">
              PRIMARY DISPATCH
            </span>
          </div>

          <div
            onClick={() => onOpenArticle(leadArticle.slug)}
            className="bg-[#FAF6EE] border border-amber-900/15 rounded-sm p-3 shadow-xs active:bg-amber-100/50 transition-colors cursor-pointer"
          >
            {/* Photographic Frame with Aspect Ratio tailored for mobile */}
            <div className="aspect-[16/9] w-full overflow-hidden bg-amber-100/40 relative rounded-xs border border-amber-900/10 mb-2.5">
              <img
                src={leadArticle.image || '/cover-young-achievers.png'}
                alt={leadArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-white/95 backdrop-blur-xs text-[8.5px] font-mono tracking-widest uppercase text-amber-900 font-bold border border-amber-900/10 shadow-xs">
                {leadArticle.category}
              </div>
            </div>

            {/* Typography: Sized specifically to fit phone screens without breaking */}
            <h2 className="font-headline font-black text-base leading-snug uppercase text-[#121317]">
              {leadArticle.title}
            </h2>

            {leadArticle.subtitle && (
              <p className="font-cursive text-base text-amber-900 font-medium leading-snug mt-1 line-clamp-1">
                {leadArticle.subtitle}
              </p>
            )}

            <p className="text-xs font-sans text-[#4A4C54] leading-relaxed mt-1.5 line-clamp-2">
              {leadArticle.excerpt}
            </p>

            {/* Bottom Meta & Action Row */}
            <div className="mt-3 pt-2.5 border-t border-amber-900/10 flex items-center justify-between">
              <div className="text-[10px] font-sans tracking-wider uppercase text-[#121317]/75 font-semibold">
                <span>BY {leadArticle.author}</span>
                <span className="mx-1 text-amber-600">•</span>
                <span>{leadArticle.readTime}</span>
              </div>

              <div className="inline-flex items-center space-x-1 px-2.5 py-1 bg-[#121317] text-[#FAF9F5] text-[9.5px] font-bold uppercase tracking-wider rounded-xs">
                <span>Read</span>
                <ArrowUpRight className="w-3 h-3 text-amber-400" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ━━━ 2. SPECIALIZED DIGITAL EDITION ACCESS CARD (Compact & Instant Utility) ━━━ */}
      <section aria-label="Digital Magazine Edition" className="w-full">
        <div className="bg-[#FAF6EE] border border-[#C5A059]/30 rounded-sm p-3 flex items-center space-x-3 shadow-xs">
          {/* Miniature Glossy Cover */}
          <div
            onClick={onOpenPdfReader}
            className="w-14 h-20 flex-shrink-0 bg-white border border-[#121317]/15 shadow-xs overflow-hidden cursor-pointer active:scale-95 transition-transform"
          >
            <img
              src={activeIssue?.coverImage || '/october-2026-cover.png'}
              alt="Issue Cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details & Actions */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1.5 text-[8.5px] font-mono text-[#8F702D] font-bold uppercase tracking-wider">
              <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
              <span>DIGITAL PRINT EDITION</span>
            </div>
            <h3 className="font-headline font-bold text-xs uppercase text-[#121317] truncate mt-0.5">
              {activeIssue?.issueLabel || 'OCTOBER 2026'} ({activeIssue?.pageCount || 68} PAGES)
            </h3>
            <p className="text-[10.5px] text-[#4A4C54] line-clamp-1 mt-0.5">
              Read authentic high-res print magazine online
            </p>

            <div className="flex items-center space-x-2 mt-2">
              <button
                onClick={onOpenPdfReader}
                className="flex-1 py-1.5 bg-[#121317] active:bg-amber-900 text-[#FAF9F5] text-[9.5px] font-bold uppercase tracking-wider rounded-xs flex items-center justify-center space-x-1 cursor-pointer"
              >
                <BookOpen className="w-3 h-3 text-[#C5A059]" />
                <span>Read PDF</span>
              </button>

              <a
                href={pdfUrl}
                download="The_Legends_Ink_Issue.pdf"
                className="px-2.5 py-1.5 bg-white border border-[#121317]/15 text-[#121317] active:bg-amber-50 text-[9.5px] font-bold uppercase tracking-wider rounded-xs flex items-center space-x-1 cursor-pointer"
                title="Download PDF"
              >
                <Download className="w-3 h-3" />
                <span>PDF</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 3. TOPIC FILTER PILLS (Smooth Touch Scroll) ━━━ */}
      <section aria-label="Topic Selection" className="w-full">
        <div className="flex items-center justify-between pb-1.5 mb-2">
          <span className="text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8F702D] font-bold">
            CURATED DISPATCHES
          </span>
          <span className="text-[9px] font-mono text-[#121317]/40 uppercase">
            {filteredArticles.length} ARTICLES
          </span>
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
          {topics.map((topic) => {
            const isActive = selectedTopic === topic;
            return (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-3 py-1 rounded-full text-[10px] font-sans font-semibold tracking-wider uppercase whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#121317] text-[#FAF9F5] shadow-xs'
                    : 'bg-white border border-[#121317]/10 text-[#121317]/70 active:bg-amber-50'
                }`}
              >
                {topic}
              </button>
            );
          })}
        </div>
      </section>

      {/* ━━━ 4. SPECIALIZED MOBILE CARDS STREAM ━━━ */}
      <section aria-label="Article Stream" className="w-full space-y-3">
        {/* Secondary Feature Card (Only 1 highlighted card) */}
        {secondaryFeature && (
          <div
            onClick={() => onOpenArticle(secondaryFeature.slug)}
            className="bg-white border border-[#121317]/10 rounded-sm p-3 shadow-xs active:bg-amber-50/50 transition-colors cursor-pointer"
          >
            <div className="aspect-[16/9] w-full overflow-hidden bg-amber-50/50 rounded-xs border border-amber-900/08 mb-2 relative">
              <img
                src={secondaryFeature.image || '/cover-young-achievers.png'}
                alt={secondaryFeature.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-white/95 text-[8.5px] font-mono font-bold text-amber-900 uppercase">
                {secondaryFeature.category}
              </div>
            </div>

            <h3 className="font-headline font-bold text-sm uppercase text-[#121317] leading-snug">
              {secondaryFeature.title}
            </h3>

            {secondaryFeature.subtitle && (
              <p className="font-cursive text-sm text-amber-900 font-medium mt-0.5 line-clamp-1">
                {secondaryFeature.subtitle}
              </p>
            )}

            <p className="text-[11.5px] font-sans text-[#4A4C54] mt-1 line-clamp-2 leading-relaxed">
              {secondaryFeature.excerpt}
            </p>

            <div className="mt-2.5 pt-2 border-t border-[#121317]/06 flex items-center justify-between text-[9.5px] font-sans uppercase text-[#121317]/70 font-semibold">
              <span>BY {secondaryFeature.author}</span>
              <span className="flex items-center space-x-1 text-amber-800 font-bold">
                <span>Read</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        )}

        {/* Specialized Compact Horizontal Dispatches (Fast scanning, tap anywhere) */}
        <div className="bg-white border border-[#121317]/10 rounded-sm divide-y divide-[#121317]/08 overflow-hidden shadow-xs">
          {compactDispatches.map((article, idx) => (
            <article
              key={article.id || idx}
              onClick={() => onOpenArticle(article.slug)}
              className="p-3 flex items-center space-x-3 active:bg-amber-50/60 transition-colors cursor-pointer group"
            >
              {/* Left Thumbnail (82x82 px) */}
              <div className="w-20 h-20 flex-shrink-0 bg-amber-50/50 rounded-xs border border-[#121317]/10 overflow-hidden relative">
                <img
                  src={article.image || '/cover-young-achievers.png'}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Content */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-1.5 text-[8.5px] font-mono font-bold uppercase text-amber-800">
                    <span>{article.category}</span>
                    <span className="text-[#121317]/25">•</span>
                    <span className="text-[#121317]/50">{article.readTime}</span>
                  </div>

                  <h4 className="font-headline font-bold text-xs leading-snug uppercase text-[#121317] line-clamp-2 mt-0.5 group-hover:text-amber-800 transition-colors">
                    {article.title}
                  </h4>

                  {article.subtitle && (
                    <p className="font-cursive text-xs text-amber-900 line-clamp-1 mt-0.5">
                      {article.subtitle}
                    </p>
                  )}
                </div>

                <div className="mt-1.5 flex items-center justify-between text-[9px] font-sans text-[#121317]/60 uppercase">
                  <span className="truncate max-w-[130px] font-medium">BY {article.author}</span>
                  <ArrowUpRight className="w-3 h-3 text-amber-700 flex-shrink-0" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ━━━ 5. PAST EDITIONS (Compact Mobile Archive List) ━━━ */}
      {archivedIssues.length > 1 && (
        <section aria-label="Archive Editions" className="w-full bg-[#FAF6EE] border border-amber-900/12 rounded-sm p-3">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-900/10">
            <div className="flex items-center space-x-1.5 text-[9.5px] font-mono tracking-[0.2em] uppercase text-amber-900 font-bold">
              <Layers className="w-3 h-3" />
              <span>ISSUE ARCHIVE (2026)</span>
            </div>
            <span className="text-[9px] font-mono text-[#121317]/50">
              {archivedIssues.length} ISSUES
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {archivedIssues.slice(0, 4).map((issue) => {
              const isActive = (activeIssue?.id ? activeIssue.id === issue.id : issue.id === 'oct-2026');

              return (
                <button
                  key={issue.id}
                  onClick={() => onSwitchIssue?.(issue.id)}
                  className={`p-2 rounded-xs border text-left flex items-center space-x-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white border-amber-800 shadow-xs ring-1 ring-amber-800'
                      : 'bg-white/80 border-[#121317]/10 active:bg-amber-50'
                  }`}
                >
                  <img
                    src={issue.coverImage}
                    alt=""
                    className="w-8 h-11 object-cover border border-[#121317]/10 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="font-headline font-bold text-[10.5px] uppercase block truncate text-[#121317]">
                      {issue.monthYear}
                    </span>
                    <span className="text-[8.5px] font-mono text-amber-800 block truncate">
                      {isActive ? 'Active Issue' : 'Load Issue'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* ━━━ 6. EDITORIAL CREED (Compact Mobile Statement) ━━━ */}
      <section aria-label="Editorial Creed" className="w-full bg-[#121317] text-[#FAF9F5] rounded-sm p-3.5 shadow-sm">
        <div className="flex items-center space-x-1.5 text-[8.5px] font-mono text-[#C5A059] uppercase tracking-[0.2em] font-bold mb-1.5">
          <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
          <span>EDITORIAL CREED & FOUNDING PRINCIPLE</span>
        </div>
        <p className="font-editorial italic text-xs text-[#FAF9F5]/90 leading-relaxed">
          "Journalism in Jammu & Kashmir must be fearless, humane, and locally rooted — speaking truth with uncompromising ethics."
        </p>
        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-wider text-white/60">
            PARVAIZ AHMAD RESHI • EDITOR-IN-CHIEF
          </span>
          <button
            onClick={onOpenManifesto}
            className="text-[9.5px] font-mono text-[#C5A059] hover:underline uppercase tracking-wider cursor-pointer"
          >
            Read Creed &rarr;
          </button>
        </div>
      </section>

    </div>
  );
};
