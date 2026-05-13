import { useState } from 'react';
import { Article } from '@/data/mockArticles';

function fmtK(n: number): string {
  return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K' : String(n);
}

function Flags({ article }: { article: Article }) {
  return (
    <>
      {article.isNew      && <span className="flag flag-new">NEW</span>}
      {article.isHot      && <span className="flag flag-hot">HOT</span>}
      {article.isTrending && <span className="flag flag-trend">RISING</span>}
    </>
  );
}

const CategoryLabels: Record<string, string> = {
  ml: 'ML Core', nlp: 'Language', cv: 'Vision',
  robotics: 'Robotics', research: 'Research', industry: 'Industry',
};

/* ── Featured card (rank 1) ────────────────────────────────────────── */
export function FeaturedCard({ article, bookmarked, onToggleBookmark }: {
  article: Article;
  bookmarked: boolean;
  onToggleBookmark: () => void;
}) {
  const catLabel = CategoryLabels[article.category] ?? article.category;

  return (
    <article className="feat fade-up" style={{ animationDelay: '100ms' }}>
      <div>
        <div className="rank-mark gold" aria-hidden="true">
          01<span className="sm">RANK</span>
        </div>
      </div>

      <div>
        <div className="feat-meta">
          <span style={{ color: 'var(--ink-2)' }}>{article.source}</span>
          <span className="dot" />
          <span>{catLabel}</span>
          <span className="dot" />
          <span>{article.timeAgo}</span>
          <span className="dot" />
          <Flags article={article} />
        </div>

        <h2>{article.punchyTitle}</h2>
        <p className="feat-sum">{article.punchySummary}</p>

        <div className="feat-tags">
          {article.tags.map(t => <span className="tag" key={t}>#{t}</span>)}
        </div>

        <div className="feat-actions">
          <a className="btn btn-primary" href={article.originalUrl} target="_blank" rel="noopener noreferrer">
            Read original
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14m-6-6 6 6-6 6"/>
            </svg>
          </a>
          <button
            className={`icon-btn${bookmarked ? ' on' : ''}`}
            onClick={onToggleBookmark}
            aria-label="Bookmark"
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3h12v18l-6-4-6 4z"/>
            </svg>
          </button>
          <button className="icon-btn" aria-label="Share">
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/><path d="m16 6-4-4-4 4M12 2v14"/>
            </svg>
          </button>
          <span style={{ flex: 1 }} />
          <span className="metric">
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2c1 3-2 5-2 8a4 4 0 0 0 8 0c0-2-2-4-2-4 0 3-2 4-2 4s2-5-2-8zM8 14a4 4 0 1 0 8 0"/>
            </svg>
            <span className="v">{fmtK(article.engagement.score)}</span>
          </span>
          <span className="metric">
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a8 8 0 0 1-13 6L3 19l1-4a8 8 0 1 1 17-3z"/>
            </svg>
            <span className="v">{fmtK(article.engagement.comments)}</span>
          </span>
        </div>
      </div>

      <aside className="feat-side">
        <div className="insights-h">Key insights</div>
        <ul className="insights">
          {article.keyInsights.map((k, i) => <li key={i}>{k}</li>)}
        </ul>
        {article.powerQuote && (
          <div className="feat-quote">
            <div className="q">"{article.powerQuote.replace(/^"/, '').replace(/"[^"]*$/, '')}"</div>
            <div className="who">— {article.source}</div>
          </div>
        )}
      </aside>
    </article>
  );
}

/* ── Row card (rank 2+) ─────────────────────────────────────────────── */
function ArticleCard({ article, bookmarked, onToggleBookmark }: {
  article: Article;
  bookmarked: boolean;
  onToggleBookmark: () => void;
}) {
  const catLabel = CategoryLabels[article.category] ?? article.category;
  const rankStr = String(article.rank).padStart(2, '0');

  return (
    <article className="row">
      <div className="row-rank">{rankStr}</div>

      <div>
        <div className="row-meta">
          <span style={{ color: 'var(--ink-2)' }}>{article.source}</span>
          <span className="dot" />
          <span className="row-cat">{catLabel}</span>
          <span className="dot" />
          <span>{article.timeAgo}</span>
          <Flags article={article} />
        </div>
        <h3 className="row-title">{article.punchyTitle}</h3>
        <p className="row-sum">{article.punchySummary}</p>
        <div className="row-tags">
          {article.tags.slice(0, 4).map(t => <span className="tag" key={t}>#{t}</span>)}
        </div>
      </div>

      <div className="row-side">
        <span className="metric">
          <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2c1 3-2 5-2 8a4 4 0 0 0 8 0c0-2-2-4-2-4 0 3-2 4-2 4s2-5-2-8zM8 14a4 4 0 1 0 8 0"/>
          </svg>
          <span className="v">{fmtK(article.engagement.score)}</span>
        </span>
        <span className="metric">
          <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a8 8 0 0 1-13 6L3 19l1-4a8 8 0 1 1 17-3z"/>
          </svg>
          <span className="v">{fmtK(article.engagement.comments)}</span>
        </span>
        <div className="row-actions">
          <button
            className={`icon-btn${bookmarked ? ' on' : ''}`}
            onClick={onToggleBookmark}
            aria-label="Bookmark"
          >
            <svg width={15} height={15} viewBox="0 0 24 24" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3h12v18l-6-4-6 4z"/>
            </svg>
          </button>
          <button className="icon-btn" aria-label="Share">
            <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/><path d="m16 6-4-4-4 4M12 2v14"/>
            </svg>
          </button>
          <a className="icon-btn" href={article.originalUrl} target="_blank" rel="noopener noreferrer" aria-label="Open original">
            <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7L11 7"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7L13 17"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

/* ── Stateful wrapper that manages bookmark state internally ─────────── */
export default function ArticleCardWrapper({ article, index, bookmarked, onToggleBookmark }: {
  article: Article;
  index: number;
  bookmarked: boolean;
  onToggleBookmark: () => void;
}) {
  if (article.rank === 1 && index === 0) {
    return <FeaturedCard article={article} bookmarked={bookmarked} onToggleBookmark={onToggleBookmark} />;
  }
  return <ArticleCard article={article} bookmarked={bookmarked} onToggleBookmark={onToggleBookmark} />;
}
