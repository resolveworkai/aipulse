import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Header from '@/components/Header';
import FilterBar from '@/components/FilterBar';
import ArticleCardWrapper, { FeaturedCard } from '@/components/ArticleCard';
import HeroSide from '@/components/HeroSide';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import CommandPalette from '@/components/CommandPalette';
import HowToSection from '@/components/HowToSection';
import { mockArticles, sources } from '@/data/mockArticles';

const ITEMS_PER_PAGE = 8;

const Index = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('pulse-theme');
      if (stored === 'dark' || stored === 'light') return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFilter, setActiveFilter]     = useState('trending');
  const [shown, setShown]                   = useState(ITEMS_PER_PAGE);
  const [bookmarks, setBookmarks]           = useState<Set<string>>(() => new Set());
  const [searchOpen, setSearchOpen]         = useState(false);
  const [toast, setToast]                   = useState<{ msg: string; sub: string } | null>(null);
  const [showTop, setShowTop]               = useState(false);
  const [lastUpdated, setLastUpdated]       = useState(new Date());
  const isFirstRender = useRef(true);

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pulse-theme', theme);
  }, [theme]);

  // Back-to-top visibility
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setShowTop(h.scrollTop > h.clientHeight * 0.4);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cmd-K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Auto-refresh simulation
  useEffect(() => {
    const id = setInterval(() => {
      setLastUpdated(new Date());
      if (!isFirstRender.current) {
        setToast({ msg: 'Pulse refreshed', sub: '3 new stories added' });
      }
    }, 30 * 1000);
    isFirstRender.current = false;
    return () => clearInterval(id);
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(id);
  }, [toast]);

  // Reset pagination when filters change
  useEffect(() => { setShown(ITEMS_PER_PAGE); }, [activeCategory, activeFilter]);

  // Filter + sort
  const filteredArticles = useMemo(() => {
    let list = [...mockArticles];
    if (activeCategory !== 'all') {
      list = list.filter(a => a.category === activeCategory);
    }
    switch (activeFilter) {
      case 'latest':
        list.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
        break;
      case 'top':
        list.sort((a, b) => b.engagement.score - a.engagement.score);
        break;
      default:
        // trending — keep original rank order
        break;
    }
    return list.map((a, i) => ({ ...a, rank: i + 1 }));
  }, [activeCategory, activeFilter]);

  const visible  = filteredArticles.slice(0, shown);
  const hasMore  = shown < filteredArticles.length;
  const featured = visible[0];
  const rest     = visible.slice(1);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarks(prev => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  }, []);

  const updatedAgo = (() => {
    const diff = Math.floor((Date.now() - lastUpdated.getTime()) / 60000);
    if (diff < 1) return 'just now';
    if (diff === 1) return '1m ago';
    return `${diff}m ago`;
  })();

  const isMac = typeof navigator !== 'undefined' && /mac/i.test(navigator.platform);

  return (
    <>
      <ScrollProgress />
      <div className="bg-atmosphere" aria-hidden="true" />

      <Header
        theme={theme}
        onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        onOpenSearch={() => setSearchOpen(true)}
        updatedAgo={updatedAgo}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="shell">
          <div className="hero-grid">
            <div>
              <div className="hero-kicker fade-up">
                <span className="live-dot" />
                <span>LIVE · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase()}</span>
              </div>

              <h1 className="fade-up" style={{ animationDelay: '120ms' }}>
                The signal,<br /><em>distilled.</em>
              </h1>

              <p className="hero-sub fade-up" style={{ animationDelay: '200ms' }}>
                Fifty stories. One screen. Refreshed every thirty minutes, drawn from {sources.length}+ sources humans actually read.
              </p>

              <div
                className="hero-search fade-up"
                style={{ animationDelay: '280ms' }}
                onClick={() => setSearchOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setSearchOpen(true)}
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
                </svg>
                <input
                  readOnly
                  placeholder="Search 50 stories — try 'agents', 'robotics', 'open source'…"
                  onFocus={() => setSearchOpen(true)}
                />
                <span className="kbd">{isMac ? '⌘' : 'Ctrl'} K</span>
              </div>
            </div>

            <HeroSide articleCount={filteredArticles.length} sourceCount={sources.length} />
          </div>
        </div>
      </section>

      {/* ── Filters ──────────────────────────────────────────── */}
      <FilterBar
        activeCategory={activeCategory}
        activeFilter={activeFilter}
        onCategoryChange={setActiveCategory}
        onFilterChange={setActiveFilter}
      />

      {/* ── Feed ─────────────────────────────────────────────── */}
      <div className="shell">
        <div className="feed-header">
          <div className="feed-count">
            Showing <strong>{visible.length}</strong> of <strong>{filteredArticles.length}</strong> stories
          </div>
          <div className="feed-count">
            Last updated <strong>{lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
          </div>
        </div>

        {filteredArticles.length === 0 ? (
          <div style={{ padding: '64px 0', textAlign: 'center', color: 'var(--ink-3)' }}>
            <div className="kicker" style={{ marginBottom: 12 }}>NO MATCHES</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--ink)' }}>
              Nothing under this slice today.
            </div>
            <p style={{ marginTop: 8 }}>Try a wider category or clear the filters.</p>
          </div>
        ) : (
          <>
            {featured && (
              <FeaturedCard
                article={featured}
                bookmarked={bookmarks.has(featured.id)}
                onToggleBookmark={() => toggleBookmark(featured.id)}
              />
            )}

            <div className="feed-list">
              {rest.map((article, i) => (
                <ArticleCardWrapper
                  key={article.id}
                  article={article}
                  index={i + 1}
                  bookmarked={bookmarks.has(article.id)}
                  onToggleBookmark={() => toggleBookmark(article.id)}
                />
              ))}
            </div>

            {hasMore ? (
              <div className="loadmore">
                <button className="btn btn-outline" onClick={() => setShown(s => s + 6)}>
                  Load more stories
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
              </div>
            ) : (
              <div className="loadmore" style={{ flexDirection: 'column', gap: 8 }}>
                <span className="kicker">— END OF TODAY —</span>
                <span style={{ color: 'var(--ink-3)', fontSize: 13 }}>You're caught up. Next refresh in 30 minutes.</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Guides & Footer ──────────────────────────────────── */}
      <HowToSection />
      <Footer />

      {/* ── Overlays & floating elements ─────────────────────── */}
      <CommandPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        articles={mockArticles}
      />

      {toast && (
        <div className="pulse-toast">
          <span className="dot" />
          <div>
            <div style={{ fontWeight: 500 }}>{toast.msg}</div>
            <div style={{ opacity: 0.65, fontSize: 12 }}>{toast.sub}</div>
          </div>
        </div>
      )}

      <button
        className={`totop${showTop ? ' show' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 14 6-6 6 6"/>
        </svg>
      </button>
    </>
  );
};

export default Index;
