import { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.setState({ hasError: false, error: undefined });
  };

  handleClearCacheAndReload = () => {
    try {
      localStorage.removeItem('solarit_site_settings');
      localStorage.removeItem('solarit_candidate_applications');
      sessionStorage.removeItem('solarit_admin_unlocked');
    } catch {
      // Ignore
    }
    window.location.href = window.location.pathname || '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-[#141A29] border border-white/10 rounded-3xl p-8 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto font-bold text-xl">
              !
            </div>
            <h2 className="text-xl font-heading font-bold text-white">
              {this.props.fallbackTitle || 'Solarit Academy'}
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Pati një rifreskim të përkohshëm. Klikoni më poshtë për të rifreskuar ose kthyer në faqen kryesore.
            </p>

            {this.state.error?.message && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono text-left break-words overflow-auto max-h-32">
                <span className="font-bold text-rose-400">Detajet: </span>
                {this.state.error.message}
              </div>
            )}

            <div className="space-y-2 pt-2">
              <button
                onClick={this.handleReset}
                className="w-full py-3 px-6 rounded-xl bg-brand-green hover:bg-brand-green/90 text-white font-heading font-bold text-sm transition-all shadow-lg shadow-brand-green/20 cursor-pointer"
              >
                Provo Përsëri (Riprovo)
              </button>

              <button
                onClick={this.handleClearCacheAndReload}
                className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-gray-300 hover:text-white font-heading font-medium text-xs transition-all cursor-pointer"
              >
                Pastro memorien e ruajtur dhe rifresko
              </button>

              <button
                onClick={() => {
                  window.location.href = '/';
                }}
                className="w-full py-2 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Kthehu në Faqen Kryesore
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

