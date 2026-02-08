import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search articles, sources, tags..." }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(query);
    }, 200);

    return () => clearTimeout(debounceTimer);
  }, [query, onSearch]);

  const clearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        relative w-full max-w-2xl mx-auto transition-all duration-300
        ${isFocused ? 'scale-[1.02]' : 'scale-100'}
      `}
    >
      <div
        className={`
          relative flex items-center gap-3 px-4 py-3 rounded-2xl
          bg-muted/50 border transition-all duration-300
          ${isFocused 
            ? 'border-primary/50 shadow-glow bg-muted/70' 
            : 'border-border/50 hover:border-border'
          }
        `}
      >
        <Search className={`w-5 h-5 transition-colors ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} />
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
        />

        {query && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={clearSearch}
            className="p-1 rounded-lg bg-muted hover:bg-muted-foreground/20 transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        )}

        {/* Keyboard shortcut hint */}
        {!query && !isFocused && (
          <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono">⌘</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono">K</kbd>
          </div>
        )}
      </div>

      {/* Search suggestions when focused with query */}
      {isFocused && query && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 p-2 rounded-xl bg-card border border-border shadow-lg z-50"
        >
          <p className="text-xs text-muted-foreground px-2 py-1">
            Searching for "{query}" in titles, sources, and tags...
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchBar;
