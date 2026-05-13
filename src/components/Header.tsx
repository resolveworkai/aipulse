import { useState, useEffect } from 'react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  updatedAgo?: string;
}

const Header = ({ theme, onToggleTheme, onOpenSearch, updatedAgo = '32m ago' }: HeaderProps) => {
  const [compact, setCompact] = useState(false);
  const isMac = typeof navigator !== 'undefined' && /mac/i.test(navigator.platform);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setCompact(window.scrollY > 80));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`hdr-wrap${compact ? ' compact' : ''}`}>
      <div className="shell">
        <div className="hdr fade-up" style={{ animationDelay: '60ms' }}>
          <div className="hdr-brand">
            <div className="hdr-mark" aria-hidden="true">P</div>
            <div style={{ minWidth: 0 }}>
              <div className="hdr-name">
                AI Pulse <span style={{ color: 'var(--ink-3)', fontWeight: 400 }}>· Today</span>
              </div>
            </div>
          </div>

          <div className="hdr-spacer" />

          <div className="hdr-live" title="Auto-refreshing every 30 minutes">
            <span className="live-dot" />
            <span>LIVE</span>
            <span style={{ color: 'var(--ink-3)' }}>· {updatedAgo}</span>
          </div>

          <button className="hdr-search-trigger" onClick={onOpenSearch} aria-label="Open search">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
            </svg>
            <span className="hdr-search-label">Search stories, sources, tags…</span>
            <kbd>{isMac ? '⌘' : 'Ctrl'} K</kbd>
          </button>

          <button className="hdr-icon-btn" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>
              </svg>
            ) : (
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
