import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import FilterBar from '@/components/FilterBar';
import ArticleCard from '@/components/ArticleCard';
import HeroStats from '@/components/HeroStats';
import Footer from '@/components/Footer';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import BackToTop from '@/components/BackToTop';
import ScrollProgress from '@/components/ScrollProgress';
import SearchBar from '@/components/SearchBar';
import InfiniteScrollTrigger from '@/components/InfiniteScrollTrigger';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { mockArticles, sources } from '@/data/mockArticles';

const Index = () => {
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFilter, setActiveFilter] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');

  // Apply dark/light theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-refresh simulation (30 minutes in production, 30 seconds for demo)
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        searchInput?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter and search articles
  const filteredArticles = useMemo(() => {
    let articles = [...mockArticles];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      articles = articles.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.punchyTitle.toLowerCase().includes(query) ||
        article.source.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query)) ||
        article.punchySummary.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (activeCategory !== 'all') {
      articles = articles.filter(article => article.category === activeCategory);
    }

    // Sort by filter
    switch (activeFilter) {
      case 'latest':
        articles.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
        break;
      case 'top':
        articles.sort((a, b) => b.engagement.score - a.engagement.score);
        break;
      case 'trending':
      default:
        // Already sorted by rank in mock data
        break;
    }

    // Update ranks based on current sort
    return articles.map((article, index) => ({
      ...article,
      rank: index + 1
    }));
  }, [activeCategory, activeFilter, searchQuery]);

  // Infinite scroll
  const {
    displayedArticles,
    loadMore,
    hasMore,
    isLoadingMore,
    totalCount,
    displayedCount
  } = useInfiniteScroll({ articles: filteredArticles, itemsPerPage: 10 });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollProgress />
      
      <Header
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        lastUpdated={lastUpdated}
      />

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-glow opacity-50" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-primary">Live • Auto-updating every 30 minutes</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="gradient-text">Top 50 AI & ML News</span>
              <br />
              <span className="text-foreground">Updated in Real-Time</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Your real-time window to AI innovation. We curate the most impactful stories from 50+ trusted sources so you never miss a breakthrough.
            </p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-muted-foreground mb-8"
            >
              Crafted with ❤️ by <span className="font-semibold text-foreground">Mohit Singh</span> in Dubai, UAE 🇦🇪
            </motion.p>

            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <HeroStats articleCount={totalCount} sourceCount={sources.length} />

      {/* Filter Bar */}
      <FilterBar
        activeCategory={activeCategory}
        activeFilter={activeFilter}
        onCategoryChange={setActiveCategory}
        onFilterChange={setActiveFilter}
      />

      {/* Articles Grid */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 flex items-center justify-between"
        >
          <p className="text-sm text-muted-foreground">
            {searchQuery ? (
              <>
                Found <span className="font-semibold text-foreground">{totalCount}</span> results for "{searchQuery}"
              </>
            ) : (
              <>
                Showing <span className="font-semibold text-foreground">{displayedCount}</span> of{' '}
                <span className="font-semibold text-foreground">{totalCount}</span> trending stories
              </>
            )}
          </p>
          <p className="text-xs text-muted-foreground mono hidden sm:block">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </motion.div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <AnimatePresence mode="popLayout">
              {displayedArticles.length > 0 ? (
                <div className="space-y-6">
                  {displayedArticles.map((article, index) => (
                    <ArticleCard key={article.id} article={article} index={index} />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <p className="text-2xl mb-2">🔍</p>
                  <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Infinite Scroll Trigger */}
            <InfiniteScrollTrigger
              onLoadMore={loadMore}
              hasMore={hasMore}
              isLoading={isLoadingMore}
              displayedCount={displayedCount}
              totalCount={totalCount}
            />
          </>
        )}
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
