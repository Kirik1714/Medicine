// src/shared/components/ErrorState.tsx
import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
}

export function ErrorState({ 
  title = "Server communication error", 
  message = "Failed to fetch data from the remote server. Please try again later." 
}: ErrorStateProps) {
  return (
    <div className="text-center py-16 bg-red-50/60 dark:bg-red-950/20 rounded-2xl border border-red-100 dark:border-red-900/30 p-6 max-w-md mx-auto mt-10 animate-fade-in">
      <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-3">
        <AlertCircle className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">
        {title}
      </h3>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
        {message}
      </p>
    </div>
  );
}