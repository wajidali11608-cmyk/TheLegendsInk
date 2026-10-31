import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Article } from '../data/magazineContent';

interface FiveColumnEditorialGridProps {
  onOpenArticle: (slug: string) => void;
  articles?: Article[];
}

export const FiveColumnEditorialGrid: React.FC<FiveColumnEditorialGridProps> = ({ onOpenArticle, articles = [] }) => {
  const coverStory = articles.find((a) => a.isCoverStory) || articles[0];
  const otherStories = articles.filter((a) => a.id !== coverStory?.id);

  const card1 = otherStories[0];
  const card2 = otherStories[1];
  const card3 = otherStories[2];
  const card4 = otherStories[3];

  return (
    <section className="w-full bg-[#FAF9F5] border-b border-[#121317]/08 py-6 sm:py-12 md:py-20 select-none">
      <div className="max-w-[1920px] mx-auto px-3 sm:px-6 md:px-12">

        {/* Section Header with Swiss Precision & Luxury Cursive Accent */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#121317]/10 pb-3 sm:pb-5 mb-5 md:mb-12">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.28em] uppercase text-[#8F702D] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span>THE EDITORIAL DOSSIERS</span>
            </div>
            <h2 className="font-luxury font-black text-xl sm:text-3xl md:text-4xl text-[#121317] tracking-[0.06em] uppercase mt-1">
              INVESTIGATIVE BENTO MATRIX
            </h2>
          </div>
          <p className="font-cursive text-xl sm:text-3xl text-[#8F702D] mt-1 md:mt-0 tracking-wide">
            Independent inquiries from the ground across Jammu & Kashmir
          </p>
        </div>

        {/* ─── SWISS CREATIVE BENTO GRID CONTAINER ─── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">

          {/* ━━━ BENTO 01: Hero Master Cover (Col-span 7, Row-span 2) - Warm Kashmir Saffron ━━━ */}
          {coverStory && (
            <article
              onClick={() => onOpenArticle(coverStory.slug)}
              className="md:col-span-7 md:row-span-2 bento-card bento-saffron p-4 sm:p-8 md:p-10 flex flex-col justify-between group cursor-pointer overflow-hidden relative shadow-sm"
            >
              {/* Top Meta Line with Curated Color Accents */}
              <div>
                <div className="flex items-center justify-between border-b border-amber-900/10 pb-3 sm:pb-4 mb-4 sm:mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-amber-800 tracking-widest bg-amber-100/90 px-2 sm:px-2.5 py-0.5 rounded-sm">
                      DOSSIER 01
                    </span>
                    <span className="text-amber-900/25">•</span>
                    <span className="text-[10px] font-sans uppercase font-bold tracking-[0.2em] text-amber-900/70">
                      {coverStory.category}
                    </span>
                  </div>
                  <span className="font-cursive text-lg sm:text-xl md:text-2xl text-amber-800 font-medium">
                    Cover Investigation
                  </span>
                </div>

                {/* Cover Image Frame with Luxury Ratio & Zoom Hover */}
                <div className="aspect-[16/9] sm:aspect-[16/9] overflow-hidden bg-amber-50/50 border border-amber-900/10 relative mb-4 sm:mb-6 rounded-sm">
                  <img
                    src={coverStory.image || '/cover-young-achievers.png'}
                    alt={coverStory.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2.5 sm:px-3 py-1 bg-white/95 backdrop-blur-md border border-amber-900/10 text-[9px] sm:text-[9.5px] font-mono tracking-widest uppercase text-amber-900 font-bold shadow-xs">
                    PRIMARY DISPATCH &bull; KASHMIR
                  </div>
                </div>

                {/* Typography Block with Legible Luxury Cursive */}
                <h3 className="font-headline font-black text-xl sm:text-3xl md:text-4xl text-[#121317] tracking-tight group-hover:text-amber-800 transition-colors leading-[1.1]">
                  {coverStory.title}
                </h3>

                <p className="font-cursive text-lg sm:text-2xl text-amber-900/90 mt-2 sm:mt-3 leading-snug">
                  {coverStory.subtitle}
                </p>

                <p className="text-xs sm:text-sm font-sans text-[#4A4C54] mt-2 sm:mt-3.5 leading-relaxed line-clamp-2 md:line-clamp-3">
                  {coverStory.excerpt}
                </p>
              </div>

              {/* Bottom Byline and Interactive Button */}
              <div className="mt-4 sm:mt-8 pt-3 sm:pt-4 border-t border-amber-900/10 flex items-center justify-between">
                <div className="text-[10.5px] sm:text-[11px] font-sans tracking-wider uppercase text-amber-950/80">
                  <span className="font-bold text-[#121317]">BY {coverStory.author}</span>
                  <span className="mx-1.5 sm:mx-2 text-amber-600">•</span>
                  <span>{coverStory.readTime}</span>
                </div>

                <div className="inline-flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-800 text-white group-hover:bg-[#121317] transition-all duration-300 text-[10px] sm:text-[10.5px] font-bold uppercase tracking-widest rounded-sm shadow-xs">
                  <span>Read Dossier</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </article>
          )}

          {/* ━━━ BENTO 02: Secondary High-Impact Investigation (Col-span 5) - Chinar Alpine Sage ━━━ */}
          {card1 && (
            <article
              onClick={() => onOpenArticle(card1.slug)}
              className="md:col-span-5 bento-card bento-sage p-4 sm:p-7 flex flex-col justify-between group cursor-pointer overflow-hidden shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between border-b border-emerald-900/10 pb-2.5 sm:pb-3 mb-3 sm:mb-4">
                  <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100/90 px-2 sm:px-2.5 py-0.5 rounded-sm">
                    DOSSIER 02
                  </span>
                  <span className="text-[10px] font-sans uppercase font-bold tracking-[0.2em] text-emerald-900/70">
                    {card1.category} • {card1.readTime}
                  </span>
                </div>

                <div className="aspect-[16/9] overflow-hidden bg-emerald-50/50 border border-emerald-900/10 mb-3 sm:mb-4 rounded-sm">
                  <img
                    src={card1.image}
                    alt={card1.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <h3 className="font-headline font-black text-lg sm:text-2xl text-[#121317] group-hover:text-emerald-800 transition-colors leading-snug">
                  {card1.title}
                </h3>

                <p className="font-cursive text-base sm:text-lg text-emerald-900/90 mt-1.5 sm:mt-2 line-clamp-2 leading-snug">
                  {card1.subtitle}
                </p>
              </div>

              <div className="mt-3.5 sm:mt-5 pt-3 sm:pt-3.5 border-t border-emerald-900/10 flex items-center justify-between text-[10.5px] sm:text-[11px] font-sans tracking-wider uppercase text-emerald-950/80">
                <span className="font-semibold">BY {card1.author}</span>
                <span className="inline-flex items-center space-x-1 text-emerald-800 font-bold group-hover:translate-x-0.5 transition-transform">
                  <span>Explore</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          )}

          {/* ━━━ BENTO 03: Editorial Creed & Calligraphic Quote Tile (Col-span 5) - Hidden on mobile to avoid endless scroll ━━━ */}
          <div className="hidden md:flex md:col-span-5 bento-card bento-sand p-6 sm:p-8 flex-col justify-between relative overflow-hidden shadow-sm">
            {/* Subtle background crest seal */}
            <img
              src="/tli-seal-badge.png"
              alt=""
              className="absolute -right-6 -bottom-6 w-36 h-36 opacity-10 pointer-events-none select-none object-contain"
            />

            <div>
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.25em] text-amber-800 uppercase font-bold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                <span>EDITORIAL ETHOS &bull; JOURNAL OF RECORD</span>
              </div>

              <p className="font-cursive text-2xl sm:text-3xl text-[#121317] leading-relaxed my-2 font-medium">
                "Where power meets scrutiny, and forgotten voices find their rightful record."
              </p>

              <p className="text-xs font-sans text-[#4A4C54] leading-relaxed mt-2.5">
                Every dispatch in The Legends Ink undergoes meticulous ground-verification in the districts of Bandipora, Srinagar, Pulwama, and Baramulla.
              </p>
            </div>

            <div className="mt-6 pt-3.5 border-t border-amber-900/10 flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-amber-800 font-bold">
              <span>FOUNDING CREED</span>
              <span>EST. 2026 &bull; VALLEY ARCHIVE</span>
            </div>
          </div>

          {/* ━━━ BENTO 04: Tertiary Dossier (Col-span 4) - Kashmir Indigo ━━━ */}
          {card2 && (
            <article
              onClick={() => onOpenArticle(card2.slug)}
              className="md:col-span-4 bento-card bento-indigo p-4 sm:p-6 flex flex-col justify-between group cursor-pointer overflow-hidden shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between border-b border-sky-900/10 pb-2 sm:pb-2.5 mb-2.5 sm:mb-3.5">
                  <span className="font-mono text-xs font-bold text-sky-800 bg-sky-100/90 px-2 py-0.5 rounded-sm">
                    DOSSIER 03
                  </span>
                  <span className="text-[10px] font-sans uppercase tracking-wider text-sky-900/70 font-bold">
                    {card2.category}
                  </span>
                </div>

                <div className="aspect-[16/9] overflow-hidden bg-sky-50/50 border border-sky-900/10 mb-2.5 sm:mb-3.5 rounded-sm">
                  <img
                    src={card2.image}
                    alt={card2.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <h4 className="font-headline font-bold text-base sm:text-lg text-[#121317] group-hover:text-sky-800 transition-colors leading-tight line-clamp-2">
                  {card2.title}
                </h4>

                <p className="font-cursive text-sm text-sky-900/85 mt-1 sm:mt-2 line-clamp-2">
                  {card2.subtitle || card2.excerpt}
                </p>
              </div>

              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-sky-900/10 flex items-center justify-between text-[10.5px] font-sans uppercase text-sky-950/70 font-semibold">
                <span>{card2.readTime}</span>
                <span className="inline-flex items-center space-x-1 text-sky-800 font-bold group-hover:translate-x-0.5 transition-transform">
                  <span>Read</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          )}

          {/* ━━━ BENTO 05: Quaternary Dossier (Col-span 4) - Terracotta Clay ━━━ */}
          {card3 && (
            <article
              onClick={() => onOpenArticle(card3.slug)}
              className="md:col-span-4 bento-card bento-terracotta p-4 sm:p-6 flex flex-col justify-between group cursor-pointer overflow-hidden shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between border-b border-orange-900/10 pb-2 sm:pb-2.5 mb-2.5 sm:mb-3.5">
                  <span className="font-mono text-xs font-bold text-orange-800 bg-orange-100/90 px-2 py-0.5 rounded-sm">
                    DOSSIER 04
                  </span>
                  <span className="text-[10px] font-sans uppercase tracking-wider text-orange-900/70 font-bold">
                    {card3.category}
                  </span>
                </div>

                <div className="aspect-[16/9] overflow-hidden bg-orange-50/50 border border-orange-900/10 mb-2.5 sm:mb-3.5 rounded-sm">
                  <img
                    src={card3.image}
                    alt={card3.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <h4 className="font-headline font-bold text-base sm:text-lg text-[#121317] group-hover:text-orange-800 transition-colors leading-tight line-clamp-2">
                  {card3.title}
                </h4>

                <p className="font-cursive text-sm text-orange-900/85 mt-1 sm:mt-2 line-clamp-2">
                  {card3.subtitle || card3.excerpt}
                </p>
              </div>

              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-orange-900/10 flex items-center justify-between text-[10.5px] font-sans uppercase text-orange-950/70 font-semibold">
                <span>{card3.readTime}</span>
                <span className="inline-flex items-center space-x-1 text-orange-800 font-bold group-hover:translate-x-0.5 transition-transform">
                  <span>Read</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          )}

          {/* ━━━ BENTO 06: Quintessential Archive Dispatch (Col-span 4) - Amber Saffron ━━━ */}
          {card4 && (
            <article
              onClick={() => onOpenArticle(card4.slug)}
              className="md:col-span-4 bento-card bento-saffron p-4 sm:p-6 flex flex-col justify-between group cursor-pointer overflow-hidden shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between border-b border-amber-900/10 pb-2 sm:pb-2.5 mb-2.5 sm:mb-3.5">
                  <span className="font-mono text-xs font-bold text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-sm">
                    DOSSIER 05
                  </span>
                  <span className="text-[10px] font-sans uppercase tracking-wider text-amber-900/70 font-bold">
                    {card4.category}
                  </span>
                </div>

                <div className="aspect-[16/9] overflow-hidden bg-amber-50/50 border border-amber-900/10 mb-2.5 sm:mb-3.5 rounded-sm">
                  <img
                    src={card4.image}
                    alt={card4.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <h4 className="font-headline font-bold text-base sm:text-lg text-[#121317] group-hover:text-amber-800 transition-colors leading-tight line-clamp-2">
                  {card4.title}
                </h4>

                <p className="font-cursive text-sm text-amber-900/85 mt-1 sm:mt-2 line-clamp-2">
                  {card4.subtitle || card4.excerpt}
                </p>
              </div>

              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-amber-900/10 flex items-center justify-between text-[10.5px] font-sans uppercase text-amber-950/70 font-semibold">
                <span>{card4.readTime}</span>
                <span className="inline-flex items-center space-x-1 text-amber-800 font-bold group-hover:translate-x-0.5 transition-transform">
                  <span>Read</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          )}

        </div>

      </div>
    </section>
  );
};

