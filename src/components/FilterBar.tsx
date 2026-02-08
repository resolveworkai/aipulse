import { motion } from 'framer-motion';
import { categories, filters } from '@/data/mockArticles';

interface FilterBarProps {
  activeCategory: string;
  activeFilter: string;
  onCategoryChange: (category: string) => void;
  onFilterChange: (filter: string) => void;
}

const FilterBar = ({ activeCategory, activeFilter, onCategoryChange, onFilterChange }: FilterBarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="sticky top-[73px] z-40 py-4 backdrop-blur-xl"
      style={{
        background: 'linear-gradient(to bottom, hsl(var(--background) / 0.95), hsl(var(--background) / 0.8))'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4">
          {/* Primary Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                  transition-all duration-300 border
                  ${activeFilter === filter.id
                    ? 'bg-primary text-primary-foreground border-primary shadow-glow'
                    : 'bg-muted/50 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{filter.icon}</span>
                <span>{filter.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap
                  transition-all duration-300 border
                  ${activeCategory === category.id
                    ? 'bg-secondary/20 text-secondary border-secondary/30'
                    : 'bg-transparent text-muted-foreground border-transparent hover:bg-muted/30 hover:text-foreground'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;
