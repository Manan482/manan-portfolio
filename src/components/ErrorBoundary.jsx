import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 text-center select-none font-sans">
          <div className="p-4 rounded-3xl bg-red-500/10 border border-red-500/30 text-red-400 mb-4 animate-bounce">
            <AlertTriangle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold font-display text-white mb-2">Something went wrong</h2>
          <p className="text-sm text-zinc-400 max-w-md mb-6 font-sans">
            {this.state.error?.message || "An unexpected rendering error occurred. Please click below to refresh the page."}
          </p>
          <button
            onClick={this.handleReload}
            className="px-6 py-3 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold uppercase tracking-wider text-xs flex items-center space-x-2 transition-all shadow-lg shadow-yellow-400/20"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reload Portfolio</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
