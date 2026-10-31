import React, { useState } from 'react';

interface SectionNavRowProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenSubscribe?: () => void;
  onOpenSearch?: () => void;
}

interface NavItem {
  index: string;
  label: string;
}

// 10 Curated Editorial Domains directly matching The Legends Ink publication archive
const NAV_ITEMS: NavItem[] = [
  { index: '01', label: 'Home' },
  { index: '02', label: 'Social Issues' },
  { index: '03', label: 'National' },
  { index: '04', label: 'International' },
  { index: '05', label: 'Medical' },
  { index: '06', label: 'Education' },
  { index: '07', label: 'Interviews' },
  { index: '08', label: 'Culture' },
  { index: '09', label: 'Politics' },
  { index: '10', label: 'Cover Story' },
];

export const SectionNavRow: React.FC<SectionNavRowProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <nav className="w-full bg-[#FAF8F5]/98 backdrop-blur-md border-y border-[#0E0F12]/[0.09] sticky top-12 md:top-[3.25rem] z-30 select-none shadow-[0_1px_6px_rgba(15,16,18,0.02)]">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8">
        <ul className="flex items-center justify-between overflow-x-auto no-scrollbar py-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeCategory === item.label;
            const isHovered = hoveredItem === item.label;

            return (
              <li key={item.label} className="relative flex-shrink-0">
                <button
                  onClick={() => onSelectCategory(item.label)}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  aria-label={`View ${item.label} dossier`}
                  className={`
                    group relative flex flex-col items-center justify-center
                    px-2.5 sm:px-3 md:px-3.5 lg:px-4 py-2 sm:py-2.5 rounded-[2px]
                    transition-all duration-300 ease-out focus:outline-none whitespace-nowrap
                    ${isActive
                      ? 'bg-amber-500/10 text-[#121317] font-bold'
                      : 'hover:bg-[#121317]/[0.035] text-[#121317]/65 hover:text-[#121317]'
                    }
                  `}
                >
                  {/* Micro Numerical Index (01, 02 ... 10) */}
                  <span
                    className={`
                      text-[8.5px] sm:text-[9px] font-mono tracking-widest leading-none mb-1
                      transition-all duration-300
                      ${isActive
                        ? 'text-amber-800 font-bold'
                        : isHovered
                          ? 'text-amber-700 font-semibold -translate-y-0.5'
                          : 'text-[#121317]/35'
                      }
                    `}
                  >
                    {item.index}
                  </span>

                  {/* Domain Label */}
                  <span
                    className={`
                      text-[10.5px] sm:text-[11px] md:text-[11.5px] font-sans tracking-[0.16em] uppercase
                      transition-all duration-300
                      ${isActive
                        ? 'font-bold text-[#121317]'
                        : 'font-semibold'
                      }
                      ${isHovered && !isActive ? '-translate-y-[1px]' : ''}
                    `}
                  >
                    {item.label}
                  </span>

                  {/* Animated Gold Bottom Underline Indicator */}
                  <span
                    className={`
                      absolute bottom-0 left-0 right-0 h-[2px]
                      transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                      ${isActive
                        ? 'w-full bg-amber-700'
                        : isHovered
                          ? 'w-full bg-amber-500/70 shadow-[0_0_8px_rgba(217,119,6,0.3)]'
                          : 'w-0 left-1/2 right-1/2 bg-amber-500'
                      }
                    `}
                  />

                  {/* Active State Gold Registration Dot */}
                  {isActive && (
                    <span className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-600" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
