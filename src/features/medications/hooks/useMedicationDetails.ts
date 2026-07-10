import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMedicationByIdApi, updateLocalMedicationApi } from "../medications.api";
import type { MedicationDetails } from "../medications.types";

export function useMedicationDetails(id: string) {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: med, isLoading, error } = useQuery({
    queryKey: ["medication", id],
    queryFn: () => fetchMedicationByIdApi(id),
  });

  const handleUpdateProcess = (updatedFields: Partial<MedicationDetails>) => {
    if (!med) return;

    updateLocalMedicationApi(med.id, {
      current: updatedFields.current,
      total: updatedFields.total,
      success: updatedFields.success,
      statusWeights: updatedFields.statusWeights ? {
        blue: updatedFields.statusWeights.blue,
        red: updatedFields.statusWeights.red,
        orange: updatedFields.statusWeights.orange,
        green: updatedFields.statusWeights.green,
      } : undefined
    });

    queryClient.invalidateQueries({ queryKey: ["medications"] });
    queryClient.invalidateQueries({ queryKey: ["medication", id] });
  };

  return {
    med,
    isLoading,
    error,
    isModalOpen,
    setIsModalOpen,
    handleUpdateProcess,
  };
}