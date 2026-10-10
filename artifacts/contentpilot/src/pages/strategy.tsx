import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGenerateStrategy, useHealthCheck } from '@workspace/api-client-react';
import type { ContentStrategy, ContentStrategyInput } from '@workspace/api-client-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AlertCircle, ArrowRight, Check, Clipboard, ClipboardCheck, Copy, LoaderCircle, RotateCcw, Sparkles, Sprout, Wifi, WifiOff } from 'lucide-react';
import { Form } from '@/components/ui/form';

const initialForm: ContentStrategyInput = {
  businessType: '',
  targetAudience: '',
  socialPlatform: '',
  productService: '',
  brandTone: '',
};

const formSchema = z.object({
  businessType: z.string().trim().min(2).max(120),
  targetAudience: z.string().trim().min(2).max(500),
  socialPlatform: z.string().trim().min(2).max(80),
  productService: z.string().trim().min(2).max(300),
  brandTone: z.string().trim().min(2).max(200),
});

const platformOptions = ['Instagram', 'TikTok', 'LinkedIn', 'Facebook', 'YouTube', 'Pinterest', 'Other'];

export default function StrategyPage() {
  const form = useForm<ContentStrategyInput>({
    resolver: zodResolver(formSchema),
    defaultValues: initialForm,
  });
  const [copied, setCopied] = useState('');
  const strategyMutation = useGenerateStrategy();
  const healthQuery = useHealthCheck();

  const submit = (values: ContentStrategyInput) => strategyMutation.mutate({ data: values });
  const reset = () => {
    strategyMutation.reset();
    form.reset(initialForm);
    setCopied('');
  };
  const copyText = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      window.setTimeout(() => setCopied(current => current === key ? '' : current), 1800);
    } catch {
      setCopied('copy-error');
      window.setTimeout(() => setCopied(''), 2200);
    }
  };
  const copyStrategy = (strategy: ContentStrategy) => {
    const currentForm = form.getValues();
    const text = [
      'CONTENT STRATEGY',
      `Business: ${currentForm.businessType}`,
      `Audience: ${currentForm.targetAudience}`,
      `Platform: ${currentForm.socialPlatform}`,
      `Offer: ${currentForm.productService}`,
      `Tone: ${currentForm.brandTone}`,
      '',
      'CONTENT IDEAS',
      ...strategy.contentIdeas.map((idea, index) => `${index + 1}. ${idea.title}\n   Angle: ${idea.angle}\n   Format: ${idea.format}`),
      '',
      'VIDEO HOOKS',
      ...strategy.videoHooks.map((hook, index) => `${index + 1}. ${hook}`),
      '',
      'VIDEO SCRIPTS',
      ...strategy.videoScripts.map((script, index) => `${index + 1}. ${script.title}\nHook: ${script.hook}\n${script.beats.map((beat, beatIndex) => `- ${beatIndex + 1}. ${beat}`).join('\n')}\nCTA: ${script.callToAction}`),
      '',
      'CAROUSEL IDEAS',
      ...strategy.carouselIdeas.map((carousel, index) => `${index + 1}. ${carousel.title}\n${carousel.slides.map((slide, slideIndex) => `${slideIndex + 1}. ${slide}`).join('\n')}`),
      '',
      'CALLS TO ACTION',
      ...strategy.callsToAction.map((cta, index) => `${index + 1}. ${cta}`),
    ].join('\n');
    void copyText('all', text);
  };
  const mutationError = strategyMutation.error as (Error & { status?: number; response?: { status?: number; data?: { error?: string; setupRequired?: boolean } }; data?: { error?: string; setupRequired?: boolean } }) | null;
  const errorMessage = mutationError?.response?.data?.error ?? mutationError?.data?.error ?? mutationError?.message ?? 'The request could not be completed. Please try again.';
  const setupRequired = mutationError?.status === 503 || mutationError?.response?.status === 503 || mutationError?.response?.data?.setupRequired || mutationError?.data?.setupRequired || /503|anthropic_api_key|api key/i.test(errorMessage);
  const strategy = strategyMutation.data;

  return (
    <main className="workspace-page">
      <div className="workspace-shell">
        <div className="workspace-heading">
          <div className="workspace-overline"><span className="overline-mark"><Sprout size={14} /></span> CONTENT STRATEGY WORKSPACE</div>
          <h1>Let’s make your next<br /><em>good idea easier.</em></h1>
          <p>Share the essentials. Get a structured starting point made for your business, your audience, and the place you show up.</p>
        </div>
        <div className="workspace-grid">
          <aside className="brief-panel">
            <div className="brief-topline"><span>YOUR BRIEF</span><span className="required-note">ALL FIELDS REQUIRED</span></div>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="strategy-form" data-testid="form-strategy">
              <label className="field">
                <span><b>01</b> Business type</span>
                <input {...form.register('businessType')} data-testid="input-business-type" required minLength={2} maxLength={120} placeholder="e.g. Residential real estate" />
              </label>
              <label className="field">
                <span><b>02</b> Target audience</span>
                <textarea {...form.register('targetAudience')} data-testid="input-target-audience" required minLength={2} maxLength={500} rows={3} placeholder="Describe the people you serve" />
              </label>
              <label className="field">
                <span><b>03</b> Social platform</span>
                <select {...form.register('socialPlatform')} data-testid="select-social-platform" required>
                  <option value="" disabled>Choose a platform</option>
                  {platformOptions.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
              </label>
              <label className="field">
                <span><b>04</b> Product / service</span>
                <textarea {...form.register('productService')} data-testid="input-product-service" required minLength={2} maxLength={300} rows={3} placeholder="Your product, service, or expertise" />
              </label>
              <label className="field">
                <span><b>05</b> Brand tone</span>
                <input {...form.register('brandTone')} data-testid="input-brand-tone" required minLength={2} maxLength={200} placeholder="e.g. Warm, direct, and knowledgeable" />
              </label>
              <button className="generate-button" type="submit" disabled={strategyMutation.isPending} data-testid="button-generate-strategy">
                {strategyMutation.isPending ? <><LoaderCircle className="spin-icon" size={17} /> Generating strategy</> : <>Generate Strategy <ArrowRight size={17} /> </>}
              </button>
              <div className="form-footnote"><Sparkles size={13} /> When enabled, your brief is sent to Anthropic for generation. ContentPilot does not store it.</div>
            </form>
            </Form>
            <div className={`service-status ${healthQuery.isError ? 'service-offline' : ''}`} data-testid="status-api-health">
              {healthQuery.isLoading ? <LoaderCircle size={14} className="spin-icon" /> : healthQuery.isError ? <WifiOff size={14} /> : <Wifi size={14} />}
              <span>{healthQuery.isLoading ? 'Checking service' : healthQuery.isError ? 'Generation service unavailable' : `Service ${healthQuery.data?.status ?? 'ready'}`}</span>
              <span className="status-pip" />
            </div>
          </aside>
          <section className="results-panel" aria-live="polite" data-testid="section-strategy-results">
            {!strategy && !strategyMutation.isPending && !strategyMutation.isError && <div className="results-empty" data-testid="state-strategy-empty">
              <div className="empty-orbit"><span><Sprout size={26} strokeWidth={1.5} /></span><i /><i /><i /></div>
              <span className="empty-kicker">YOUR STRATEGY STARTS HERE</span>
              <h2>A little context<br /><em>goes a long way.</em></h2>
              <p>Fill in your brief to create a tailored set of ideas, video hooks, scripts, carousel concepts, and calls to action.</p>
              <div className="empty-breakdown"><span>10 ideas</span><b>·</b><span>10 hooks</span><b>·</b><span>3 scripts</span><b>·</b><span>5 carousels</span></div>
            </div>}
            {strategyMutation.isPending && <div className="results-loading" data-testid="state-strategy-loading">
              <div className="loading-orbit"><span><Sprout size={24} /></span></div>
              <span className="empty-kicker">GIVING YOUR BRIEF SOME THOUGHT</span>
              <h2>Finding a direction<br /><em>that fits.</em></h2>
              <p>Your strategy is being prepared. It will appear here as soon as the service responds.</p>
              <div className="skeleton-lines"><i /><i /><i /></div>
            </div>}
            {strategyMutation.isError && <div className="error-state" data-testid="state-strategy-error">
              <div className="error-icon"><AlertCircle size={21} /></div>
              <span className="empty-kicker">{setupRequired ? 'ONE SERVER SETUP STEP' : 'STRATEGY NOT READY'}</span>
              <h2>{setupRequired ? <>Connect the<br /><em>generation service.</em></> : <>We couldn’t build<br /><em>this strategy.</em></>}</h2>
              <p>{setupRequired ? 'ContentPilot’s strategy generation needs an Anthropic API key configured on the server. No strategy was generated for this request.' : errorMessage}</p>
              {setupRequired && <div className="setup-callout" data-testid="notice-anthropic-setup"><span>SERVER CONFIGURATION</span><code>ANTHROPIC_API_KEY</code><small>Add a valid key to the server environment, then try again. Keep the key server-side; never paste it into this form.</small></div>}
              {!setupRequired && <div className="error-detail" data-testid="text-generation-error"><b>Service response</b><span>{errorMessage}</span></div>}
              <button type="button" className="retry-button" onClick={() => strategyMutation.mutate({ data: form.getValues() })} data-testid="button-retry-generation"><RotateCcw size={15} /> Try again</button>
            </div>}
            {strategy && <StrategyResults strategy={strategy} copyStrategy={copyStrategy} copyText={copyText} copied={copied} onReset={reset} />}
          </section>
        </div>
        <div className="workspace-bottom"><span>CONTENTPILOT / STRATEGY, NOT SCRAMBLE</span><span>NO ACCOUNT OR SAVED BRIEFS</span></div>
      </div>
    </main>
  );
}

