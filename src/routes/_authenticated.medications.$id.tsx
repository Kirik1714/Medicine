/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Clock, ArrowLeft, CalendarPlus, Navigation } from "lucide-react";
import { useMedicationDetails } from "../features/medications/hooks/useMedicationDetails";
import { MedicationMap } from "../features/medications/components/MedicationMap";
import { MedicationSkeleton } from "../features/medications/components/MedicationSkeleton";
import { MedicationControlModal } from "../features/medications/components/MedicationControlModal";
import { ErrorState } from "../shared/components/ErrorState";

export const Route = createFileRoute("/_authenticated/medications/$id")({
  component: MedicationDetailsComponent,
});

function MedicationDetailsComponent() {
  const { id } = Route.useParams();

  const {
    med,
    isLoading,
    error,
    isModalOpen,
    setIsModalOpen,
    handleUpdateProcess,
  } = useMedicationDetails(id);

  if (isLoading) return <MedicationSkeleton />;
  
  if (error || !med) {
    return (
      <ErrorState 
        title="Medication Profile Error"
        message="Could not retrieve clinical logs or active test parameters for this identifier." 
      />
    );
  }

  return (
    <div className="w-full transition-colors duration-200">
      <Link to="/medications" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 mb-6 transition hover:text-slate-700">
        <ArrowLeft className="w-4 h-4" /> Back to Medications List
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800/80 gap-y-8 lg:gap-y-0 items-start">
        <div className="lg:col-span-2 space-y-8 lg:pr-8">
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-2xs p-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">{med.name}</h1>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-2 font-medium">{med.subTitle}</p>

            <div className="relative flex flex-col md:flex-row items-center border border-slate-200 dark:border-slate-700 rounded-xl mt-8 bg-white dark:bg-slate-800 overflow-hidden w-full">
              <div className="p-6 flex gap-4 items-start flex-1 w-full md:w-1/2">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-500 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5" /></div>
                <div className="text-sm">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-base">Location</h4>
                  <p className="text-slate-500 dark:text-slate-400 mt-1.5 font-normal">{med.address},<br />{med.zipCode}</p>
                </div>
              </div>
              <div className="hidden md:block w-px h-14 bg-slate-200 dark:bg-slate-700/60 shrink-0 self-center" />
              <div className="p-6 flex gap-4 items-start flex-1 w-full md:w-1/2">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-500 flex items-center justify-center shrink-0"><Clock className="w-5 h-5" /></div>
                <div className="text-sm">
                  <h4 className="font-bold text-slate-800 dark:text-white text-base">Date & Time</h4>
                  <p className="text-slate-500 dark:text-slate-400 mt-1.5 font-normal">{med.startDate} - {med.endDate}<br />{med.timeRange}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition text-sm cursor-pointer text-center shadow-xs"
              >
                Manage Process
              </button>
              <button className="py-3 px-6 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition text-sm flex items-center justify-center gap-2 border border-slate-200/40 dark:border-slate-600">
                <CalendarPlus className="w-4.5 h-4.5" /> Add to Calendar
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl lg:text-2xl font-bold text-slate-800 dark:text-white tracking-tight">About this event</h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">{med.description}</p>
          </div>
        </div>

        <div className="space-y-6 lg:pl-8 pt-8 lg:pt-0">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">Manufacturer</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-950 flex items-center justify-center text-white font-bold text-base shadow-xs">🏥</div>
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{med.clinicName}</span>
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800/60">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">Location</h3>
            <MedicationMap />
            <div className="text-sm text-slate-500 dark:text-slate-400 pt-1">{med.address}, {med.zipCode} | {med.city}</div>
            <button className="w-full mt-2 py-2.5 px-4 bg-white dark:bg-slate-800 text-blue-600 font-semibold border border-slate-200 rounded-xl text-sm flex items-center justify-center gap-2 shadow-xs"><Navigation className="w-4.5 h-4.5" /> Get directions</button>
          </div>
        </div>
      </div>

      <MedicationControlModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        medication={med}
        onSave={handleUpdateProcess}
      />
    </div>
  );
}