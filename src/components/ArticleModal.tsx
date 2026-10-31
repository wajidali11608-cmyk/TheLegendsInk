import React, { useState, useEffect } from 'react';
import { X, Share2, Bookmark, Volume2, VolumeX, ArrowLeft, ArrowUpRight, Check, BookOpen } from 'lucide-react';
import { Article, ARTICLES } from '../data/magazineContent';

interface ArticleModalProps {
  article: Article | null;
  allArticles?: Article[];
  onClose: () => void;
  onSelectArticle: (slug: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  allArticles,
  onClose,
  onSelectArticle,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const { scrollTop, scrollHeight, clientHeight } = target;
      const total = scrollHeight - clientHeight;
      if (total > 0) {
        setScrollProgress((scrollTop / total) * 100);
      }
    };

    const container = document.getElementById('article-scroll-container');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [article]);

  if (!article) return null;

  const articleList = allArticles && allArticles.length > 0 ? allArticles : ARTICLES;
  const related = articleList.filter(a => a.id !== article.id).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 3000);
  };

  const getFontSizeClass = () => {
    if (fontSize === 'sm') return 'text-base leading-relaxed';
    if (fontSize === 'lg') return 'text-xl leading-loose';
    return 'text-lg leading-relaxed';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md overflow-hidden animate-in fade-in duration-300">
      <div 
        id="article-scroll-container"
        className={`relative w-full h-full overflow-y-auto transition-colors duration-500 ${
          isDarkTheme ? 'bg-[#0A0B0E] text-[#F7F5F0]' : 'bg-[#F7F5F0] text-ink'
        }`}
      >
        {/* Sticky Top Utility & Reading Progress Bar */}
        <div className={`sticky top-0 z-30 w-full border-b transition-colors ${
          isDarkTheme ? 'bg-[#0A0B0E]/95 border-white/10' : 'bg-[#F7F5F0]/95 border-ink/15'
        } backdrop-blur-md shadow-sm`}>
          
          {/* Hairline Reading Progress */}
          <div 
            className="h-[3px] bg-gradient-to-r from-accent-gold via-amber-400 to-accent-gold transition-all duration-150 ease-out shadow-[0_0_10px_rgba(197,158,63,0.5)]"
            style={{ width: `${scrollProgress}%` }}
          />

          <div className="max-w-5xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
            <button
              onClick={onClose}
              className="group flex items-center space-x-2 text-xs font-editorial-mono uppercase tracking-widest hover:text-accent-gold transition-colors focus:outline-none"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Cover</span>
            </button>

            {/* Reading Tools */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Audio Listen */}
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                title={isPlayingAudio ? "Pause Audio Summary" : "Listen to Article"}
                className={`flex items-center space-x-1.5 text-xs font-editorial-mono px-2 sm:px-3 py-1 border transition-all duration-300 ${
                  isPlayingAudio 
                    ? 'bg-accent-gold text-ink border-accent-gold font-bold shadow-md' 
                    : isDarkTheme ? 'border-white/20 hover:border-accent-gold hover:text-accent-gold' : 'border-ink/20 hover:border-accent-gold hover:text-accent-gold'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-ink animate-ping" />
                    <VolumeX className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Playing</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Listen</span>
                  </>
                )}
              </button>

              {/* Font Size Toggle (Desktop & Tablet) */}
              <div className="hidden sm:flex items-center space-x-1 text-xs font-editorial-mono border border-current/20 px-2 py-0.5">
                <button 
                  onClick={() => setFontSize('sm')}
                  className={`px-1 hover:text-accent-gold transition-colors ${fontSize === 'sm' ? 'font-black underline text-accent-gold' : ''}`}
                >
                  A-
                </button>
                <button 
                  onClick={() => setFontSize('md')}
                  className={`px-1 hover:text-accent-gold transition-colors ${fontSize === 'md' ? 'font-black underline text-accent-gold' : ''}`}
                >
                  A
                </button>
                <button 
                  onClick={() => setFontSize('lg')}
                  className={`px-1 hover:text-accent-gold transition-colors ${fontSize === 'lg' ? 'font-black underline text-accent-gold' : ''}`}
                >
                  A+
                </button>
              </div>

              {/* Dark / Light Paper Toggle */}
              <button
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                title="Toggle Reading Mode"
                className="text-[11px] sm:text-xs font-editorial-mono px-2 sm:px-2.5 py-1 border border-current/20 hover:border-accent-gold hover:text-accent-gold uppercase transition-colors"
              >
                {isDarkTheme ? 'Day' : 'Night'}
              </button>

              {/* Bookmark Save (Desktop & Tablet) */}
              <button
                onClick={() => setIsSaved(!isSaved)}
                title={isSaved ? "Article Saved" : "Save Article"}
                className="hidden sm:block p-1.5 hover:text-accent-gold transition-colors"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-accent-gold text-accent-gold' : ''}`} />
              </button>

              {/* Share */}
              <button
                onClick={handleShare}
                title="Share Article Link"
                className="p-1.5 hover:text-accent-gold transition-colors relative"
              >
                {copiedShare ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-1.5 border border-current/30 hover:bg-accent-gold hover:text-ink hover:border-accent-gold transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Article Body Container */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-12 md:py-20">
          
          {/* Metadata Header */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] font-editorial-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase text-accent-gold font-bold">
            <span className="bg-accent-gold/10 px-2 py-0.5 border border-accent-gold/20">{article.category}</span>
            <span>•</span>
            <span>{article.readTime}</span>
            <span>•</span>
            <span className="text-current/60">{article.date}</span>
          </div>

          {/* Headline */}
          <h1 className="mt-4 sm:mt-6 font-headline font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] uppercase">
            {article.title}
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-lg md:text-xl font-editorial-mono italic text-current/80 leading-snug">
            {article.subtitle}
          </p>

          {/* Author Byline Lockup */}
          <div className="mt-6 pt-4 border-t border-current/15 flex items-center justify-between text-xs font-editorial-mono uppercase tracking-wider text-current/70">
            <div>
              <span className="font-bold text-accent-gold">{article.author}</span>
              <span className="mx-2">•</span>
              <span>{article.authorRole}</span>
            </div>
            <div className="hidden sm:flex items-center space-x-1.5 text-accent-gold/90 font-bold">
              <span>VOL. 01 • ISSUE 03</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-8 border border-current/15 overflow-hidden shadow-2xl relative group">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full max-h-[580px] object-cover transition-transform duration-700 group-hover:scale-102"
            />
            {article.caption && (
              <div className="p-3 bg-current/5 border-t border-current/15 text-[11px] font-editorial-mono italic text-current/75">
                {article.caption}
              </div>
            )}
          </div>

          {/* Pull Quote */}
          {article.pullQuote && (
            <blockquote className="my-10 p-6 md:p-8 border-l-4 border-accent-gold bg-accent-gold/5 font-editorial-serif italic text-xl md:text-2xl leading-relaxed text-current shadow-sm">
              "{article.pullQuote}"
            </blockquote>
          )}

          {/* Article Paragraphs with Drop Cap */}
          <div className={`mt-8 space-y-6 ${getFontSizeClass()} font-editorial-serif`}>
            {article.content.map((para, i) => (
              <p 
                key={i} 
                className={i === 0 ? "drop-cap font-normal" : "font-normal leading-relaxed"}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-6 border-t border-current/15 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 text-[11px] font-editorial-mono tracking-wider uppercase border border-current/20 bg-current/5 hover:border-accent-gold hover:text-accent-gold transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Editorial Mandate Box */}
          <div className="mt-12 p-6 md:p-8 border border-accent-gold/40 bg-accent-gold/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
            <div>
              <div className="flex items-center space-x-2 text-accent-gold text-xs font-bold tracking-widest font-editorial-mono uppercase">
                <span>THE LEGENDS INK EDITORIAL MANDATE</span>
              </div>
              <p className="mt-2 text-xs font-editorial-mono italic text-current/80 leading-relaxed max-w-xl">
                Independent journalism from Jammu & Kashmir. Published from Bandipora and printed in Srinagar. Questions institutions without hostility and celebrates achievers without flattery.
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-accent-gold hover:bg-amber-500 text-ink text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:shadow-lg whitespace-nowrap"
            >
              Back to Cover
            </button>
          </div>

          {/* Related Stories */}
          <div className="mt-16 pt-10 border-t border-current/20">
            <h3 className="font-headline font-black text-xs uppercase tracking-[0.25em] text-accent-gold mb-6 flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>MORE FROM OCTOBER 2026 ISSUE</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <div 
                  key={rel.id}
                  onClick={() => onSelectArticle(rel.slug)}
                  className="group cursor-pointer border border-current/15 p-4 hover:border-accent-gold/60 hover:bg-accent-gold/5 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="overflow-hidden mb-3">
                    <img 
                      src={rel.image} 
                      alt={rel.title} 
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="block text-[10px] font-editorial-mono uppercase tracking-widest text-accent-gold font-bold">
                    {rel.category}
                  </span>
                  <h4 className="mt-1 font-headline font-bold text-sm uppercase leading-tight line-clamp-2 group-hover:text-accent-gold transition-colors">
                    {rel.title}
                  </h4>
                  <div className="mt-3 flex items-center justify-between text-[10px] font-editorial-mono text-current/60 pt-2 border-t border-current/10">
                    <span>{rel.readTime}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-accent-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </article>
      </div>
    </div>
  );
};
