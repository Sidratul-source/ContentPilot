import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowUpRight, Sprout } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import LandingPage from '@/pages/landing';
import StrategyPage from '@/pages/strategy';
import { Route, Switch, useLocation, Router as WouterRouter, Link } from 'wouter';

const queryClient = new QueryClient();

function Header() {
  const [location] = useLocation();
  const isApp = location === '/app';
  return (
    <header className="site-header" data-testid="navigation-main">
      <div className="nav-inner">
        <Link href="/" className="brand" data-testid="link-home">
          <span className="brand-mark"><Sprout size={17} strokeWidth={2.2} /></span>
          <span>content<span className="brand-pilot">pilot</span></span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <span className="open-source-chip" data-testid="badge-open-source"><span />Open source</span>
          {!isApp && <a href="#how-it-works" data-testid="link-how-it-works">How it works</a>}
          {!isApp && <a href="#for-who" data-testid="link-audiences">Who it’s for</a>}
          <Link href="/app" className={isApp ? 'nav-current' : ''} data-testid="link-strategy-app">Strategy workspace</Link>
        </nav>
        <Link href="/app" className="nav-cta" data-testid="button-nav-start">
          <span>{isApp ? 'Open workspace' : 'Start planning'}</span><ArrowUpRight size={15} />
        </Link>
      </div>
    </header>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <div className="grain min-h-[100dvh]">
        <Header />
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route path="/app" component={StrategyPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </RoutedErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
