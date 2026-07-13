interface TablePaginationProps {
  displayedCount: number;
  filteredCount: number;
  totalCount: number;
  isAllVisible: boolean;
  setIsAllVisible: (visible: boolean) => void;
}

export function TablePagination({
  displayedCount,
  filteredCount,
  totalCount,
  isAllVisible,
  setIsAllVisible,
}: TablePaginationProps) {
  return (
    <div className="pt-5 pb-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs text-slate-400 dark:text-slate-500">
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
        <span>
          1 to {displayedCount} items of {filteredCount}
        </span>
        {filteredCount !== totalCount && (
          <span className="text-[11px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md font-medium text-slate-500 dark:text-slate-400">
            filtered from {totalCount} total
          </span>
        )}
      </div>

      {filteredCount > 9 && (
        <button
          onClick={() => setIsAllVisible(!isAllVisible)}
          className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer py-1 px-2.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 transition duration-150 shrink-0"
        >
          {isAllVisible ? "Show less" : "View all"}
          <span className="font-mono text-[10px]">&gt;</span>
        </button>
      )}
    </div>
  );
}