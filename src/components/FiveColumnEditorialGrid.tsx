import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Article } from '../data/magazineContent';

interface FiveColumnEditorialGridProps {
  onOpenArticle: (slug: string) => void;
  articles?: Article[];
}

interface EditorialCard {
  number: string;
  slug: string;
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  author: string;
  category: string;
  readTime: string;
}

const DEFAULT_LEFT_CARDS: EditorialCard[] = [
  {
    number: "01",
    slug: 'drugs-in-kashmir-the-battle-is-far-from-over',
    image: '/magazine_images/magazine_photo_01.jpg',
    alt: 'Drugs in Kashmir Investigation',
    title: 'THE SILENT NARCOTICS EPIDEMIC',
    subtitle: 'Inside the synthetic opioid supply lines, rehabilitation deficits, and the battle for the youth.',
    author: 'RESHI JUNAID',
    category: 'SOCIAL ISSUES',
    readTime: '11 min',
  },
  {
    number: "02",
    slug: 'article-370-35a-what-did-jk-receive-what-was-paid',
    image: '/magazine_images/magazine_photo_08.jpg',
    alt: 'Article 370 and 35A Analysis',
    title: 'THE CONSTITUTIONAL BALANCE SHEET',
    subtitle: 'Seven years post-reorganization: factual audit of investments, statehood, and employment.',
    author: 'AIJAZ AHMAD',
    category: 'NATIONAL',
    readTime: '12 min',
  }
];

const DEFAULT_RIGHT_CARDS: EditorialCard[] = [
  {
    number: "03",
    slug: 'valley-healthcare-tertiary-care-deficits',
    image: '/magazine_images/magazine_photo_02.jpg',
    alt: 'Valley Healthcare at Crossroads',
    title: 'TERTIARY HEALTHCARE CRISIS',
    subtitle: 'Why rural patients travel 90 km to SKIMS for basic diagnostics, and the path to health equity.',
    author: 'NAHIDA NOOR',
    category: 'MEDICAL',
    readTime: '8 min',
  },
  {
    number: "04",
    slug: 'indu-kanwal-chib-public-service-with-purpose',
    image: '/magazine_images/magazine_photo_04.jpg',
    alt: 'Indu Kanwal Chib Public Administration',
    title: 'BUREAUCRACY WITH PURPOSE',
    subtitle: 'Field presence, rapid grievance resolution, and breaking red tape across district posts.',
    author: 'NAHIDA NOOR',
    category: 'INTERVIEWS',
    readTime: '6 min',
  }
];

const CardComponent: React.FC<{ card: EditorialCard; onOpenArticle: (slug: string) => void }> = ({ card, onOpenArticle }) => (
  <article 
    onClick={() => onOpenArticle(card.slug)}
    className="p-6 md:p-8 flex flex-col justify-between group cursor-pointer hover:bg-[#FAF8F3] transition-colors relative"
  >
    <div>
      <div className="flex items-center justify-between border-b border-[rgba(15,16,18,0.1)] pb-2 mb-4">
        <span className="font-mono text-xs font-bold text-[#C59E3F]">
          {card.number}
        </span>
        <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-[#0F1012]/60">
          {card.category} • {card.readTime}
        </span>
      </div>

      <div className="overflow-hidden aspect-[16/10] bg-[#0F1012] border border-[rgba(15,16,18,0.1)] relative mb-4">
        <img 
          src={card.image}
          alt={card.alt}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.95]"
        />
      </div>

      <h3 className="font-headline font-black uppercase text-lg md:text-xl tracking-tight text-[#0F1012] group-hover:text-[#C59E3F] transition-colors leading-tight">
        {card.title}
      </h3>
      <p className="mt-2 text-xs text-[#0F1012]/75 leading-relaxed font-sans line-clamp-2">
        {card.subtitle}
      </p>
    </div>

    <div className="mt-6 pt-3 border-t border-[rgba(15,16,18,0.1)] flex items-center justify-between">
      <span className="text-[10px] font-sans tracking-[0.18em] text-[#0F1012]/70 uppercase font-medium">
        BY {card.author}
      </span>
      <ArrowUpRight className="w-4 h-4 text-[#0F1012]/40 group-hover:text-[#C59E3F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
    </div>
  </article>
);

