// src/features/medications/utils/dashboard.utils.ts
import type { Medication } from '../medications.types';

// 1. Главные счетчики и показатели верхних карточек
export function getDashboardCounters(medications: Medication[]) {
  const totalTestedDrugsCount = medications.reduce((acc, m) => acc + m.current, 0);
  const approvedDrugsCount = medications.reduce((acc, m) => acc + (m.success ? m.current : 0), 0);
  const failedCount = medications.filter(m => !m.success).length;

  const awaitingMedication = medications.find(m => m.current < m.total);
  const awaitingMedName = awaitingMedication ? awaitingMedication.name : "No active tests";
  const activeVaccinesCount = medications.filter(m => m.name.startsWith("Vaccine") && m.current < m.total).length;

  const totalCapacity = medications.reduce((acc, m) => acc + m.total, 0) || 1;
  const completedPercent = Math.round((totalTestedDrugsCount / totalCapacity) * 100);
  const awaitingPercent = 100 - completedPercent;

  const totalDrugsChange = -Math.abs((medications.length % 5) + 3.8);
  const approvalRateChange = Math.abs((medications.length % 7) + 21.5);

  const passedCount = medications.filter(m => m.success).length;
  const successRate = Math.round((passedCount / medications.length) * 100) || 70;

  const peopleTestedData = [
    { value: successRate, fill: '#2563eb' },
    { value: 100 - successRate, fill: '#eff6ff' },
  ];

  return {
    totalTestedDrugsCount,
    approvedDrugsCount,
    failedCount,
    awaitingMedName,
    activeVaccinesCount,
    completedPercent, 
    awaitingPercent,  
    totalDrugsChange,
    approvalRateChange,
    successRate,
    peopleTestedData,
  };
}

export function prepareTotalTestsTimeline(medications: Medication[]) {
  const allDatesSet = new Set<string>();
  
  medications.forEach(med => {
    med.logs.forEach(log => {
      allDatesSet.add(log.date);
    });
  });

  const uniqueDates = Array.from(allDatesSet);
  uniqueDates.sort((a, b) => parseInt(a) - parseInt(b));

  if (uniqueDates.length === 0) {
    return [];
  }

  const activityMap: Record<string, { completed: number; total: number }> = {};
  uniqueDates.forEach(dateStr => {
    activityMap[dateStr] = { completed: 0, total: 0 };
  });

  medications.forEach(med => {
    med.logs.forEach(log => {
      if (activityMap[log.date]) {
        activityMap[log.date].completed += log.completedDone;
        activityMap[log.date].total += log.totalPlanned;
      }
    });
  });

  return uniqueDates.map(dateStr => {
    const dayLabel = dateStr.split(' ')[0]; 
    return {
      date: dayLabel,
      completed: activityMap[dateStr].completed,
      total: activityMap[dateStr].total,
    };
  });
}

export function prepareTestedDrugsVolumeData(medications: Medication[]) {
  return medications.slice(0, 14).map(m => {
    const completedFactor = m.current / (m.total || 1);
    const completed = Math.round(m.current * (completedFactor > 0.5 ? 0.52 : 0.45));
    const awaiting = Math.round(m.current * (completedFactor > 0.5 ? 0.48 : 0.55));
    return { completed, awaiting };
  });
}

export function prepareApprovalRatesTrend(medications: Medication[]) {
  return medications.slice(0, 7).map((m, idx) => {
    let name = '';
    if (idx === 0) name = '01 June';
    if (idx === 6) name = '07 June';

    return {
      name,
      blueVal: m.success ? m.current : Math.floor(m.current * 0.4),
      grayVal: Math.floor(m.total * 0.25),
    };
  });
}
export function prepareTestingPhasesPieData(medications: Medication[]) {
  let blueSum = 0, redSum = 0, orangeSum = 0, greenSum = 0;
  
  medications.forEach(m => {
    blueSum += m.statusWeights?.blue || 0;
    redSum += m.statusWeights?.red || 0;
    orangeSum += m.statusWeights?.orange || 0;
    greenSum += m.statusWeights?.green || 0;
  });
  
  const totalWeights = blueSum + redSum + orangeSum + greenSum || 1;

  return [
    { name: 'Preclinical testing', value: Math.round((blueSum / totalWeights) * 100), fill: '#2563eb' },
    { name: 'Clinical trials', value: Math.round((redSum / totalWeights) * 100), fill: '#93c5fd' },
    { name: 'Regulatory approval', value: Math.round((orangeSum / totalWeights) * 100), fill: '#1e40af' },
    { name: 'Approval (Phase 4)', value: Math.round((greenSum / totalWeights) * 100), fill: '#10b981' },
  ];
}