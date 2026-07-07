// src/features/medications/hooks/useDashboard.ts
import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMedicationsApi } from '../medications.api';
import {
  getDashboardCounters,
  prepareTotalTestsTimeline,
  prepareTestedDrugsVolumeData,
  prepareApprovalRatesTrend,
  prepareTestingPhasesPieData,
} from '../utils/dashboard.utils';

export function useDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('June 1 - 30, 2026');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: medications, isLoading, error } = useQuery({
    queryKey: ["medications"],
    queryFn: fetchMedicationsApi,
  });

 // Внутри src/features/medications/hooks/useDashboard.ts
const stats = useMemo(() => {
  if (!medications) return null;

  return {
    ...getDashboardCounters(medications),
    totalTestsData: prepareTotalTestsTimeline(medications),
    barChartData: prepareTestedDrugsVolumeData(medications),
    approvalRatesData: prepareApprovalRatesTrend(medications),
    testingProcessData: prepareTestingPhasesPieData(medications),
  };
}, [medications]);

  return {
    medications,
    isLoading,
    error,
    selectedPeriod,
    setSelectedPeriod,
    isDropdownOpen,
    setIsDropdownOpen,
    stats,
  };
}