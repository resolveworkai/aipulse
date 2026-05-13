import { useEffect, useRef, useState } from 'react';
import { categories, filters } from '@/data/mockArticles';

interface FilterBarProps {
  activeCategory: string;
  activeFilter: string;
  onCategoryChange: (category: string) => void;
  onFilterChange: (filter: string) => void;
}

const FilterBar = ({ activeCategory, activeFilter, onCategoryChange, onFilterChange }: FilterBarProps) => {
  const segRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState({ x: 0, w: 0 });

  useEffect(() => {
    if (!segRef.current) return;
    const el = segRef.current.querySelector(`button[data-id="${activeFilter}"]`) as HTMLElement;
    if (el) {
      const r = el.getBoundingClientRect();
      const p = segRef.current.getBoundingClientRect();
      setPill({ x: r.left - p.left, w: r.width });
    }
  }, [activeFilter]);

  const sortLabels: Record<string, string> = { trending: 'Trending', latest: 'Latest', top: 'Top' };
  const catLabels: Record<string, string> = {
    all: 'All', ml: 'ML Core', nlp: 'Language', cv: 'Vision',
    robotics: 'Robotics', research: 'Research', industry: 'Industry',
  };

  return (
    <div className="filter-wrap">
      <div className="shell filter-row">
        <div ref={segRef} className="seg" role="tablist">
          <div className="seg-pill" style={{ transform: `translateX(${pill.x - 3}px)`, width: pill.w }} />
          {filters.map(f => (
            <button
              key={f.id}
              data-id={f.id}
              className={activeFilter === f.id ? 'active' : ''}
              onClick={() => onFilterChange(f.id)}
              role="tab"
              aria-selected={activeFilter === f.id}
            >
              {sortLabels[f.id] ?? f.label}
            </button>
          ))}
        </div>

        <div className="chips" role="tablist" aria-label="Category">
          {categories.map(c => (
            <button
              key={c.id}
              className={`chip${activeCategory === c.id ? ' active' : ''}`}
              onClick={() => onCategoryChange(c.id)}
              aria-selected={activeCategory === c.id}
            >
              {catLabels[c.id] ?? c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
