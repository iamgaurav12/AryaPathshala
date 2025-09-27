import React from 'react';
import { AlertTriangle, RefreshCw, Bug, ExternalLink } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-dark-primary px-4 py-12 sm:px-6 lg:px-8">
          {/* Background Pattern */}
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-tertiary" />
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-secondary rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
            </div>
          </div>

          <div className="relative z-10 max-w-md w-full space-y-8">
            {/* Error Icon */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-yellow-primary/20 mx-auto mb-6 flex items-center justify-center shadow-yellow-glow animate-pulse">
                <AlertTriangle className="w-10 h-10 text-yellow-primary" />
              </div>
              
              <h2 className="text-3xl font-bold text-dark-primary mb-3">
                Oops! Something went wrong
              </h2>
              
              <p className="text-dark-muted text-base leading-relaxed">
                We encountered an unexpected error in AryaPathshala. Don't worry, our team has been notified and is working on a fix.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={this.handleRefresh}
                className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-yellow-primary text-black rounded-lg font-medium transition-all duration-300 hover:bg-yellow-hover shadow-yellow-glow hover:shadow-yellow-glow-lg transform hover:scale-105"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Refresh Page</span>
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-dark-tertiary text-dark-primary rounded-lg font-medium transition-all duration-300 hover:bg-dark-hover border border-dark-primary"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Go to Homepage</span>
              </button>
            </div>

            {/* Development Error Details */}
            {import.meta.env.DEV && this.state.error && (
              <div className="mt-8 space-y-4">
                <details className="bg-red-900/30 p-6 rounded-lg border border-red-500/50 shadow-dark-elevation">
                  <summary className="text-red-400 font-semibold cursor-pointer flex items-center space-x-2 hover:text-red-300 transition-colors">
                    <Bug className="w-4 h-4" />
                    <span>Error Details (Development Only)</span>
                  </summary>
                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="text-red-300 font-medium mb-2">Error Message:</h4>
                      <pre className="text-sm text-red-200 bg-red-950/50 p-3 rounded border overflow-auto">
                        {this.state.error.toString()}
                      </pre>
                    </div>
                    
                    {this.state.errorInfo?.componentStack && (
                      <div>
                        <h4 className="text-red-300 font-medium mb-2">Component Stack:</h4>
                        <pre className="text-sm text-red-200 bg-red-950/50 p-3 rounded border overflow-auto max-h-40">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              </div>
            )}

            {/* Footer */}
            <div className="text-center pt-6 border-t border-dark-primary">
              <p className="text-dark-muted text-sm">
                If this problem persists, please contact our support team.
              </p>
              <div className="flex items-center justify-center space-x-4 mt-3">
                <span className="inline-flex items-center space-x-1 text-yellow-primary text-sm">
                  <span className="w-2 h-2 bg-yellow-primary rounded-full animate-pulse"></span>
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