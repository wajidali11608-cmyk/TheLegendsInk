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
    <section className="w-full bg-[#FBF9F5] py-6 sm:py-10 md:py-16 border-b border-[rgba(15,16,18,0.12)]">
      <div className="max-w-[1920px] mx-auto px-3 sm:px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[rgba(15,16,18,0.12)] pb-4 sm:pb-6 mb-5 sm:mb-8 gap-3 sm:gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[9.5px] sm:text-[10px] font-sans tracking-[0.25em] text-[#C59E3F] uppercase font-bold mb-1 sm:mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59E3F]" />
              <span>VALLEY INVESTIGATIVE ARCHIVE</span>
            </div>
            <h2 className="font-headline font-black text-xl sm:text-2xl md:text-3xl uppercase tracking-tight text-[#0F1012]">
              CURATED INVESTIGATIONS BY TOPIC
            </h2>
          </div>

          {/* Topic Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
            {topics.map(topic => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className={`px-3 py-1 text-[11px] font-sans uppercase tracking-wider whitespace-nowrap rounded-[2px] transition-all duration-200 ${
                  activeTopic === topic
                    ? 'bg-[#0F1012] text-white font-bold shadow-xs'
                    : 'bg-white border border-[rgba(15,16,18,0.12)] text-[#0F1012]/70 hover:text-[#0F1012] hover:border-[#0F1012]'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6">
          {displayedArticles.map((article: Article) => (
            <div
              key={article.id}
              onClick={() => onOpenArticle(article.slug)}
              className="group cursor-pointer bg-white border border-[rgba(15,16,18,0.1)] p-3.5 sm:p-5 hover:border-[#C59E3F] hover:shadow-lg transition-all duration-200 flex flex-col justify-between rounded-[2px]"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0F1012] mb-3">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 filter brightness-[0.95]"
                  />
                  <div className="absolute top-2 left-2 bg-[#0F1012]/85 backdrop-blur-sm text-[#C59E3F] text-[8.5px] font-sans tracking-widest uppercase px-2 py-0.5 font-bold">
                    {article.category}
                  </div>
                </div>

                <div className="text-[9.5px] font-sans tracking-wider text-[#0F1012]/50 uppercase mb-1">
                  {article.date} • {article.readTime}
                </div>

                <h3 className="font-headline font-bold text-sm sm:text-base md:text-lg uppercase tracking-tight text-[#0F1012] group-hover:text-[#C59E3F] transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h3>

                <p className="mt-1 sm:mt-1.5 text-[11px] sm:text-xs font-sans text-[#0F1012]/70 line-clamp-2 leading-relaxed">
                  {article.subtitle}
                </p>
              </div>

              <div className="mt-3 sm:mt-5 pt-2.5 sm:pt-3 border-t border-[rgba(15,16,18,0.08)] flex items-center justify-between text-[11px] sm:text-xs font-sans">
                <span className="text-[#0F1012]/60 font-medium truncate max-w-[140px]">By {article.author}</span>
                <span className="inline-flex items-center space-x-1 text-[#0F1012] group-hover:text-[#C59E3F] transition-colors font-bold text-[10.5px] sm:text-xs flex-shrink-0">
                  <span>Read Dossier</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
