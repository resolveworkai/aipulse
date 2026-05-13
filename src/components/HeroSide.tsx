interface HeroSideProps {
  articleCount: number;
  sourceCount: number;
}

function Sparkline({ points = [4,5,6,8,7,9,11,10,12,14,13,16,18,17,20] }: { points?: number[] }) {
  const w = 240, h = 56;
  const max = Math.max(...points), min = Math.min(...points);
  const step = w / (points.length - 1);
  const norm = (v: number) => h - ((v - min) / (max - min || 1)) * (h - 6) - 3;
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${i * step} ${norm(p)}`).join(' ');
  const area = `${d} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg className="sparkline" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="sl-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#sl-fill)" />
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const HeroSide = ({ articleCount, sourceCount }: HeroSideProps) => {
  const rows = [
    { lbl: 'Top stories tracked', val: String(articleCount), delta: '+3' },
    { lbl: 'Sources monitored', val: String(sourceCount), delta: '+4' },
    { lbl: 'Refresh cadence', val: '30 min' },
    { lbl: 'Coverage', val: '24 / 7' },
  ];

  return (
    <div className="hero-side fade-up" style={{ animationDelay: '320ms' }}>
      <div className="hero-side-card">
        <h4>Pulse · last 24h</h4>
        <Sparkline />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', margin: '4px 0 12px' }}>
          <span>00:00</span><span>now</span>
        </div>
        {rows.map((r, i) => (
          <div className="hero-side-row" key={i}>
            <span className="lbl">{r.lbl}</span>
            <span className="val">
              {r.val}
              {r.delta && <span className="delta">↑ {r.delta}</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSide;
