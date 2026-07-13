// src/features/medications/components/NotFoundComponent.tsx
import { Link } from "@tanstack/react-router";
import { HelpCircle, ArrowLeft } from "lucide-react";

export function NotFoundComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center shrink-0 mb-5 shadow-2xs animate-pulse">
        <HelpCircle className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        404 - Page Not Found
      </h1>
      <p className="text-sm text-slate-400 dark:text-slate-500 mt-2 max-w-sm leading-relaxed">
        The destination address does not exist or has been moved within the
        pharmacy core registry.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition text-xs shadow-xs cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>
    </div>
  );
}
