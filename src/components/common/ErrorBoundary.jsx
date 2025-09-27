import React from 'react';
import { AlertTriangle, RefreshCw, Bug, ExternalLink } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12 sm:px-6 lg:px-8 text-white">
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
            </div>
          </div>

          <div className="relative z-10 max-w-md w-full space-y-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-yellow-500/20 mx-auto mb-6 flex items-center justify-center shadow-lg shadow-yellow-500/20 animate-pulse">
                <AlertTriangle className="w-10 h-10 text-yellow-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Oops! Something went wrong</h2>
              <p className="text-gray-400 text-base leading-relaxed">
                We encountered an unexpected error. Our team has been notified and is working on a fix.
              </p>
            </div>

            <div className="space-y-4">
              <button onClick={this.handleRefresh} className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-yellow-500 text-black rounded-lg font-medium transition-all duration-300 hover:bg-yellow-400 shadow-lg shadow-yellow-500/20 hover:shadow-xl hover:shadow-yellow-500/30 transform hover:scale-105">
                <RefreshCw className="w-5 h-5" />
                <span>Refresh Page</span>
              </button>
              <button onClick={() => window.location.href = '/'} className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-gray-800 text-white rounded-lg font-medium transition-all duration-300 hover:bg-gray-700 border border-gray-700">
                <ExternalLink className="w-5 h-5" />
                <span>Go to Homepage</span>
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-8 space-y-4">
                <details className="bg-red-900/30 p-6 rounded-lg border border-red-500/50 shadow-xl">
                  <summary className="text-red-400 font-semibold cursor-pointer flex items-center space-x-2 hover:text-red-300 transition-colors">
                    <Bug className="w-4 h-4" />
                    <span>Error Details (Development Only)</span>
                  </summary>
                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="text-red-300 font-medium mb-2">Error Message:</h4>
                      <pre className="text-sm text-red-200 bg-black/50 p-3 rounded border border-red-800/50 overflow-auto">
                        {this.state.error.toString()}
                      </pre>
                    </div>
                    {this.state.errorInfo?.componentStack && (
                      <div>
                        <h4 className="text-red-300 font-medium mb-2">Component Stack:</h4>
                        <pre className="text-sm text-red-200 bg-black/50 p-3 rounded border border-red-800/50 overflow-auto max-h-40">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              </div>
            )}

            <div className="text-center pt-6 border-t border-gray-800">
              <p className="text-gray-500 text-sm">If this problem persists, please contact our support team.</p>
              <div className="flex items-center justify-center space-x-4 mt-3">
                <span className="inline-flex items-center space-x-2 text-yellow-500 text-sm">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                  <span>AryaPathshala Support</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
