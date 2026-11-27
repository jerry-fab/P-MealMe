import { AlertCircle, RefreshCw } from 'lucide-react';

export const ErrorAlert = ({ message, onRetry }) => {
  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
      <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-2" />
      <h3 className="text-base font-bold text-red-900 mb-1">Failed to Load Meals</h3>
      <p className="text-xs text-red-600 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Try Again</span>
      </button>
    </div>
  );
};
