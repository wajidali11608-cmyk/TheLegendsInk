import { useState, useEffect, useCallback } from 'react';
import { HeaderUtilityBar } from './components/HeaderUtilityBar';
import { Masthead } from './components/Masthead';
import { SectionNavRow } from './components/SectionNavRow';
import { HeroCarousel } from './components/HeroCarousel';
import { SectionTitleBanner } from './components/SectionTitleBanner';
import { FiveColumnEditorialGrid } from './components/FiveColumnEditorialGrid';
import { DarkSplitFeature } from './components/DarkSplitFeature';
import { AccordionTimeline } from './components/AccordionTimeline';
import { PrintEditionShowcase } from './components/PrintEditionShowcase';
import { TopicDossierGrid } from './components/TopicDossierGrid';
import { PublicPdfAccessSection } from './components/PublicPdfAccessSection';
import { FooterDark } from './components/FooterDark';
import { ArticleModal } from './components/ArticleModal';
import { MagazinePdfReaderModal } from './components/MagazinePdfReaderModal';
import { EditorialCMSModal } from './components/EditorialCMSModal';
import { MastheadTeamModal } from './components/MastheadTeamModal';
import { SlideOverDrawer } from './components/SlideOverDrawer';
import { MobileEditorialFeed } from './components/MobileEditorialFeed';
import { Preloader } from './components/Preloader';
import { Article, MAGAZINE_DETAILS } from './data/magazineContent';
import { getInitialArticles, saveArticlesToCMS } from './utils/cmsStorage';
import {
  ArchivedIssue,
  DEFAULT_NOVEMBER_ISSUE,
  DEFAULT_OCTOBER_ISSUE,
  listArchivedIssues,
  loadActiveIssue,
  loadIssueFromArchive,
  setActiveIssueId,
  saveIssueToArchive,
} from './utils/issueArchive';
import { publishIssueGlobally } from './utils/liveSyncService';

