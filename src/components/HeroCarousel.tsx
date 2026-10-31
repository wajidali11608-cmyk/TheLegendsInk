import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { Article } from '../data/magazineContent';

interface HeroCarouselProps {
  articles: Article[];
  onOpenArticle: (slug: string) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ articles, onOpenArticle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Focus on top featured stories
  const slides = articles.filter(a => a.featured).slice(0, 4);

  useEffect(() => {
    if (isHovered || slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isHovered, slides.length]);

  if (slides.length === 0) return null;
  const current = slides[currentIndex];

  return (
    <section className="w-full bg-[#FBF9F5] border-b border-[rgba(15,16,18,0.12)] py-4 sm:py-8 md:py-14 px-3 sm:px-4 md:px-8">
      <div 
        className="max-w-[1920px] mx-auto select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Swiss Asymmetric 12-Column Editorial Bento Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-center bg-[#FAF6EE] border border-amber-900/15 p-4 sm:p-8 md:p-12 shadow-sm rounded-sm relative overflow-hidden">
          
          {/* Subtle warm backdrop glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column (span 6 cols): Pure Typographic Power */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4 sm:space-y-6 relative z-10">
            
            {/* Top Tag & Slide Counter */}
            <div className="flex items-center justify-between border-b border-amber-900/10 pb-3 sm:pb-4 text-xs font-sans tracking-[0.2em] uppercase text-amber-950/70">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-amber-600" />
                <span className="font-bold text-amber-900 bg-amber-100/90 px-2 sm:px-2.5 py-0.5 rounded-sm text-[10px] sm:text-[10.5px]">
                  {current.isCoverStory ? 'Featured Cover Investigation' : current.category}
                </span>
              </div>
              <div className="font-mono text-[11px] tracking-widest text-amber-950/60 font-semibold">
                <span className="text-amber-900 font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
                <span className="mx-1">/</span>
                <span>{String(slides.length).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Main Headline */}
            <div>
              <h2 
                onClick={() => onOpenArticle(current.slug)}
                className="font-headline font-black text-[#121317] uppercase tracking-[-0.01em] text-2xl sm:text-4xl lg:text-5xl leading-[1.08] hover:text-amber-800 transition-colors cursor-pointer"
              >
                {current.title}
              </h2>

              <p className="mt-2 sm:mt-3 font-cursive text-xl sm:text-3xl text-amber-900 font-medium leading-snug">
                {current.subtitle}
              </p>

              <p className="mt-2.5 sm:mt-3.5 text-xs sm:text-sm font-sans text-[#4A4C54] leading-relaxed line-clamp-2 md:line-clamp-3">
                {current.excerpt}
              </p>
            </div>

            {/* Author Byline & Action Row */}
            <div className="pt-4 sm:pt-6 border-t border-amber-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="text-[11px] sm:text-xs font-sans tracking-[0.15em] uppercase text-amber-950/75">
                <span className="font-bold text-[#121317]">BY {current.author}</span>
                <span className="mx-2 text-amber-600">•</span>
                <span>{current.readTime}</span>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <button
                  onClick={() => onOpenArticle(current.slug)}
                  className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 bg-[#121317] hover:bg-amber-800 text-[#FAF9F5] text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center space-x-2 group/btn shadow-xs cursor-pointer rounded-sm"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400 group-hover/btn:text-white transition-colors" />
                  <span>Read Investigation</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column (span 6 cols): Architectural Photographic Frame */}
          <div 
            onClick={() => onOpenArticle(current.slug)}
            className="lg:col-span-6 relative aspect-[16/9] sm:aspect-[16/10] overflow-hidden border border-amber-900/15 bg-amber-50/50 group/img cursor-pointer shadow-md rounded-sm"
          >
            <img 
              src={current.image || (current.isCoverStory ? "/cover-young-achievers.png" : "/magazine_images/magazine_photo_01.jpg")} 
              alt={current.title}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-105 filter brightness-[0.98] contrast-[1.02]"
            />
            {/* Subtle photographic vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#121317]/60 via-transparent to-transparent opacity-70 group-hover/img:opacity-50 transition-opacity" />

            {/* Corner Badge with Color Contrast */}
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between text-white text-[11px] sm:text-xs font-sans tracking-widest uppercase">
              <span className="bg-white/95 backdrop-blur-sm px-3 py-1 border border-amber-900/10 text-amber-900 font-bold shadow-xs rounded-sm">
                {current.category}
              </span>
              <span className="bg-[#121317]/90 backdrop-blur-sm px-2.5 sm:px-3 py-1 border border-white/20 text-white flex items-center space-x-1.5 font-medium rounded-sm">
                <span>Open Dossier</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
              </span>
            </div>
          </div>

        </div>

        {/* Carousel Bottom Pagination Bar */}
        <div className="mt-4 flex items-center justify-between px-2">
          {/* Progress Indicators */}
          <div className="flex items-center space-x-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to story ${i + 1}`}
                className="group py-2 focus:outline-none"
              >
                <div className={`h-[2px] transition-all duration-300 ${
                  i === currentIndex 
                    ? 'w-12 bg-[#0F1012]' 
                    : 'w-6 bg-[rgba(15,16,18,0.2)] group-hover:bg-[#C59E3F]'
                }`} />
              </button>
            ))}
          </div>

          {/* Prev / Next controls */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}
              aria-label="Previous story"
              className="w-10 h-10 border border-[rgba(15,16,18,0.15)] flex items-center justify-center hover:bg-[#0F1012] hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
              aria-label="Next story"
              className="w-10 h-10 border border-[rgba(15,16,18,0.15)] flex items-center justify-center hover:bg-[#0F1012] hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
