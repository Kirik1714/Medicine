// src/features/medications/utils/dashboard.utils.ts
import type { Medication } from '../medications.types';


function getActualLast7Days(): string[] {
  const dates: string[] = [];
  const today = new Date(); 

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
   
    d.setDate(today.getDate() - i);
    
    const day = String(d.getDate()).padStart(2, '0');
    

    dates.push(`${day} June 2026`);
  }
  
  return dates;
}

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

  const totalDrugsChange = (totalTestedDrugsCount / totalCapacity) * 100;

  const successRate = medications.length > 0 
    ? Math.round((medications.filter(m => m.success).length / medications.length) * 100) 
    : 70;

  const approvalRateChange = successRate; 

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
  medications.forEach(med => med.logs.forEach(log => allDatesSet.add(log.date)));

  const uniqueDates = Array.from(allDatesSet);
  uniqueDates.sort((a, b) => parseInt(a) - parseInt(b));

  if (uniqueDates.length === 0) return [];

  return uniqueDates.map(dateStr => {
    let completed = 0;
    let total = 0;

    medications.forEach(med => {
      med.logs.forEach(log => {
        if (log.date === dateStr) {
          completed += log.completedDone;
          total += log.totalPlanned;
        }
      });
    });

    return {
      date: dateStr.split(' ')[0], 
      completed,
      total,
    };
  });
}

export function prepareTestedDrugsVolumeData(medications: Medication[]) {
  const actual7Days = getActualLast7Days();

  return actual7Days.map(dateStr => {
  let completed = 0;
  let totalPlanned = 0;

  medications.forEach(med => {
    med.logs.forEach(log => {
      if (log.date === dateStr) {
        completed += log.completedDone;
        totalPlanned += log.totalPlanned;
      }
    });
  });


  const percent = totalPlanned > 0 ? (completed / totalPlanned) * 100 : 0;

  return {
    date: dateStr.split(' ')[0], 
    completed: percent, 
  };
});
}


export function prepareApprovalRatesTrend(medications: Medication[]) {
  const actual7Days = getActualLast7Days();

  return actual7Days.map((dateStr, idx) => {
    let blueVal = 0;
    let grayVal = 0;

    medications.forEach(med => {
      med.logs.forEach(log => {
        if (log.date === dateStr) {
          blueVal += med.success ? log.completedDone : Math.floor(log.completedDone * 0.2);
          grayVal += Math.floor(log.totalPlanned * 0.4);
        }
      });
    });

    let name = '';
    if (idx === 0 || idx === 6) name = dateStr.split(' ').slice(0, 2).join(' '); 

    return {
      name,
      blueVal,
      grayVal,
    };
  });
}

export function prepareTestingPhasesPieData(medications: Medication[]) {
  let blueSum = 0, redSum = 0, orangeSum = 0, greenSum = 0;
  const actual7Days = getActualLast7Days();

  medications.forEach(m => {
    const hasActivityThisWeek = m.logs.some(log => actual7Days.includes(log.date));
    
    if (hasActivityThisWeek || medications.length <= 3) {
      blueSum += m.statusWeights?.blue || 0;
      redSum += m.statusWeights?.red || 0;
      orangeSum += m.statusWeights?.orange || 0;
      greenSum += m.statusWeights?.green || 0;
    }
  });
  
  const totalWeights = blueSum + redSum + orangeSum + greenSum || 1;

  return [
    { name: 'Preclinical testing', value: Math.round((blueSum / totalWeights) * 100), fill: '#2563eb' },
    { name: 'Clinical trials', value: Math.round((redSum / totalWeights) * 100), fill: '#93c5fd' },
    { name: 'Regulatory approval', value: Math.round((orangeSum / totalWeights) * 100), fill: '#1e40af' },
    { name: 'Approval (Phase 4)', value: Math.round((greenSum / totalWeights) * 100), fill: '#10b981' },
  ];
}