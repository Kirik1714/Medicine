// src/features/medications/components/MedicationControlModal.tsx
import { useState } from "react";
import { X, Check, AlertCircle } from "lucide-react";
import type { MedicationDetails } from "../medications.types";

interface MedicationControlModalProps {
  isOpen: boolean;
  onClose: () => void;
  medication: MedicationDetails;
  onSave: (updatedData: Partial<MedicationDetails>) => void;
}

export function MedicationControlModal({ isOpen, onClose, medication, onSave }: MedicationControlModalProps) {
  const [current, setCurrent] = useState<number | string>(medication.current);
  const [total, setTotal] = useState<number | string>(medication.total);
  const [success, setSuccess] = useState(medication.success);

  const [blue, setBlue] = useState(medication.statusWeights.blue > 0);
  const [red, setRed] = useState(medication.statusWeights.red > 0);
  const [orange, setOrange] = useState(medication.statusWeights.orange > 0);
  const [green, setGreen] = useState(medication.statusWeights.green > 0);

  if (!isOpen) return null;

  const numCurrent = Number(current) || 0;
  const numTotal = Number(total) || 0;

  const hasAllPhases = blue && red && orange && green;
  const hasAllTests = numCurrent >= numTotal && numTotal > 0;
  const isEligibleForPassed = hasAllPhases && hasAllTests;

  const getValidationMessage = () => {
    if (!hasAllTests && !hasAllPhases) return "Complete all tests & activate all phases";
    if (!hasAllTests) return `Complete tests (${numCurrent}/${numTotal})`;
    if (!hasAllPhases) return "Activate all 4 phases";
    return "";
  };

  const handleSave = () => {
    const finalSuccess = isEligibleForPassed ? success : false;

    onSave({
      current: numCurrent,
      total: numTotal,
      success: finalSuccess,
      statusWeights: {
        blue: blue ? 3 : 0,
        red: red ? 2 : 0,
        orange: orange ? 4 : 0,
        green: green ? 2 : 0,
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-full max-w-md rounded-2xl shadow-xl overflow-hidden text-sm transition-colors">
        
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <h3 className="text-base font-bold text-slate-800 dark:text-white">Control Panel Process</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Tests Completed</label>
              <input 
                type="number" 
                value={current} 
                onChange={(e) => setCurrent(e.target.value === "" ? "" : Number(e.target.value))} 
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-hidden focus:border-blue-500 font-medium" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Total Capacity</label>
              <input 
                type="number" 
                value={total} 
                onChange={(e) => setTotal(e.target.value === "" ? "" : Number(e.target.value))} 
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-hidden focus:border-blue-500 font-medium" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">Active Phases (Status Indicators)</label>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <label className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-900 rounded-lg cursor-pointer select-none">
                <input type="checkbox" checked={blue} onChange={(e) => setBlue(e.target.checked)} className="rounded-sm text-blue-600" /> 
                <span className="text-blue-500 font-semibold">Phase 1 (Chemical)</span>
              </label>
              <label className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-900 rounded-lg cursor-pointer select-none">
                <input type="checkbox" checked={red} onChange={(e) => setRed(e.target.checked)} className="rounded-sm text-red-600" /> 
                <span className="text-red-500 font-semibold">Phase 2 (Toxicity)</span>
              </label>
              <label className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-900 rounded-lg cursor-pointer select-none">
                <input type="checkbox" checked={orange} onChange={(e) => setOrange(e.target.checked)} className="rounded-sm text-orange-600" /> 
                <span className="text-orange-500 font-semibold">Phase 3 (Efficacy)</span>
              </label>
              <label className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-900 rounded-lg cursor-pointer select-none">
                <input type="checkbox" checked={green} onChange={(e) => setGreen(e.target.checked)} className="rounded-sm text-emerald-600" /> 
                <span className="text-emerald-500 font-semibold">Phase 4 (Approval)</span>
              </label>
            </div>
          </div>

        

          <div className="pt-3 border-t border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold text-slate-500">Final Success Reaction</label>
              {!isEligibleForPassed && (
                <span className="text-[10px] text-amber-500 flex items-center gap-1 font-semibold bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-md">
                  <AlertCircle className="w-3 h-3" /> {getValidationMessage()}
                </span>
              )}
            </div>
            
            <div className="flex gap-3">
              <button 
                disabled={!isEligibleForPassed}
                onClick={() => setSuccess(true)}
                className={`flex-1 py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition duration-200 ${
                  !isEligibleForPassed
                    ? "bg-slate-50 dark:bg-slate-900/40 text-slate-300 dark:text-slate-600 border-slate-200 dark:border-slate-700 cursor-not-allowed"
                    : success
                      ? "bg-emerald-500 text-white border-emerald-500 shadow-xs cursor-pointer"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 hover:border-slate-300 cursor-pointer"
                }`}
              >
                <Check className="w-4 h-4 stroke-[3]" /> Passed
              </button>

              <button 
                onClick={() => setSuccess(false)}
                className={`flex-1 py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition duration-200 cursor-pointer ${
                  !success 
                    ? "bg-red-500 text-white border-red-500 shadow-xs" 
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <X className="w-4 h-4 stroke-[3]" /> Failed
              </button>
            </div>
          </div>
          
        </div>

        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 cursor-pointer">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition cursor-pointer">Save Updates</button>
        </div>
        
      </div>
    </div>
  );
}