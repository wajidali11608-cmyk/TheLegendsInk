import React, { useState } from 'react';
import { ArrowUpRight, BookOpen, Check, Layers } from 'lucide-react';
import { ISSUE_EDITIONS, IssueEdition } from '../data/magazineContent';
import { ArchivedIssue } from '../utils/issueArchive';

interface AccordionTimelineProps {
  onOpenIssueReader: (issueId: string) => void;
  onOpenArchive: () => void;
  archivedIssues?: ArchivedIssue[];
  activeIssueId?: string;
  onSwitchIssue?: (issueId: string) => void;
}

interface TimelineEdition extends IssueEdition {
  isArchivedUpload?: boolean;
}

export const AccordionTimeline: React.FC<AccordionTimelineProps> = ({
  onOpenIssueReader,
  onOpenArchive,
  archivedIssues = [],
  activeIssueId,
  onSwitchIssue,
}) => {
  // Combine hardcoded past editions with any uploaded archived issues
  const uploadedEditions: TimelineEdition[] = archivedIssues.map((issue) => ({
    id: issue.id,
    issueNumber: issue.issueLabel || 'Custom Edition',
    volume: 'Vol. 01',
    monthYear: issue.monthYear || 'Archived Month',
    dateDisplay: new Date(issue.uploadedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    title: issue.title,
    subtitle: `${issue.articles.length} Extracted Investigations & Stories`,
    editor: 'EDITORIAL BOARD',
    coverImage: issue.coverImage || '/october-2026-cover.png',
    pages: issue.pageCount || 68,
    price: 'Free Access',
    status: (issue.id === activeIssueId ? 'current' : 'archive') as 'current' | 'archive' | 'upcoming',
    highlights: issue.articles.slice(0, 3).map((a) => a.title),
    isArchivedUpload: true,
  }));

  const displayEditions: TimelineEdition[] = [
    ...uploadedEditions,
    ...ISSUE_EDITIONS.filter(base => !uploadedEditions.some(u => u.monthYear.toLowerCase().includes(base.monthYear.toLowerCase()))).map(b => ({
      ...b,
      isArchivedUpload: false,
    }))
  ];

  // Default to active issue or current October 2026 issue expanded
  const [activeId, setActiveId] = useState<string>(
    activeIssueId || (uploadedEditions[0]?.id) || 'oct-2026'
  );

  return (
    <section className="w-full bg-[#FBF9F5] border-b border-[rgba(15,16,18,0.12)] select-none">
      <div className="w-full">
        
        {/* Desktop / Tablet: Horizontal Accordion Matrix */}
        <div className="hidden md:flex items-stretch w-full min-h-[500px] lg:min-h-[560px] border-t border-[rgba(15,16,18,0.12)] overflow-hidden">
          
          {/* First Fixed Column: "Complete Archive" */}
          <button
            onClick={onOpenArchive}
            className="w-16 lg:w-24 border-r border-[rgba(15,16,18,0.12)] bg-[#FAF8F3] hover:bg-[#EFECE5] transition-colors flex flex-col justify-between items-center py-8 group focus:outline-none cursor-pointer"
            title="Browse Complete Archive"
          >
            <div className="w-10 h-10 rounded-full border border-[rgba(15,16,18,0.2)] group-hover:border-[#C59E3F] group-hover:bg-[#C59E3F]/10 flex items-center justify-center transition-all duration-300">
              <ArrowUpRight className="w-4 h-4 text-[#0F1012] group-hover:text-[#C59E3F] stroke-[2] group-hover:scale-125 transition-transform" />
            </div>
            
            <div className="flex flex-col items-center space-y-4">
              <span className="writing-mode-vertical-flipped font-sans font-bold text-xs tracking-[0.25em] uppercase text-[#0F1012] group-hover:text-[#C59E3F] transition-colors">
                Archive & Editions
              </span>
              <div className="w-[1px] h-8 bg-[rgba(15,16,18,0.2)] group-hover:bg-[#C59E3F] transition-colors" />
            </div>

            <div className="text-[10px] font-mono text-[#0F1012]/60 group-hover:text-[#0F1012] font-bold tracking-widest">
              2026
            </div>
          </button>

          {/* Dynamic Accordion Columns */}
          {displayEditions.map((issue) => {
            const isExpanded = activeId === issue.id;
            const isCurrent = issue.status === 'current' || (activeIssueId && issue.id === activeIssueId);

            return (
              <div
                key={issue.id}
                onClick={() => setActiveId(issue.id)}
                className={`border-r border-[rgba(15,16,18,0.12)] relative flex flex-col justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden ${
                  isExpanded 
                    ? "flex-[4.5] bg-[#FAF8F3] p-8 lg:p-10 shadow-inner" 
                    : "flex-[0.75] lg:flex-[0.85] bg-[#FBF9F5] hover:bg-[#EFECE5] py-8 items-center"
                }`}
              >
                {/* Active subtle top hairline */}
                <div className={`absolute top-0 left-0 right-0 h-1 transition-colors duration-500 ${
                  isExpanded ? 'bg-[#0F1012]' : 'bg-transparent'
                }`} />

                {isExpanded ? (
                  /* Expanded View */
                  <div className="w-full h-full flex flex-col justify-between animate-in fade-in duration-500">
                    
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                      {/* Left: Magazine Cover Card */}
                      <div className="relative group/cover w-full lg:w-56 xl:w-64 flex-shrink-0">
                        <div className="relative overflow-hidden border border-[rgba(15,16,18,0.15)] bg-[#0F1012] shadow-xl">
                          <img 
                            src={issue.id === 'oct-2026' ? '/october-2026-cover.png' : issue.coverImage} 
                            alt={issue.title}
                            className="w-full h-64 lg:h-76 object-cover filter contrast-[1.02] group-hover/cover:scale-105 transition-transform duration-700" 
                          />
                        </div>

                        {/* Status Tag on Cover */}
                        {isCurrent && (
                          <div className="absolute top-2 left-2 bg-[#0F1012] text-[#C59E3F] text-[9px] font-sans font-bold tracking-widest uppercase px-2.5 py-1 border border-[#C59E3F]/40 flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C59E3F] animate-ping" />
                            <span>CURRENT RELEASE</span>
                          </div>
                        )}
                      </div>

                      {/* Right: Metadata, Headline & Highlights */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center space-x-2 text-[10px] font-sans tracking-[0.2em] text-[#C59E3F] uppercase font-bold">
                            <span>{issue.monthYear}</span>
                            <span>•</span>
                            <span className="text-[#0F1012]/60">{issue.pages} PAGES</span>
                            {issue.isArchivedUpload && (
                              <>
                                <span>•</span>
                                <span className="bg-[#C59E3F]/15 text-[#C59E3F] px-1.5 py-0.5 rounded text-[9px]">UPLOADED ARCHIVE</span>
                              </>
                            )}
                          </div>

                          <h3 className="font-headline font-black text-2xl lg:text-3xl text-[#0F1012] uppercase tracking-tight mt-2 leading-[1.05]">
                            {issue.title}
                          </h3>

                          <p className="text-sm font-editorial italic text-[#0F1012]/80 mt-2 leading-relaxed">
                            {issue.subtitle}
                          </p>

                          {/* Highlights List */}
                          {issue.highlights && issue.highlights.length > 0 && (
                            <div className="mt-5 pt-4 border-t border-[rgba(15,16,18,0.12)] space-y-2">
                              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#0F1012]/60 block font-bold">
                                Dossier Highlights:
                              </span>
                              <div className="grid grid-cols-1 gap-1.5 mt-1">
                                {issue.highlights.map((hl, idx) => (
                                  <div key={idx} className="flex items-start space-x-2 text-xs font-sans text-[#0F1012]/80">
                                    <span className="text-[#C59E3F] font-bold">―</span>
                                    <span>{hl}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="flex items-center justify-between pt-6 border-t border-[rgba(15,16,18,0.12)] mt-6">
                      <div className="text-[10px] font-sans tracking-[0.2em] text-[#0F1012]/60 uppercase flex items-center space-x-2">
                        <span>{issue.editor}</span>
                        {isCurrent && (
                          <span className="text-emerald-700 font-bold flex items-center space-x-1">
                            <Check className="w-3 h-3" />
                            <span>ACTIVE STORIES</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-3">
                        {/* Switch to this edition if not currently active */}
                        {(issue.isArchivedUpload || issue.id === 'oct-2026') && onSwitchIssue && issue.id !== activeIssueId && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSwitchIssue(issue.id);
                            }}
                            className="px-4 py-2.5 bg-white border border-[#0F1012]/20 hover:border-[#C59E3F] text-[#0F1012] text-xs font-bold tracking-wider uppercase flex items-center space-x-1.5 transition-colors shadow-sm"
                            title="Load this month's headlines, cover, and articles into the portal"
                          >
                            <Layers className="w-3.5 h-3.5 text-[#C59E3F]" />
                            <span>Load Stories</span>
                          </button>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (issue.isArchivedUpload && onSwitchIssue && issue.id !== activeIssueId) {
                              onSwitchIssue(issue.id);
                            }
                            onOpenIssueReader(issue.id);
                          }}
                          className="px-6 py-2.5 bg-[#0F1012] hover:bg-[#C59E3F] text-[#FBF9F5] hover:text-[#0F1012] text-xs font-bold tracking-widest uppercase flex items-center space-x-2 transition-all duration-300 shadow-md group/btn"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-[#C59E3F] group-hover/btn:text-[#0F1012] transition-colors" />
                          <span>Open Flipbook Edition</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                ) : (
                  /* Collapsed View */
                  <div className="w-full h-full flex flex-col justify-between items-center py-2">
                    <div className="pt-2">
                      <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isCurrent 
                          ? 'bg-[#C59E3F] ring-4 ring-[#C59E3F]/30 animate-pulse' 
                          : 'bg-[#0F1012]/20 group-hover:bg-[#0F1012]/50'
                      }`} />
                    </div>

                    {/* Center: Vertical Rotated Date */}
                    <div className="writing-mode-vertical font-headline font-black text-sm lg:text-base tracking-[0.2em] uppercase text-[#0F1012] whitespace-nowrap group-hover:text-[#C59E3F] transition-colors my-auto">
                      {issue.monthYear}
                    </div>

                    <div className="pb-2">
                      <div className="writing-mode-vertical font-mono text-[9px] tracking-[0.2em] uppercase text-[#0F1012]/50 whitespace-nowrap">
                        {isCurrent ? 'ACTIVE' : (issue.isArchivedUpload ? 'UPLOAD' : 'ARCHIVE')}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

        </div>

        {/* Mobile View (<768px): Vertical Stack Accordion */}
        <div className="md:hidden flex flex-col border-t border-[rgba(15,16,18,0.12)] divide-y divide-[rgba(15,16,18,0.12)]">
          <div 
            onClick={onOpenArchive}
            className="p-5 flex items-center justify-between bg-[#EFECE5] cursor-pointer"
          >
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-[#0F1012]">
              All Issues & Complete Archive
            </span>
            <ArrowUpRight className="w-4 h-4 text-[#0F1012]" />
          </div>

          {displayEditions.map((issue) => {
            const isExpanded = activeId === issue.id;
            const isCurrent = issue.status === 'current' || (activeIssueId && issue.id === activeIssueId);

            return (
              <div key={issue.id} className="p-5 bg-[#FAF8F3]">
                <button
                  onClick={() => setActiveId(isExpanded ? '' : issue.id)}
                  className="w-full flex items-center justify-between text-left focus:outline-none"
                >
                  <div>
                    <span className="text-[10px] font-sans text-[#C59E3F] font-bold tracking-wider block uppercase">
                      {issue.monthYear} {isCurrent && '• CURRENT'}
                    </span>
                    <span className="font-headline font-bold text-base uppercase text-[#0F1012]">
                      {issue.title}
                    </span>
                  </div>
                  <span className="font-mono text-sm text-[#0F1012]/60">
                    {isExpanded ? '−' : '+'}
                  </span>
                </button>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-[rgba(15,16,18,0.12)]">
                    <img 
                      src={issue.id === 'oct-2026' ? '/october-2026-cover.png' : issue.coverImage} 
                      alt={issue.title}
                      className="w-full h-56 object-cover border border-[rgba(15,16,18,0.15)] mb-3 shadow"
                    />
                    <p className="text-xs font-editorial italic text-[#0F1012]/80 mt-1">
                      {issue.subtitle}
                    </p>
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-[rgba(15,16,18,0.12)]">
                      <span className="text-[10px] font-sans text-[#0F1012]/60 uppercase">
                        {issue.editor}
                      </span>
                      <div className="flex items-center space-x-2">
                        {(issue.isArchivedUpload || issue.id === 'oct-2026') && onSwitchIssue && issue.id !== activeIssueId && (
                          <button
                            onClick={() => onSwitchIssue(issue.id)}
                            className="bg-white border border-[#0F1012] text-[#0F1012] text-xs font-bold px-3 py-2 uppercase tracking-wider"
                          >
                            Load Stories
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if ((issue.isArchivedUpload || issue.id === 'oct-2026') && onSwitchIssue && issue.id !== activeIssueId) {
                              onSwitchIssue(issue.id);
                            }
                            onOpenIssueReader(issue.id);
                          }}
                          className="bg-[#0F1012] text-white text-xs font-bold px-4 py-2 uppercase tracking-wider flex items-center space-x-1.5"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-[#C59E3F]" />
                          <span>Read Issue</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

