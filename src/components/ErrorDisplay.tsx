import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorDisplayProps {
  error: string;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <div className="max-w-3xl mx-auto p-8 text-center animate-fade-in">
      <div className="mx-auto w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
        <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-500" />
      </div>

      <h1 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">
        Something went wrong
      </h1>

      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/20 rounded-lg p-4 text-red-800 dark:text-red-200 text-left mb-6 max-w-2xl mx-auto">
        <p className="font-mono text-sm break-all">{error}</p>
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Try refreshing the page, or check your Portal Client API key
        configuration.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-portal-primary text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-portal-primary"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Refresh Page
      </button>
    </div>
  );
}
