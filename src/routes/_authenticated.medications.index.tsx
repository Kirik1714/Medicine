/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import { useMedications } from "../features/medications/hooks/useMedications";
import { MedicationsFilters } from "../features/medications/components/MedicationsFilters";
import { MedicationTableRow } from "../features/medications/components/MedicationTableRow";
import { MedicationsTableSkeleton } from "../features/medications/components/MedicationSkeleton";
import { ErrorState } from "../shared/components/ErrorState";
import { Table } from "../shared/components/Table";
import { TablePagination } from "../shared/components/TablePagination";

export const Route = createFileRoute("/_authenticated/medications/")({
  component: MedicationsComponent,
});

// Декларативно описываем колонки нашей таблицы
const TABLE_COLUMNS = [
  { header: "Name", className: "w-[20%]" },
  { header: "Location", className: "w-[22%]" },
  { header: "Start Date", className: "w-[13%]" },
  { header: "End Date", className: "w-[13%]" },
  { header: "Success Reaction", className: "w-[12%] text-center" },
  { header: "Process", className: "w-[10%]" },
  { header: "Status", className: "w-[10%] pr-4" },
];

const FILTER_LABELS = {
  all: "All Reactions",
  success: "Success Only",
  failed: "Failed Only",
};

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

  if (isLoading) return <MedicationsTableSkeleton />;

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
          filterLabels={FILTER_LABELS}
        />
      </div>

      <Table 
        columns={TABLE_COLUMNS} 
        isEmpty={displayedMedications.length === 0}
        emptyText="No medications found matching your filters."
      >
        {displayedMedications.map((med) => (
          <MedicationTableRow key={med.id} med={med} />
        ))}
      </Table>

      <TablePagination 
        displayedCount={displayedMedications.length}
        filteredCount={filteredMedications.length}
        totalCount={medications.length}
        isAllVisible={isAllVisible}
        setIsAllVisible={setIsAllVisible}
      />
    </div>
  );
}