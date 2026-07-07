export function MedicationSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-6">
      <div className="w-40 h-4 bg-slate-200 dark:bg-slate-700 rounded-md" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="border border-slate-100 dark:border-slate-800 rounded-2xl p-8 space-y-6">
            <div className="w-3/4 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            <div className="w-1/2 h-4 bg-slate-200 dark:bg-slate-700 rounded-md" />
            <div className="h-24 bg-slate-100 dark:bg-slate-800 rounded-xl w-full" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-11 bg-slate-200 dark:bg-slate-700 rounded-xl" />
              <div className="h-11 bg-slate-200 dark:bg-slate-700 rounded-xl" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="w-1/4 h-6 bg-slate-200 dark:bg-slate-700 rounded-md" />
            <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-md" />
            <div className="w-5/6 h-4 bg-slate-200 dark:bg-slate-700 rounded-md" />
          </div>
        </div>

        <div className="space-y-6 lg:pl-8">
          <div className="space-y-3">
            <div className="w-1/3 h-5 bg-slate-200 dark:bg-slate-700 rounded-md" />
            <div className="w-full h-10 bg-slate-100 dark:bg-slate-800 rounded-xl" />
          </div>
          <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="w-1/3 h-5 bg-slate-200 dark:bg-slate-700 rounded-md" />
            <div className="w-full h-44 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MedicationRowSkeleton() {
  return (
    <tr className="border-b border-slate-100 dark:border-slate-800/60 animate-pulse">
      <td className="py-4 pr-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-sm w-3/4" />
      </td>
      <td className="py-4 pr-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-sm w-5/6" />
      </td>
      <td className="py-4 pr-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-sm w-20" />
      </td>
      <td className="py-4 pr-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-sm w-20" />
      </td>
      <td className="py-4 pr-4 flex justify-center">
        <div className="w-5 h-5 bg-slate-200 dark:bg-slate-700 rounded-full" />
      </td>
      <td className="py-4 pr-4">
        <div className="space-y-1.5">
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-sm w-12" />
          <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full w-24" />
        </div>
      </td>
      <td className="py-4 pr-2">
        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full w-full" />
      </td>
    </tr>
  );
}

export function MedicationsTableSkeleton() {
  const skeletonRows = Array.from({ length: 9 });

  return (
    <div className="w-full space-y-6">
      <div className="animate-pulse flex flex-col md:flex-row md:items-start justify-between gap-4 w-full mb-6">
        <div className="space-y-2">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-md w-64" />
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-48" />
        </div>
        <div className="flex gap-3">
          <div className="h-9 bg-slate-200 dark:bg-slate-700 rounded-xl w-48" />
          <div className="h-9 bg-slate-200 dark:bg-slate-700 rounded-xl w-32" />
        </div>
      </div>

      {/* Таблица */}
      <div className="overflow-x-auto w-full flex flex-col min-h-[450px]">
        <table className="w-full border-collapse text-left text-xs font-medium">
          <thead>
            <tr className="border-b border-t border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 uppercase tracking-wider text-[11px]">
              <th className="py-3 pb-4 font-bold w-[22%]">Name</th>
              <th className="py-3 pb-4 font-bold w-[22%]">Location</th>
              <th className="py-3 pb-4 font-bold w-[12%]">Start Date</th>
              <th className="py-3 pb-4 font-bold w-[12%]">End Date</th>
              <th className="py-3 pb-4 font-bold w-[12%] text-center">Success Reaction</th>
              <th className="py-3 pb-4 font-bold w-[12%]">Process</th>
              <th className="py-3 pb-4 font-bold w-[12%] pr-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
            {skeletonRows.map((_, index) => (
              <MedicationRowSkeleton key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="w-full space-y-6 p-4 bg-slate-50/40 rounded-2xl animate-pulse">
      <div className="space-y-2">
        <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded-md" />
        <div className="h-4 w-64 bg-slate-200 dark:bg-slate-700 rounded-md" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/40 rounded-xl" />
            ))}
          </div>
          <div className="h-[440px] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/40 rounded-xl" />
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[210px] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/40 rounded-xl" />
          ))}
        </div>

      </div>
    </div>
  );
}