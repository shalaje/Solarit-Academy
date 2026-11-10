import React, { ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public props: Props;
  public state: State = { hasError: false };

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-[#141A29] border border-white/10 rounded-3xl p-8 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto font-bold text-xl">
              !
            </div>
            <h2 className="text-xl font-heading font-bold text-white">
              Solarit Academy
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Pati një rifreskim të përkohshëm. Klikoni më poshtë për t&apos;u kthyer në faqen kryesore.
            </p>
            <button
              onClick={() => {
                window.location.href = '/';
              }}
              className="w-full py-3 px-6 rounded-xl bg-brand-green hover:bg-brand-green/90 text-white font-heading font-bold text-sm transition-all shadow-lg shadow-brand-green/20 cursor-pointer"
            >
              Kthehu në Faqen Kryesore
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
