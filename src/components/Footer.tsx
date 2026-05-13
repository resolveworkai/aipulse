import { sources } from '@/data/mockArticles';

const Footer = () => {
  const track = [...sources, ...sources];

  return (
    <footer className="foot">
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {track.map((s, i) => <span key={i}>{s}</span>)}
        </div>
      </div>

      <div className="shell">
        <div className="foot-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div className="hdr-mark">P</div>
              <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>AI Pulse Today</div>
            </div>
            <p>The signal layer for artificial intelligence. Fifty curated stories, one screen, refreshed around the clock.</p>
            <p style={{ marginTop: 12, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>Dubai · UAE 🇦🇪</p>
          </div>

          <div>
            <h5>Daily AI Digest</h5>
            <p>The ten most important stories from the past 24 hours, delivered before your first coffee.</p>
            <form className="foot-newsletter" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="you@somewhere.com" />
              <button className="btn btn-primary" type="submit">Subscribe</button>
            </form>
            <p style={{ marginTop: 10, fontSize: 12, color: 'var(--ink-3)' }}>No spam. Unsubscribe in one click.</p>
          </div>

          <div>
            <h5>Connect</h5>
            <div style={{ display: 'flex', gap: 6 }}>
              <a className="icon-btn" href="#" aria-label="Twitter">
                <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 4h3l-7 9 8 11h-6l-5-7-6 7H2l8-9-8-11h6l4 6z"/>
                </svg>
              </a>
              <a className="icon-btn" href="#" aria-label="GitHub">
                <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 0 0-3 19.5c.5.1.7-.2.7-.5v-2c-3 .6-3.5-1.2-3.5-1.2-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.4-.3-4.9-1.2-4.9-5.3 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.8 0 0 .9-.3 3 1.1a10.4 10.4 0 0 1 5.4 0c2.1-1.4 3-1.1 3-1.1.6 1.4.2 2.5.1 2.8.7.8 1.1 1.7 1.1 2.9 0 4.1-2.5 5-4.9 5.3.4.3.7 1 .7 2v3c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/>
                </svg>
              </a>
              <a className="icon-btn" href="#" aria-label="RSS">
                <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1.5"/>
                </svg>
              </a>
            </div>
            <p style={{ marginTop: 14, fontSize: 12 }}>
              Content takedown:<br />
              <a href="mailto:dmca@aipulsetoday.com" style={{ color: 'var(--accent-ink)' }}>dmca@aipulsetoday.com</a>
            </p>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© 2026 AI Pulse Today · Crafted by Mohit Singh</span>
          <span style={{ display: 'flex', gap: 18 }}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Content policy</a>
            <a href="#">DMCA</a>
            <a href="#">Contact</a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
