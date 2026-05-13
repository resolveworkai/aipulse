import { howToGuides } from '@/data/howToGuides';

const HowToSection = () => {
  const guides = howToGuides.map(g => ({
    name: g.name,
    glyph: g.name.slice(0, 2).toLowerCase(),
    difficulty: g.difficulty.charAt(0).toUpperCase() + g.difficulty.slice(1),
    time: g.timeToComplete,
    blurb: g.description,
    tags: g.tags.slice(0, 3),
  }));

  return (
    <section>
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="kicker">SETUP GUIDES</span>
            <h2>Run intelligence, locally.</h2>
          </div>
          <p>Step-by-step setups for the tools we use ourselves — open-weight LLMs, image models, and agents you control end-to-end.</p>
        </div>
      </div>

      <div className="shell">
        <div className="guides">
          {guides.map((g, i) => {
            const diffClass = g.difficulty === 'Beginner' ? 'diff-beg' : g.difficulty === 'Intermediate' ? 'diff-int' : 'diff-adv';
            return (
              <div className="guide" key={i}>
                <div className="guide-head">
                  <div className="guide-glyph">{g.glyph}</div>
                  <div style={{ minWidth: 0 }}>
                    <div className="guide-title">{g.name}</div>
                    <div className="guide-sub">{g.time}</div>
                  </div>
                  <span className={`guide-diff ${diffClass}`}>{g.difficulty}</span>
                </div>
                <p className="guide-blurb">{g.blurb}</p>
                <div className="guide-foot">
                  <div className="guide-tags">
                    {g.tags.map(t => <span className="tag" key={t}>#{t}</span>)}
                  </div>
                  <button className="btn btn-ghost" style={{ padding: '6px 10px' }}>
                    Open setup
                    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowToSection;
