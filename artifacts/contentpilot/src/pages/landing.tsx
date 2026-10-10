import { ArrowDown, ArrowRight, ArrowUpRight, Blocks, BookOpen, Check, Code2, Compass, FileText, Github, Layers3, Lightbulb, Play, Sparkles, Target } from 'lucide-react';
import { Link } from 'wouter';

const audiences = [
  { id: '01', title: 'Real estate, with a point of view.', copy: 'Turn local expertise, listings, and market knowledge into a presence people remember.', tag: 'Agents & brokers', mark: 'R' },
  { id: '02', title: 'Creators, with a clearer next post.', copy: 'Build a steady stream of ideas around what you know, make, and want to share.', tag: 'Independent creators', mark: 'C' },
  { id: '03', title: 'Small business, without the blank page.', copy: 'Give your offer a voice and make every platform feel a little more intentional.', tag: 'Small businesses', mark: 'S' },
];

const outputs = [
  { icon: Lightbulb, title: 'Content ideas', detail: 'Ten concepts, each with an angle and format.' },
  { icon: Play, title: 'Video toolkit', detail: 'Ten opening hooks and three short-form scripts.' },
  { icon: Layers3, title: 'Carousel concepts', detail: 'Five slide-by-slide outlines ready to shape.' },
  { icon: Target, title: 'Calls to action', detail: 'Three clear next steps for your audience.' },
];