const DEFAULT_PDF_URL = '/tli-november-2026.pdf';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('Home');
  const [activeArticleSlug, setActiveArticleSlug] = useState<string | null>(null);
  const [isPdfReaderOpen, setIsPdfReaderOpen] = useState(false);
  const [isCMSOpen, setIsCMSOpen] = useState(false);
  const [isMastheadOpen, setIsMastheadOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  // Live Articles (loaded from active issue or CMS)
  const [articles, setArticles] = useState<Article[]>(getInitialArticles());

  // Active Magazine PDF state
  const [activePdfUrl, setActivePdfUrl] = useState<string>(DEFAULT_PDF_URL);

  // Multi-issue archive state (defaults to November 2026 with October in archive)
  const [archivedIssues, setArchivedIssues] = useState<ArchivedIssue[]>([DEFAULT_NOVEMBER_ISSUE, DEFAULT_OCTOBER_ISSUE]);
  const [activeIssue, setActiveIssue] = useState<ArchivedIssue | null>(DEFAULT_NOVEMBER_ISSUE);

  // Refresh the list of archived issues from IndexedDB
  const refreshArchive = useCallback(async () => {
    const issues = await listArchivedIssues();
    setArchivedIssues(issues);
  }, []);

  // On mount: load archived issues list & restore the active issue (defaulting to November 2026)
  useEffect(() => {
    (async () => {
      await refreshArchive();

      const result = await loadActiveIssue();
      if (result) {
        setActivePdfUrl(result.blobUrl);
        setActiveIssue(result.issue);
        // Restore articles from the active issue
        if (result.issue.articles && result.issue.articles.length > 0) {
          setArticles(result.issue.articles);
        }
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Switch to a different archived issue (e.g. November -> October, or October -> November)
  const handleSwitchIssue = useCallback(async (issueId: string) => {
    const result = await loadIssueFromArchive(issueId);
    if (result) {
      await setActiveIssueId(issueId);
      setActivePdfUrl(result.blobUrl);
      setActiveIssue(result.issue);
      if (result.issue.articles && result.issue.articles.length > 0) {
        setArticles(result.issue.articles);
        saveArticlesToCMS(result.issue.articles);
      }
      await refreshArchive();
    }
  }, [refreshArchive]);

  // When CMS publishes a new issue: save to archive, write to project disk, and sync to GitHub
  const handleCMSPublishIssue = useCallback(async (
    _pdfUrl: string,
    meta: { title: string; issueLabel: string; pageCount: number; coverImage?: string },
    file?: File,
    extractedArticles?: Article[]
  ) => {
    if (file && extractedArticles) {
      // Extract clean month/year from issueLabel e.g. "VOL. 01 • ISSUE 04 • NOVEMBER 2026"
      const parts = meta.issueLabel.split('•').map(p => p.trim());
      const cleanMonthYear = parts.length >= 3 ? parts[2] : meta.issueLabel;

      // Full archive flow — save PDF + articles permanently to IndexedDB
      const { id, blobUrl } = await saveIssueToArchive(file, {
        title: meta.title,
        issueLabel: meta.issueLabel,
        monthYear: cleanMonthYear,
        coverImage: meta.coverImage || '/november-2026-cover.png',
        pageCount: meta.pageCount,
        articles: extractedArticles,
      });

      setActivePdfUrl(blobUrl);
      const newIssueRecord: ArchivedIssue = {
        id,
        monthYear: cleanMonthYear,
        title: meta.title,
        issueLabel: meta.issueLabel,
        fileName: file.name,
        coverImage: meta.coverImage || '/november-2026-cover.png',
        pageCount: meta.pageCount,
        uploadedAt: new Date().toISOString(),
        articles: extractedArticles,
      };
      setActiveIssue(newIssueRecord);
      setArticles(extractedArticles);
      saveArticlesToCMS(extractedArticles);

      // Automatically publish globally (writes to project files via local dev server and syncs to GitHub)
      try {
        await publishIssueGlobally(newIssueRecord, file);
      } catch (syncErr) {
        console.warn('Global publish sync warning:', syncErr);
      }

      await refreshArchive();
    } else {
      // Fallback for non-file publish (just PDF url update)
      setActivePdfUrl(_pdfUrl);
    }
  }, [refreshArchive]);

  // Filter articles based on active category
  const filteredArticles = activeCategory === 'Home'
    ? articles
    : articles.filter(a =>
        a.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
        a.tags.some(t => t.toLowerCase() === activeCategory.toLowerCase())
      );

  const activeArticle = articles.find(a => a.slug === activeArticleSlug) || null;

  const handleOpenArticle = (slug: string) => {
    setActiveArticleSlug(slug);
  };

  const handleCloseArticle = () => {
    setActiveArticleSlug(null);
  };

  return (
    <div className="relative min-h-screen bg-[#FBF9F5] text-[#0F1012] flex flex-col font-sans antialiased overflow-x-hidden">
      {/* Cinematic Ink Preloader */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* 1. TOP UTILITY BAR (Directory, Active Issue Switcher, Masthead Branding, CMS & Read PDF) */}
      <HeaderUtilityBar
        onOpenMenu={() => setIsDrawerOpen(true)}
        onOpenPdfReader={() => setIsPdfReaderOpen(true)}
        onOpenCMS={() => setIsCMSOpen(true)}
        activeIssue={activeIssue}
        archivedIssues={archivedIssues}
        onSwitchIssue={handleSwitchIssue}
      />

      {/* 2. GIANT MASTHEAD (Official PDF Emblem, Regal Cinzel typography & Active Issue Label) */}
      <Masthead
        onOpenArticle={handleOpenArticle}
        activeIssue={activeIssue}
        archivedIssues={archivedIssues}
        onSwitchIssue={handleSwitchIssue}
        onOpenCMS={() => setIsCMSOpen(true)}
      />

      {/* 3. SECTION NAVIGATION ROW (Exact 10 Swiss Categories with smooth touch scrolling) */}
      <SectionNavRow
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onOpenSearch={() => setIsDrawerOpen(true)}
      />

      {/* Main Editorial Content Stream */}
      <main className="flex-1 w-full flex flex-col">
        {/* If category is filtered, show curated stream banner */}
        {activeCategory !== 'Home' && (
          <div className="w-full bg-[#FAF8F3] border-b border-[rgba(15,16,18,0.12)] px-4 md:px-8 py-3.5 flex items-center justify-between max-w-[1920px] mx-auto">
            <div className="flex items-center space-x-2 text-xs font-sans tracking-wider uppercase">
              <span className="text-[#0F1012]/60">SECTION ARCHIVE:</span>
              <span className="font-bold text-[#0F1012]">{activeCategory}</span>
              <span className="text-[#0F1012]/60">({filteredArticles.length} investigations)</span>
            </div>
            <button
              onClick={() => setActiveCategory('Home')}
              className="text-xs font-sans underline uppercase hover:text-[#C59E3F] transition-colors cursor-pointer"
            >
              Reset to Home
            </button>
          </div>
        )}

        {/* ─── DESKTOP EDITORIAL LAYOUT (MD & UP) — 100% UNCHANGED FOR PC ─── */}
        <div className="hidden md:block">
          {/* 4. HERO CAROUSEL FRAME (Top Breaking Investigations & Extracted Headlines) */}
          <HeroCarousel
            articles={filteredArticles}
            onOpenArticle={handleOpenArticle}
          />

          {/* 5. FULL-WIDTH SECTION TITLE BANNER (Swiss Minimalist) */}
          <SectionTitleBanner
            title={activeCategory === 'Home' ? "THE EDITORIAL DOSSIER" : `${activeCategory.toUpperCase()} DOSSIER`}
            tagline={activeCategory === 'Home'
              ? "INDEPENDENT INVESTIGATIVE INQUIRY • PUBLIC ACCOUNTABILITY • ETHICAL JOURNALISM"
              : `CURATED INVESTIGATIVE REPORTING FROM JAMMU & KASHMIR`}
          />

          {/* 6. FIVE-COLUMN EDITORIAL GRID (Dynamic CMS Headlines, Top Investigations, Ground Reports) */}
          <FiveColumnEditorialGrid
            articles={articles}
            onOpenArticle={handleOpenArticle}
          />

          {/* 7. PRINT EDITION SHOWCASE (Highlighting Active Issue, Auto-Cover & PDF) */}
          <PrintEditionShowcase
            onOpenPdfReader={() => setIsPdfReaderOpen(true)}
            onOpenCMS={() => setIsCMSOpen(true)}
            pdfUrl={activePdfUrl}
            coverImage={activeIssue?.coverImage || '/october-2026-cover.png'}
            issueTitle={activeIssue?.issueLabel || 'OCTOBER 2026'}
            pageCount={activeIssue?.pageCount || 68}
            archivedIssues={archivedIssues}
            activeIssueId={activeIssue?.id}
            onSwitchIssue={handleSwitchIssue}
          />

          {/* 8. CURATED TOPIC DOSSIERS (Browse Social Issues, National, Medical, Education, Culture) */}
          <TopicDossierGrid
            articles={articles}
            onOpenArticle={handleOpenArticle}
            onSelectCategory={setActiveCategory}
          />

          {/* 9. DARK SPLIT FEATURE (The Founding Editorial Creed by Parvaiz Ahmad Reshi) */}
          <DarkSplitFeature onOpenManifesto={() => setIsMastheadOpen(true)} />

          {/* 10. HORIZONTAL ACCORDION TIMELINE (Complete 2026 Archive and Issue previews) */}
          <AccordionTimeline
            onOpenIssueReader={() => setIsPdfReaderOpen(true)}
            onOpenArchive={() => setIsDrawerOpen(true)}
            archivedIssues={archivedIssues}
            activeIssueId={activeIssue?.id}
            onSwitchIssue={handleSwitchIssue}
          />

          {/* 11. OPEN DIGITAL ACCESS & PDF SECTION (Read Free, Download PDF, Open CMS) */}
          <PublicPdfAccessSection
            onOpenPdfReader={() => setIsPdfReaderOpen(true)}
            onOpenCMS={() => setIsCMSOpen(true)}
            pdfUrl={activePdfUrl}
          />
        </div>

        {/* ─── SPECIALIZED LUXURY MOBILE EXPERIENCE (< MD) — COMPACT, ZERO DUPLICATES ─── */}
        <div className="block md:hidden">
          <MobileEditorialFeed
            articles={filteredArticles}
            onOpenArticle={handleOpenArticle}
            activeIssue={activeIssue}
            archivedIssues={archivedIssues}
            onSwitchIssue={handleSwitchIssue}
            onOpenPdfReader={() => setIsPdfReaderOpen(true)}
            onOpenCMS={() => setIsCMSOpen(true)}
            onOpenManifesto={() => setIsMastheadOpen(true)}
            pdfUrl={activePdfUrl}
          />
        </div>
      </main>

      {/* 12. DARK FOOTER (Channels, Newsletter Dispatch, Masthead, Public Archive) */}
      <FooterDark
        onOpenPdfReader={() => setIsPdfReaderOpen(true)}
        onOpenMasthead={() => setIsMastheadOpen(true)}
        onOpenLegal={(topic) => {
          alert(`The Legends Ink Editorial Protocol: ${topic.toUpperCase()} are maintained in accordance with the Press Council of India standards. ${MAGAZINE_DETAILS.courtJurisdiction}`);
        }}
      />

      {/* --- INTERACTIVE MODALS & PORTALS --- */}

      {/* Article Full Reader Modal */}
      {activeArticle && (
        <ArticleModal
          article={activeArticle}
          allArticles={articles}
          onClose={handleCloseArticle}
          onSelectArticle={handleOpenArticle}
        />
      )}

      {/* Master Digital PDF & Flipbook Reader Modal */}
      <MagazinePdfReaderModal
        isOpen={isPdfReaderOpen}
        onClose={() => setIsPdfReaderOpen(false)}
        pdfUrl={activePdfUrl}
        pdfTitle={activeIssue?.title || "The Legends Ink — October 2026 Issue"}
        pdfIssue={activeIssue?.issueLabel || "VOL. 01 • ISSUE 03 • OCTOBER 2026 • 68 PAGES"}
        coverImage={activeIssue?.coverImage || "/october-2026-cover.png"}
        onOpenUpload={() => {
          setIsPdfReaderOpen(false);
          setIsCMSOpen(true);
        }}
        onOpenArticle={handleOpenArticle}
      />

      {/* EDITORIAL CMS STUDIO (Upload PDF, Auto-Extract Headlines & Snippets, Manage Articles) */}
      <EditorialCMSModal
        isOpen={isCMSOpen}
        onClose={() => setIsCMSOpen(false)}
        articles={articles}
        onUpdateArticles={(updated: Article[]) => setArticles(updated)}
        onUpdatePdfIssue={handleCMSPublishIssue}
        currentPdfTitle={activeIssue?.title || "The Legends Ink — October 2026 Issue"}
        currentCoverImage={activeIssue?.coverImage || "/october-2026-cover.png"}
        archivedIssues={archivedIssues}
        activeIssueId={activeIssue?.id}
        onSwitchIssue={handleSwitchIssue}
        onRefreshArchive={refreshArchive}
      />

      {/* Official Masthead & Team Modal */}
      {isMastheadOpen && (
        <MastheadTeamModal
          onClose={() => setIsMastheadOpen(false)}
        />
      )}

      {/* Slide-over Menu & Search Drawer */}
      <SlideOverDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSelectCategory={setActiveCategory}
        onOpenArticle={handleOpenArticle}
        onOpenCMS={() => setIsCMSOpen(true)}
        onOpenFlipbook={() => setIsPdfReaderOpen(true)}
        onOpenMasthead={() => setIsMastheadOpen(true)}
        articles={articles}
        archivedIssues={archivedIssues}
        activeIssueId={activeIssue?.id}
        onSwitchIssue={handleSwitchIssue}
      />

    </div>
  );
}
