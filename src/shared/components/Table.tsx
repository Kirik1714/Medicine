import type { ReactNode } from "react";

interface TableColumn {
  header: string;
  className?: string;
}

interface TableProps {
  columns: TableColumn[];
  children: ReactNode;
  isEmpty: boolean;
  emptyText?: string;
}

export function Table({
  columns,
  children,
  isEmpty,
  emptyText = "No data found.",
}: TableProps) {
  return (
    <div className="overflow-x-auto w-full border border-slate-100 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-3xs flex flex-col min-h-[450px]">
      <table className="w-full min-w-[1000px] border-collapse text-left text-xs font-medium table-fixed">
        <thead>
          <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[11px] bg-slate-50/50 dark:bg-slate-900/50">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`py-3.5 px-4 font-bold text-slate-800 dark:text-slate-200 ${col.className || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-slate-700 dark:text-slate-300 divide-y divide-slate-50 dark:divide-slate-800/50">
          {isEmpty ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-16 text-slate-400 dark:text-slate-500 font-medium bg-white dark:bg-slate-900"
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  );
}
