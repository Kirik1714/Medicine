/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import { useMedications } from "../features/medications/hooks/useMedications";
import { MedicationsFilters } from "../features/medications/components/MedicationsFilters";
import { MedicationTableRow } from "../features/medications/components/MedicationTableRow";
import { MedicationsTableSkeleton } from "../features/medications/components/MedicationSkeleton";
import { ErrorState } from "../shared/components/ErrorState";

export const Route = createFileRoute("/_authenticated/medications/")({
  component: MedicationsComponent,
});

function MedicationsComponent() {
  const {
    medications,
    displayedMedications,
    filteredMedications,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    successFilter,
    setSuccessFilter,
    isSelectOpen,
    setIsSelectOpen,
    selectRef,
    isAllVisible,
    setIsAllVisible,
  } = useMedications();

  const filterLabels = {
    all: "All Reactions",
    success: "Success Only",
    failed: "Failed Only",
  };

  if (isLoading) {
    return <MedicationsTableSkeleton />;
  }

  if (error || !medications) {
    return (
      <ErrorState
        title="Server communication error"
        message="Failed to fetch data from DummyJSON."
      />
    );
  }

  return (
   <div className="w-full transition-colors duration-200">
    
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 w-full text-center md:text-left items-center">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
            List of medications in development
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 mt-1">
            Brief summary of testing processes
          </p>
        </div>

        <MedicationsFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          successFilter={successFilter}
          setSuccessFilter={setSuccessFilter}
          isSelectOpen={isSelectOpen}
          setIsSelectOpen={setIsSelectOpen}
          selectRef={selectRef}
          filterLabels={filterLabels}
        />
      </div>

     
      <div className="overflow-x-auto w-full border border-slate-100 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-3xs flex flex-col min-h-[450px]">
        <table className="w-full min-w-[1000px] border-collapse text-left text-xs font-medium table-fixed">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[11px] bg-slate-50/50 dark:bg-slate-900/50">
              <th className="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-200 w-[20%]">Name</th>
              <th className="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-200 w-[22%]">Location</th>
              <th className="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-200 w-[13%]">Start Date</th>
              <th className="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-200 w-[13%]">End Date</th>
              <th className="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-200 w-[12%] text-center">Success Reaction</th>
              <th className="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-200 w-[10%]">Process</th>
              <th className="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-200 w-[10%] pr-4">Status</th>
            </tr>
          </thead>

          <tbody className="text-slate-700 dark:text-slate-300 divide-y divide-slate-50 dark:divide-slate-800/50">
            {displayedMedications.length > 0 ? (
              displayedMedications.map((med) => (
                <MedicationTableRow key={med.id} med={med} />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-16 text-slate-400 dark:text-slate-500 font-medium bg-white dark:bg-slate-900">
                  No medications found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

     <div className="pt-5 pb-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs text-slate-400 dark:text-slate-500">
        
        {/* Левая группа: Текст счетчика + бейдж фильтрации */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span>
            1 to {displayedMedications.length} items of {filteredMedications.length}
          </span>
          {filteredMedications.length !== medications.length && (
            <span className="text-[11px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md font-medium text-slate-500 dark:text-slate-400">
              filtered from {medications.length} total
            </span>
          )}
        </div>

        {/* Кнопка "View all", которая теперь стоит рядышком через gap */}
        {filteredMedications.length > 9 && (
          <button
            onClick={() => setIsAllVisible(!isAllVisible)}
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer py-1 px-2.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 transition duration-150 shrink-0"
          >
            {isAllVisible ? "Show less" : "View all"}
            <span className="font-mono text-[10px]">&gt;</span>
          </button>
        )}

      </div>

    </div>
  );
}