export const FiveColumnEditorialGrid: React.FC<FiveColumnEditorialGridProps> = ({ onOpenArticle, articles }) => {
  // If articles are supplied from CMS, dynamically map them
  const coverArticle = articles?.find(a => a.isCoverStory) || articles?.[0];

  const leftCards: EditorialCard[] = articles && articles.length >= 3 ? [
    {
      number: "01",
      slug: articles[1].slug,
      image: articles[1].image,
      alt: articles[1].title,
      title: articles[1].title,
      subtitle: articles[1].subtitle || articles[1].excerpt,
      author: articles[1].author,
      category: articles[1].category.toUpperCase(),
      readTime: articles[1].readTime,
    },
    {
      number: "02",
      slug: articles[2].slug,
      image: articles[2].image,
      alt: articles[2].title,
      title: articles[2].title,
      subtitle: articles[2].subtitle || articles[2].excerpt,
      author: articles[2].author,
      category: articles[2].category.toUpperCase(),
      readTime: articles[2].readTime,
    }
  ] : DEFAULT_LEFT_CARDS;

  const rightCards: EditorialCard[] = articles && articles.length >= 5 ? [
    {
      number: "03",
      slug: articles[3].slug,
      image: articles[3].image,
      alt: articles[3].title,
      title: articles[3].title,
      subtitle: articles[3].subtitle || articles[3].excerpt,
      author: articles[3].author,
      category: articles[3].category.toUpperCase(),
      readTime: articles[3].readTime,
    },
    {
      number: "04",
      slug: articles[4].slug,
      image: articles[4].image,
      alt: articles[4].title,
      title: articles[4].title,
      subtitle: articles[4].subtitle || articles[4].excerpt,
      author: articles[4].author,
      category: articles[4].category.toUpperCase(),
      readTime: articles[4].readTime,
    }
  ] : DEFAULT_RIGHT_CARDS;

  return (
    <section className="w-full bg-[#FBF9F5] border-b border-[rgba(15,16,18,0.12)]">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-10 md:py-16">
        
        {/* The 12-Column Swiss Grid: 3 cols Left, 6 cols Center Hero, 3 cols Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[rgba(15,16,18,0.12)] bg-[#FBF9F5]">
          
          {/* Left Column (span 3): 2 Stacked Cards */}
          <div className="lg:col-span-3 flex flex-col border-b lg:border-b-0 lg:border-r border-[rgba(15,16,18,0.12)] divide-y divide-[rgba(15,16,18,0.12)]">
            {leftCards.map((card) => (
              <CardComponent key={card.slug} card={card} onOpenArticle={onOpenArticle} />
            ))}
          </div>

          {/* Center Column (span 6): Featured Master Cover */}
          <div 
            onClick={() => onOpenArticle(coverArticle?.slug || 'young-achievers-of-kashmir-upsc-stars')}
            className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-[rgba(15,16,18,0.12)] relative group cursor-pointer overflow-hidden flex flex-col justify-between bg-[#0F1012] p-8 md:p-12 text-white"
          >
            {/* Cover Graphic from PDF */}
            <div className="relative aspect-[3/4] sm:aspect-[4/3] lg:aspect-[3/4] max-h-[560px] overflow-hidden border border-white/20 shadow-2xl mx-auto w-full">
              <img 
                src={coverArticle?.image || "/cover-young-achievers.png"} 
                alt="Magazine Cover Story"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1012]/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
            </div>

            {/* Bottom Caption Lockup */}
            <div className="mt-8 pt-6 border-t border-white/15">
              <div className="flex items-center space-x-2 text-[10px] font-sans tracking-[0.25em] text-[#C59E3F] uppercase font-bold mb-2">
                <span className="w-2 h-2 rounded-full bg-[#C59E3F]" />
                <span>PRIMARY COVER DOSSIER</span>
              </div>
              <h2 className="font-headline font-black uppercase text-2xl sm:text-3xl lg:text-4xl leading-tight">
                {coverArticle?.title || "YOUNG ACHIEVERS OF KASHMIR"}
              </h2>
              <p className="mt-2 text-xs sm:text-sm font-editorial italic text-white/80 leading-relaxed max-w-xl">
                {coverArticle?.subtitle || coverArticle?.excerpt || "Suvan Sharma (AIR 148), Sugandha Gupta (AIR 207), Towseef Ahmad Ganaie (AIR 254), Ritika Bhan (AIR 456) & The New Wave of Valley Aspirants."}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] font-sans tracking-widest text-[#C59E3F] uppercase font-bold">
                  BY {coverArticle?.author || "PARVAIZ AHMAD RESHI, EDITOR-IN-CHIEF"}
                </span>
                <span className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#C59E3F] transition-colors">
                  <span>Read Story</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (span 3): 2 Stacked Cards */}
          <div className="lg:col-span-3 flex flex-col divide-y divide-[rgba(15,16,18,0.12)]">
            {rightCards.map((card) => (
              <CardComponent key={card.slug} card={card} onOpenArticle={onOpenArticle} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
