import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

/**
 * Error state component with retry action.
 */
export const ErrorAlert = ({ message, onRetry }) => {
  return (
    <div className="max-w-xl mx-auto my-12 p-6 bg-red-50/80 border border-red-200 rounded-2xl text-center">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-red-900 mb-1">
        Unable to Load Recipes
      </h3>
      <p className="text-sm text-red-700 mb-6 max-w-md mx-auto">
        {message || 'An unexpected error occurred while communicating with the recipe server.'}
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-full shadow-sm transition-colors active:scale-95"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Try Again</span>
      </button>
    </div>
  );
};