export default function LandingPage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy page-enter">
            <div className="eyebrow"><span className="eyebrow-dot" /> OPEN-SOURCE CONTENT STRATEGY</div>
            <h1>Turn your expertise<br />into a content <em>strategy.</em></h1>
            <p className="hero-lede">A practical strategy workspace for turning what you do into what you share. Built for real estate pros, creators, and small businesses.</p>
            <div className="hero-actions">
              <Link href="/app" className="button-primary" data-testid="button-hero-start">Build your strategy <ArrowRight size={17} /></Link>
              <a className="text-link" href="#how-it-works" data-testid="link-hero-how">See how it works <ArrowDown size={14} /></a>
            </div>
            <div className="hero-note"><span className="note-line" />A focused tool. Your expertise stays at the center.</div>
          </div>
          <div className="hero-art page-enter" aria-label="Illustration of a content strategy board" data-testid="visual-strategy-board">
            <div className="board-top"><div className="board-brand"><span className="board-symbol"><Compass size={15} /></span> YOUR CONTENT NORTH STAR</div><span className="board-state">STRATEGY / 01</span></div>
            <div className="board-title">A week with<br /><i>a little more intention.</i></div>
            <div className="board-rule" />
            <div className="board-row">
              <span className="board-day">MON</span>
              <div><b>Make expertise useful</b><small>Short-form video · Local insight</small></div>
              <span className="board-type">01</span>
            </div>
            <div className="board-row">
              <span className="board-day">WED</span>
              <div><b>Answer the real question</b><small>Carousel · Buyer education</small></div>
              <span className="board-type">02</span>
            </div>
            <div className="board-row">
              <span className="board-day">FRI</span>
              <div><b>Show what makes it yours</b><small>Photo + caption · Behind the work</small></div>
              <span className="board-type">03</span>
            </div>
            <div className="board-foot"><span><span className="green-dot" /> ILLUSTRATIVE PREVIEW · NOT GENERATED</span><span>CONTENTPILOT <ArrowUpRight size={12} /></span></div>
            <div className="art-stamp"><span>STRATEGY<br />OVER<br />SCRAMBLE</span><ArrowUpRight size={15} /></div>
          </div>
        </div>
        <div className="hero-bottom"><span>LESS GUESSING. MORE GOOD WORK.</span><span>01 / 04</span></div>
      </section>

      <section className="manifesto section-wrap" id="how-it-works">
        <div className="section-kicker"><span>01</span> THE IDEA</div>
        <div className="manifesto-grid">
          <h2>Not another prompt box.<br /><em>A strategy, shaped around you.</em></h2>
          <div className="manifesto-copy">
            <p>ContentPilot starts with the context that makes your business yours: who you serve, what you offer, where you show up, and how you want to sound.</p>
            <p>Then it turns that brief into a useful first draft of your content direction—so you can spend less time wondering what to post and more time making it yours.</p>
            <Link href="/app" className="inline-arrow" data-testid="link-manifesto-app">Explore the strategy workspace <ArrowRight size={16} /></Link>
          </div>
        </div>
        <div className="steps-strip">
          <div className="step"><span className="step-number">01</span><div><b>Tell us the essentials</b><small>Your business, audience, platform, offer, and tone.</small></div></div>
          <div className="step-arrow"><ArrowRight size={18} /></div>
          <div className="step"><span className="step-number">02</span><div><b>Get a structured strategy</b><small>Ideas, video hooks, scripts, carousels, and CTAs.</small></div></div>
          <div className="step-arrow"><ArrowRight size={18} /></div>
          <div className="step"><span className="step-number">03</span><div><b>Make it your own</b><small>Copy what’s useful, edit the rest, and go create.</small></div></div>
        </div>
      </section>

      <section className="audience-section" id="for-who">
        <div className="section-wrap">
          <div className="section-kicker"><span>02</span> MADE FOR YOUR KIND OF WORK</div>
          <div className="audience-heading"><h2>Different businesses.<br /><em>One clearer starting point.</em></h2><p>Specific enough to be useful.<br />Open enough to make it yours.</p></div>
          <div className="audience-list">
            {audiences.map(item => <article key={item.id} className="audience-row" data-testid={`card-audience-${item.id}`}>
              <span className="audience-id">{item.id}</span><span className="audience-mark">{item.mark}</span>
              <div className="audience-text"><h3>{item.title}</h3><p>{item.copy}</p></div><span className="audience-tag">{item.tag}</span>
            </article>)}
          </div>
        </div>
      </section>

      <section className="deliverables section-wrap">
        <div className="section-kicker"><span>03</span> WHAT YOU WALK AWAY WITH</div>
        <div className="deliverable-layout">
          <div className="deliverable-intro"><h2>A useful mix.<br /><em>Not a wall of text.</em></h2><p>Your strategy arrives in distinct, skimmable pieces. Pick up the idea you need and leave the rest for later.</p><span className="deliverable-count">31 <small>pieces to work from</small></span></div>
          <div className="deliverable-grid">
            {outputs.map(({ icon: Icon, title, detail }, i) => <article className="deliverable-item" key={title} data-testid={`card-output-${i}`}>
              <span className="deliverable-icon"><Icon size={18} strokeWidth={1.7} /></span><span className="deliverable-index">0{i + 1}</span><h3>{title}</h3><p>{detail}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section className="principles-section">
        <div className="section-wrap">
          <div className="section-kicker"><span>04</span> WHY CONTENTPILOT</div>
          <div className="principles-grid">
            <div className="principle-lead"><h2>Clarity is a<br /><em>creative advantage.</em></h2><p>Content strategy should help you sound more like yourself—not less.</p></div>
            <div className="principle-list">
              <article><span>01</span><div><h3>Built around your brief</h3><p>Five practical inputs keep the output anchored to your real business and audience.</p></div><Check size={17} /></article>
              <article><span>02</span><div><h3>Structured for action</h3><p>Ideas, hooks, scripts, carousels, and calls to action each have a clear place.</p></div><Check size={17} /></article>
              <article><span>03</span><div><h3>Open source by design</h3><p>A transparent starting point for teams and developers who want to learn, inspect, and contribute.</p></div><Check size={17} /></article>
            </div>
          </div>
        </div>
      </section>

      <section className="developer-section section-wrap" id="developer">
        <div className="dev-card">
          <div className="dev-copy"><div className="section-kicker"><span><Code2 size={14} /></span> OPEN BY NATURE</div><h2>For the curious<br /><em>and the hands-on.</em></h2><p>ContentPilot is an early-stage, open-source hosted AI content strategy platform. Its developer-friendly, API-ready architecture keeps the Anthropic key server-side; add a key to enable the LLM-powered workflow.</p>
          <div className="dev-actions"><a className="dev-primary" href="#getting-started" data-testid="link-developer-guide"><BookOpen size={16} /> Read the setup notes <ArrowRight size={15} /></a><span className="placeholder-link" aria-label="GitHub repository link placeholder" data-testid="text-github-placeholder"><Github size={16} /> GitHub link pending</span></div>
          </div>
          <div className="dev-code" aria-label="Example strategy input fields"><div className="code-bar"><span /><span /><span /><small>strategy-brief.json</small></div><pre><span className="code-muted">{"{"}</span>{'\n'}  <span className="code-key">"businessType"</span>: <span className="code-value">"Real estate"</span>,{'\n'}  <span className="code-key">"targetAudience"</span>: <span className="code-value">"First-time buyers"</span>,{'\n'}  <span className="code-key">"socialPlatform"</span>: <span className="code-value">"Instagram"</span>,{'\n'}  <span className="code-key">"productService"</span>: <span className="code-value">"Buyer representation"</span>,{'\n'}  <span className="code-key">"brandTone"</span>: <span className="code-value">"Warm, candid, informed"</span>{'\n'}<span className="code-muted">{"}"}</span></pre><div className="code-foot"><Blocks size={13} /> A clear brief is the whole point.</div></div>
        </div>
      </section>

      <section className="getting-started section-wrap" id="getting-started">
        <div className="section-kicker"><span>05</span> GETTING STARTED</div>
        <div className="getting-grid"><div><h2>Start with what<br /><em>you already know.</em></h2><p>No content calendar to maintain. No elaborate setup. Just a thoughtful brief and a place to begin.</p></div>
          <ol className="setup-list"><li><span>01</span><div><b>Open the strategy workspace</b><small>Head to the app and share a few details about your work.</small></div></li><li><span>02</span><div><b>Connect the generation service</b><small>Self-hosters need to configure <code>ANTHROPIC_API_KEY</code> on the server.</small></div></li><li><span>03</span><div><b>Shape the result</b><small>Use the pieces that fit. Bring your own judgement to everything else.</small></div></li></ol>
        </div>
      </section>

      <section className="final-cta"><div className="final-inner"><span className="final-kicker">YOUR NEXT GOOD IDEA STARTS HERE</span><h2>Make room for<br /><em>better content.</em></h2><Link href="/app" className="button-light" data-testid="button-final-start">Build a strategy <ArrowUpRight size={16} /></Link></div><span className="final-side">CONTENTPILOT — STRATEGY, NOT SCRAMBLE</span></section>
      <footer className="site-footer"><Link href="/" className="brand" data-testid="link-footer-home"><span className="brand-mark"><Compass size={16} /></span><span>content<span className="brand-pilot">pilot</span></span></Link><span>Open-source content strategy for people building something real.</span><a href="#getting-started" data-testid="link-footer-docs">Getting started <FileText size={14} /></a><a href="#developer" data-testid="link-footer-github">GitHub · link pending <Github size={14} /></a><span className="footer-copy">Built for the work.</span></footer>
    </main>
  );
}
