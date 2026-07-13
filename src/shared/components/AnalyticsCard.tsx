import type { ReactNode } from "react";

interface AnalyticsCardProps {
  title: string;
  subtitle: string;
  badgeValue?: string;
  topRightValue?: string;
  children: ReactNode;
  footer?: ReactNode;
}
export function AnalyticsCard({ title, subtitle, badgeValue, topRightValue, children, footer }: AnalyticsCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 rounded-xl p-4 shadow-2xs flex flex-col justify-between h-full min-h-[210px]">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold text-slate-800 dark:text-white">{title}</h3>
            {badgeValue && (
              <span className="text-[9px] font-bold bg-orange-50 dark:bg-orange-950/40 text-orange-500 px-1.5 py-0.5 rounded-full">
                {badgeValue}
              </span>
            )}
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-0.5">{subtitle}</p>
        </div>
        {topRightValue && (
          <span className="text-base font-bold text-slate-800 dark:text-white leading-tight">
            {topRightValue}
          </span>
        )}
      </div>

      <div className="flex-1 flex items-center justify-center my-1 relative">
        {children}
      </div>

      {footer && (
        <div className="space-y-1 text-[11px] font-medium pt-1.5 border-t border-slate-50 dark:border-slate-700/40---">
          {footer}
        </div>
      )}
    </div>
  );
}