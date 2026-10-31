import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ARTICLES, Article } from '../data/magazineContent';

interface TopicDossierGridProps {
  onOpenArticle: (slug: string) => void;
  onSelectCategory: (category: string) => void;
  articles?: Article[];
}

export const TopicDossierGrid: React.FC<TopicDossierGridProps> = ({
  onOpenArticle,
  onSelectCategory,
  articles,
}) => {
  const topics = [
    "All Topics",
    "Social Issues",
    "National",
    "International",
    "Medical",
    "Education",
    "Interviews",
    "Culture"
  ];

  const [activeTopic, setActiveTopic] = useState("All Topics");

  const handleTopicClick = (topic: string) => {
    setActiveTopic(topic);
    if (topic !== "All Topics") {
      onSelectCategory(topic);
    }
  };

  const pool = articles && articles.length > 0 ? articles : ARTICLES;

  const displayedArticles = activeTopic === "All Topics" 
    ? pool.slice(0, 6)
    : pool.filter(a => a.category.toLowerCase().includes(activeTopic.toLowerCase()) || a.tags.some(t => t.toLowerCase().includes(activeTopic.toLowerCase())));

  return (
    <section className="w-full bg-[#FAF9F5] py-8 sm:py-12 md:py-16 border-b border-[rgba(18,19,23,0.08)]">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12">
        
        {/* Section Heading with Swiss Cursive Touch */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[rgba(18,19,23,0.08)] pb-6 mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-sans tracking-[0.25em] text-[#8E7128] uppercase font-bold mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8E7128]" />
              <span>THE EDITORIAL REPOSITORY</span>
              <span className="font-cursive text-lg normal-case font-normal text-[#8E7128] ml-2">Selected Dispatches</span>
            </div>
            <h2 className="font-headline font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.06em] text-[#121317]">
              CURATED INVESTIGATIONS BY TOPIC
            </h2>
          </div>

          {/* Topic Pills - Swiss Minimalist Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
            {topics.map(topic => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className={`px-3.5 py-1.5 text-[11px] font-sans uppercase tracking-[0.16em] whitespace-nowrap transition-all duration-200 border ${
                  activeTopic === topic
                    ? 'bg-[#121317] border-[#121317] text-[#FAF9F5] font-semibold shadow-xs'
                    : 'bg-white/80 border-[rgba(18,19,23,0.1)] text-[#525560] hover:text-[#121317] hover:border-[#121317]'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Stories Bento Grid with Category Color Harmonies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {displayedArticles.map((article: Article, idx: number) => {
            const bentoColorClass = 
              article.category.toLowerCase().includes('social') ? 'bento-saffron' :
              article.category.toLowerCase().includes('national') || article.category.toLowerCase().includes('politics') ? 'bento-indigo' :
              article.category.toLowerCase().includes('medical') ? 'bento-sage' :
              article.category.toLowerCase().includes('culture') ? 'bento-terracotta' :
              idx % 2 === 0 ? 'bento-sand' : 'bento-saffron';

            return (
              <div
                key={article.id}
                onClick={() => onOpenArticle(article.slug)}
                className={`bento-card ${bentoColorClass} ${idx >= 4 ? 'hidden sm:flex' : 'flex'} group cursor-pointer p-4 sm:p-5 flex-col justify-between shadow-xs`}
              >
                <div>
                  <div className="relative aspect-[16/9] sm:aspect-[16/10] overflow-hidden bg-black/5 mb-3 sm:mb-4 rounded-xs">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#121317]/90 backdrop-blur-md text-amber-300 text-[9px] font-sans tracking-[0.2em] uppercase px-2.5 py-1 font-bold rounded-xs">
                      {article.category}
                    </div>
                  </div>

                  <div className="text-[9.5px] sm:text-[10px] font-sans tracking-widest text-[#73757C] uppercase mb-1 font-medium">
                    {article.date} &bull; {article.readTime}
                  </div>

                  <h3 className="font-headline font-bold text-base sm:text-lg uppercase tracking-tight text-[#121317] group-hover:text-amber-800 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="mt-1.5 sm:mt-2 font-cursive text-sm text-amber-950/85 line-clamp-2 leading-relaxed">
                    {article.subtitle}
                  </p>
                </div>

                <div className="mt-3.5 sm:mt-5 pt-2.5 sm:pt-3.5 border-t border-[#121317]/08 flex items-center justify-between text-xs font-sans">
                  <span className="text-[#73757C] font-medium truncate max-w-[140px] text-[11px]">By {article.author}</span>
                  <span className="inline-flex items-center space-x-1.5 text-[#121317] group-hover:text-amber-800 transition-colors font-bold text-[10.5px] sm:text-[11px] tracking-wider uppercase flex-shrink-0">
                    <span>Read</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-amber-700" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
