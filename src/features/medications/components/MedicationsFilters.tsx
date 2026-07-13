import { Search, Filter, ChevronDown } from "lucide-react";

interface MedicationsFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  successFilter: "all" | "success" | "failed";
  setSuccessFilter: (filter: "all" | "success" | "failed") => void;
  isSelectOpen: boolean;
  setIsSelectOpen: (open: boolean) => void;
  selectRef: React.RefObject<HTMLDivElement | null>;
  filterLabels: Record<string, string>;
}

export function MedicationsFilters({
  searchQuery,
  setSearchQuery,
  successFilter,
  setSuccessFilter,
  isSelectOpen,
  setIsSelectOpen,
  selectRef,
  filterLabels,
}: MedicationsFiltersProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto max-w-md md:max-w-none shrink-0">
      <div className="relative flex-1 w-full min-w-0 md:w-48 md:max-w-[192px]">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 dark:text-slate-500">
          <Search className="w-3.5 h-3.5" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search name..."
          className="w-full pl-8.5 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-medium text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-xs"
        />
      </div>

      <div
        className="relative flex-1 w-full min-w-0 md:w-44 md:max-w-[176px]"
        ref={selectRef}
      >
        <button
          onClick={() => setIsSelectOpen(!isSelectOpen)}
          className="w-full pl-8.5 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-medium text-slate-700 dark:text-slate-200 flex items-center justify-between focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-xs cursor-pointer select-none"
        >
          <span className="absolute left-3 text-slate-400 dark:text-slate-500">
            <Filter className="w-3.5 h-3.5" />
          </span>
          <span className="truncate mr-1">{filterLabels[successFilter]}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${isSelectOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isSelectOpen && (
          <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden py-1 transition-all">
            {(["all", "success", "failed"] as const).map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSuccessFilter(option);
                  setIsSelectOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors cursor-pointer block ${
                  successFilter === option
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                }`}
              >
                {filterLabels[option]}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
