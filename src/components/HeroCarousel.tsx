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
    <section className="w-full bg-[#FBF9F5] border-b border-[rgba(15,16,18,0.12)] py-8 md:py-14 px-4 md:px-8">
      <div 
        className="max-w-[1920px] mx-auto select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Swiss Asymmetric 12-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#FAF8F3] border border-[rgba(15,16,18,0.12)] p-6 md:p-12 shadow-sm">
          
          {/* Left Column (span 6 cols): Pure Typographic Power */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            {/* Top Tag & Slide Counter */}
            <div className="flex items-center justify-between border-b border-[rgba(15,16,18,0.12)] pb-4 text-xs font-sans tracking-[0.2em] uppercase text-[#0F1012]/70">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#C59E3F]" />
                <span className="font-bold text-[#0F1012]">{current.isCoverStory ? 'Featured Cover Investigation' : current.category}</span>
              </div>
              <div className="font-mono text-[11px] tracking-widest text-[#0F1012]/60">
                <span className="text-[#0F1012] font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
                <span className="mx-1">/</span>
                <span>{String(slides.length).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Main Headline */}
            <div>
              <h2 
                onClick={() => onOpenArticle(current.slug)}
                className="font-headline font-black text-[#0F1012] uppercase tracking-[-0.02em] text-3xl sm:text-4xl lg:text-5xl leading-[1.02] hover:text-[#C59E3F] transition-colors cursor-pointer drop-shadow-sm"
              >
                {current.title}
              </h2>

              <p className="mt-4 font-editorial italic text-lg sm:text-xl text-[#0F1012]/80 leading-snug">
                {current.subtitle}
              </p>

              <p className="mt-4 text-xs sm:text-sm font-sans text-[#0F1012]/70 leading-relaxed line-clamp-3">
                {current.excerpt}
              </p>
            </div>

            {/* Author Byline & Action Row */}
            <div className="pt-6 border-t border-[rgba(15,16,18,0.12)] flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-sans tracking-[0.15em] uppercase text-[#0F1012]/70">
                <span className="font-bold text-[#0F1012]">{current.author}</span>
                <span className="mx-2">•</span>
                <span>{current.readTime}</span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onOpenArticle(current.slug)}
                  className="px-6 py-3 bg-[#0F1012] hover:bg-[#C59E3F] text-[#FBF9F5] hover:text-[#0F1012] text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center space-x-2 group/btn shadow-md"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#C59E3F] group-hover/btn:text-[#0F1012] transition-colors" />
                  <span>Read Investigation</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column (span 6 cols): Architectural Photographic Frame */}
          <div 
            onClick={() => onOpenArticle(current.slug)}
            className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden border border-[rgba(15,16,18,0.15)] bg-[#0F1012] group/img cursor-pointer shadow-lg"
          >
            <img 
              src={current.image || (current.isCoverStory ? "/cover-young-achievers.png" : "/magazine_images/magazine_photo_01.jpg")} 
              alt={current.title}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-105 filter brightness-[0.92] contrast-[1.05]"
            />
            {/* Subtle photographic vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1012]/60 via-transparent to-transparent opacity-80 group-hover/img:opacity-60 transition-opacity" />

            {/* Corner Badge */}
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between text-white text-[11px] sm:text-xs font-sans tracking-widest uppercase">
              <span className="bg-[#0F1012]/85 backdrop-blur-sm px-2.5 sm:px-3 py-1 border border-white/20 text-[#C59E3F] font-bold">
                {current.category}
              </span>
              <span className="bg-[#0F1012]/85 backdrop-blur-sm px-2.5 sm:px-3 py-1 border border-white/20 text-white/90 flex items-center space-x-1.5 font-medium">
                <span>Open Dossier</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C59E3F]" />
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