function StrategyResults({ strategy, copyStrategy, copyText, copied, onReset }: {
  strategy: ContentStrategy;
  copyStrategy: (strategy: ContentStrategy) => void;
  copyText: (key: string, text: string) => void;
  copied: string;
  onReset: () => void;
}) {
  return <div className="strategy-output page-enter">
    <div className="output-heading"><div><span className="empty-kicker">YOUR CONTENT DIRECTION</span><h2>A strategy to<br /><em>make your own.</em></h2></div><button className="copy-all-button" type="button" onClick={() => copyStrategy(strategy)} data-testid="button-copy-all"><ClipboardCheck size={16} />{copied === 'all' ? 'Copied' : 'Copy all'}</button></div>
    <div className="result-context" data-testid="text-strategy-context"><span>{strategy.contentIdeas.length + strategy.videoHooks.length + strategy.videoScripts.length + strategy.carouselIdeas.length + strategy.callsToAction.length} pieces</span><span className="context-dot" /><span>{strategy.contentIdeas.length} content ideas</span><span className="context-dot" /><span>{strategy.videoHooks.length} hooks</span><button type="button" onClick={onReset} data-testid="button-reset-strategy"><RotateCcw size={13} /> New brief</button></div>
    <section className="result-group" data-testid="group-content-ideas"><div className="result-group-title"><span>01</span><h3>Content ideas</h3><small>{strategy.contentIdeas.length} concepts</small></div>
      <div className="idea-list">{strategy.contentIdeas.map((idea, index) => <article className="idea-item" key={`${idea.title}-${index}`} data-testid={`card-content-idea-${index}`}><span className="idea-index">{String(index + 1).padStart(2, '0')}</span><div className="idea-body"><h4>{idea.title}</h4><p>{idea.angle}</p><span className="format-label">{idea.format}</span></div><button type="button" aria-label={`Copy ${idea.title}`} className="item-copy" onClick={() => copyText(`idea-${index}`, `${idea.title}\n${idea.angle}\nFormat: ${idea.format}`)} data-testid={`button-copy-idea-${index}`}>{copied === `idea-${index}` ? <Check size={15} /> : <Copy size={15} />}</button></article>)}</div>
    </section>
    <section className="result-group" data-testid="group-video-hooks"><div className="result-group-title"><span>02</span><h3>Video hooks</h3><small>{strategy.videoHooks.length} opening lines</small></div><ol className="hook-list">{strategy.videoHooks.map((hook, index) => <li key={`${hook}-${index}`} data-testid={`text-video-hook-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><p>{hook}</p><button type="button" aria-label={`Copy video hook ${index + 1}`} className="item-copy" onClick={() => copyText(`hook-${index}`, hook)} data-testid={`button-copy-hook-${index}`}>{copied === `hook-${index}` ? <Check size={15} /> : <Copy size={15} />}</button></li>)}</ol></section>
    <section className="result-group" data-testid="group-video-scripts"><div className="result-group-title"><span>03</span><h3>Video scripts</h3><small>{strategy.videoScripts.length} short-form outlines</small></div><div className="script-list">{strategy.videoScripts.map((script, index) => <article className="script-card" key={`${script.title}-${index}`} data-testid={`card-video-script-${index}`}><div className="script-card-head"><span> SCRIPT / 0{index + 1}</span><button type="button" aria-label={`Copy ${script.title}`} className="item-copy" onClick={() => copyText(`script-${index}`, `${script.title}\nHook: ${script.hook}\n${script.beats.join('\n')}\nCall to action: ${script.callToAction}`)} data-testid={`button-copy-script-${index}`}>{copied === `script-${index}` ? <Check size={15} /> : <Copy size={15} />}</button></div><h4>{script.title}</h4><div className="script-hook"><span>OPEN</span><p>{script.hook}</p></div><ol>{script.beats.map((beat, beatIndex) => <li key={`${beat}-${beatIndex}`}><span>{String(beatIndex + 1).padStart(2, '0')}</span>{beat}</li>)}</ol><div className="script-cta"><span>CTA</span><p>{script.callToAction}</p></div></article>)}</div></section>
    <section className="result-group" data-testid="group-carousel-ideas"><div className="result-group-title"><span>04</span><h3>Carousel concepts</h3><small>{strategy.carouselIdeas.length} slide outlines</small></div><div className="carousel-list">{strategy.carouselIdeas.map((carousel, index) => <article className="carousel-card" key={`${carousel.title}-${index}`} data-testid={`card-carousel-${index}`}><div className="carousel-card-top"><span>CAROUSEL / 0{index + 1}</span><button type="button" aria-label={`Copy ${carousel.title}`} className="item-copy" onClick={() => copyText(`carousel-${index}`, `${carousel.title}\n${carousel.slides.map((slide, slideIndex) => `${slideIndex + 1}. ${slide}`).join('\n')}`)} data-testid={`button-copy-carousel-${index}`}>{copied === `carousel-${index}` ? <Check size={15} /> : <Copy size={15} />}</button></div><h4>{carousel.title}</h4><ol>{carousel.slides.map((slide, slideIndex) => <li key={`${slide}-${slideIndex}`}><span>{String(slideIndex + 1).padStart(2, '0')}</span>{slide}</li>)}</ol></article>)}</div></section>
    <section className="result-group" data-testid="group-calls-to-action"><div className="result-group-title"><span>05</span><h3>Calls to action</h3><small>{strategy.callsToAction.length} next steps</small></div><div className="cta-list">{strategy.callsToAction.map((cta, index) => <article key={`${cta}-${index}`} data-testid={`card-call-to-action-${index}`}><span>0{index + 1}</span><p>{cta}</p><button type="button" aria-label={`Copy call to action ${index + 1}`} className="item-copy" onClick={() => copyText(`cta-${index}`, cta)} data-testid={`button-copy-cta-${index}`}>{copied === `cta-${index}` ? <Check size={15} /> : <Copy size={15} />}</button></article>)}</div></section>
    {copied === 'copy-error' && <p className="copy-error" role="status" data-testid="status-copy-error"><Clipboard size={14} /> Could not access clipboard. Check your browser permissions.</p>}
    <div className="output-endnote"><span><Sprout size={14} /> A strategy is a starting point, not a script.</span><button type="button" onClick={onReset} data-testid="button-start-another">Start another brief <ArrowRight size={14} /></button></div>
  </div>;
}
