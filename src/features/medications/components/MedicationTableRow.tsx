import { Link } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import type { Medication } from "../medications.types";

export function MedicationTableRow({ med }: { med: Medication }) {
  const progressPercent = Math.min((med.current / med.total) * 100, 100);

  return (
    <tr className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-100/30 dark:hover:bg-slate-800/30 transition-colors">
      <td className="py-4 px-4 font-semibold text-blue-600 dark:text-blue-400 cursor-pointer hover:underline truncate">
        <Link to="/medications/$id" params={{ id: String(med.id) }}>
          {med.name}
        </Link>
      </td>

      <td className="py-4 px-4 text-slate-500 dark:text-slate-400 font-normal truncate">
        {med.location}
      </td>

      <td className="py-4 px-4 text-slate-400 dark:text-slate-500 font-normal whitespace-nowrap">
        {med.startDate}
      </td>

      <td className="py-4 px-4 text-slate-400 dark:text-slate-500 font-normal whitespace-nowrap">
        {med.endDate}
      </td>

      <td className="py-4 px-4">
        <div className="flex justify-center">
          {med.success ? (
            <div
              className="w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 dark:text-emerald-400 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/20"
              title="All clinical criteria passed successfully"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </div>
          ) : (
            <div
              className="w-7 h-7 rounded-full bg-red-50 dark:bg-red-950/30 text-red-400 dark:text-red-400 flex items-center justify-center border border-red-100 dark:border-red-900/20"
              title="Critical side effects detected"
            >
              <X className="w-5 h-5 stroke-[3]" />
            </div>
          )}
        </div>
      </td>

      <td className="py-4 px-4 font-normal">
        <div className="w-full">
          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
            {med.current} / {med.total}
          </span>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-1 rounded-full mt-1.5 overflow-hidden">
            <div
              className="bg-green-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </td>

      <td className="py-4 px-4 text-left">
        <div className="flex items-center gap-1 w-full text-left">
          {med.statusWeights.blue > 0 && (
            <span
              className="h-1.5 rounded-full bg-blue-600 dark:bg-cyan-400 cursor-help"
              style={{ flexGrow: med.statusWeights.blue }}
              title="Phase 1: Chemical Synthesis Analysis"
            />
          )}
          {med.statusWeights.red > 0 && (
            <span
              className="h-1.5 rounded-full bg-red-600 dark:bg-rose-500 cursor-help"
              style={{ flexGrow: med.statusWeights.red }}
              title="Phase 2: Preclinical Toxicity Tests"
            />
          )}
          {med.statusWeights.orange > 0 && (
            <span
              className="h-1.5 rounded-full bg-orange-500 dark:bg-amber-400 cursor-help"
              style={{ flexGrow: med.statusWeights.orange }}
              title="Phase 3: Human Efficacy Trials"
            />
          )}
          {med.statusWeights.green > 0 && (
            <span
              className="h-1.5 rounded-full bg-emerald-500 dark:bg-green-400 cursor-help"
              style={{ flexGrow: med.statusWeights.green }}
              title="Phase 4: Official Healthcare Certification"
            />
          )}
        </div>
      </td>
    </tr>
  );
}
