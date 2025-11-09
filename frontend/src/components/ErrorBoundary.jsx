import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F8E6E9] to-white px-4">
          <div className="max-w-md w-full text-center">
            <AlertCircle className="w-16 h-16 text-[#D4AF76] mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-[#8B6F8E] mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-[#3E3E3E]/70 mb-6">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-[#F4C2C2] to-[#D4AF76] hover:opacity-90 text-white rounded-full"
            >
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
