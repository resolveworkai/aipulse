import { useState, useEffect, useRef, useMemo } from 'react';
import { Article } from '@/data/mockArticles';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  articles: Article[];
}

const suggestions = [
  { icon: 'flame',   title: 'Trending now',          sub: 'Top stories in the last hour',         kbd: 'T' },
  { icon: 'sparkle', title: 'Newest releases',        sub: 'Just-shipped models and tools',        kbd: 'N' },
  { icon: 'layers',  title: 'Research papers only',   sub: 'Filter to arXiv + lab pages',          kbd: 'R' },
  { icon: 'flow',    title: 'Agents & robotics',      sub: 'Embodied + tool-using systems',        kbd: 'A' },
];

const SearchIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14m-6-6 6 6-6 6"/>
  </svg>
);

const iconMap: Record<string, JSX.Element> = {
  flame: (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c1 3-2 5-2 8a4 4 0 0 0 8 0c0-2-2-4-2-4 0 3-2 4-2 4s2-5-2-8zM8 14a4 4 0 1 0 8 0"/>
    </svg>
  ),
  sparkle: (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6 8 8M16 16l2.4 2.4M5.6 18.4 8 16M16 8l2.4-2.4"/>
    </svg>
  ),
  layers: (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 2 10 6-10 6L2 8z"/><path d="m2 14 10 6 10-6"/>
    </svg>
  ),
  flow: (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/>
      <path d="M8 6h8M7 8l4 8M17 8l-4 8"/>
    </svg>
  ),
  arrow: <ArrowIcon />,
};

const CommandPalette = ({ open, onClose, articles }: CommandPaletteProps) => {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQ(''); setSel(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const matches = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return articles
      .filter(a =>
        (a.punchyTitle + ' ' + a.source + ' ' + a.tags.join(' ') + ' ' + a.punchySummary)
          .toLowerCase().includes(term)
      )
      .slice(0, 6);
  }, [q, articles]);

  const items = q.trim()
    ? matches.map(a => ({ icon: 'arrow', title: a.punchyTitle, sub: `${a.source} · ${a.timeAgo}` }))
    : suggestions;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(items.length - 1, s + 1)); }
      else if (e.key === 'ArrowUp')   { e.preventDefault(); setSel(s => Math.max(0, s - 1)); }
      else if (e.key === 'Enter')     { onClose(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, items.length, onClose]);

  if (!open) return null;

  return (
    <div className="cp-bd" onClick={onClose}>
      <div className="cp" onClick={e => e.stopPropagation()} role="dialog" aria-label="Search">
        <div className="cp-input">
          <SearchIcon />
          <input
            ref={inputRef}
            value={q}
            onChange={e => { setQ(e.target.value); setSel(0); }}
            placeholder="Search stories, sources, tags — or jump to a section…"
          />
          <span className="kbd">ESC</span>
        </div>

        <div className="cp-list">
          {!q.trim() && <div className="cp-group">Suggestions</div>}
          {q.trim() && matches.length > 0 && (
            <div className="cp-group">{matches.length} match{matches.length === 1 ? '' : 'es'}</div>
          )}
          {q.trim() && matches.length === 0 && (
            <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--ink-3)', fontSize: 13 }}>
              No matches for "{q}".
            </div>
          )}
          {items.map((it, i) => (
            <div
              key={i}
              className={`cp-item${i === sel ? ' active' : ''}`}
              onMouseEnter={() => setSel(i)}
              onClick={onClose}
            >
              <div className="ico">{iconMap[it.icon] ?? <ArrowIcon />}</div>
              <div className="body">
                <div className="ttl">{it.title}</div>
                <div className="sub">{it.sub}</div>
              </div>
              {'kbd' in it && it.kbd ? (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, padding: '2px 6px', borderRadius: 5, background: 'var(--bg-inset)', color: 'var(--ink-3)' }}>
                  {it.kbd as string}
                </span>
              ) : (
                <span style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>↵</span>
              )}
            </div>
          ))}
        </div>

        <div className="cp-foot">
          <span><span className="kbd">↑</span><span className="kbd">↓</span> navigate</span>
          <span><span className="kbd">↵</span> open</span>
          <span><span className="kbd">esc</span> close</span>
          <span style={{ marginLeft: 'auto' }}>AI Pulse Search</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
