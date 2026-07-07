// src/features/medications/medications.api.ts
import { BASE_URL } from "../../shared/api/config";
import type { Medication, MedicationDetails, Product, ProductsResponse, TestLog } from "./medications.types";

let localMedicationsCache: Medication[] | null = null;

const locations = [
  'Serenity Health Clinic', 'Vitality Medical Center', 'Oasis Medical Institute',
  'Summit Health Institute', 'Prosperity Medical Practice', 'Harmony Healthcare Group'
];

export const fetchMedicationsApi = async (): Promise<Medication[]> => {
  if (localMedicationsCache) {
    return localMedicationsCache;
  }

  const response = await fetch(`${BASE_URL}/products?limit=27`);
  if (!response.ok) {
    throw new Error('Failed to fetch medications data from server');
  }

  const data: ProductsResponse = await response.json();
  
  localMedicationsCache = data.products.map((product: Product, index: number): Medication => {
  const isVaccine = index === 2 || index === 3 || index === 5 || index === 6;
  const prefix = isVaccine ? 'Vaccine' : 'Medicine';
  
  const total = product.stock * 4;
  const isCompleted = product.id % 3 === 0; 
  const current = isCompleted ? total : Math.floor(total * 0.5);
  const success = isCompleted ? (product.id % 2 === 0) : false;

  const statusWeights = {
    blue: 3,
    red: 2,
    orange: isCompleted ? 4 : 0,
    green: isCompleted && success ? 2 : 0,
  };

  const day = (product.id % 28) + 1; 
  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  const startDate = `${formattedDay} June 2026`;


  const logs: TestLog[] = [];
  const activeDays = 5; 
  
  for (let i = 0; i < activeDays; i++) {
    const logDay = day + i;
    if (logDay <= 30) {
      const formattedLogDay = logDay < 10 ? `0${logDay}` : `${logDay}`;
      logs.push({
        date: `${formattedLogDay} June 2026`,
        completedDone: Math.round(current / activeDays) + (product.id % (i + 1)),
        totalPlanned: Math.round(total / activeDays) + (product.id % (i + 2))
      });
    }
  }

  return {
    id: product.id,
    name: `${prefix} #${product.id * 123 + 400}`,
    location: locations[index % locations.length],
    startDate,
    endDate: isCompleted ? `${formattedDay} July 2026` : 'Dec 12, 2028',
    success,
    current,
    total,
    statusWeights,
    logs,
  };
});

  return localMedicationsCache;
};

export const fetchMedicationByIdApi = async (id: string): Promise<MedicationDetails> => {
  if (!localMedicationsCache) {
    await fetchMedicationsApi();
  }

  const numId = Number(id);
  const cachedItem = localMedicationsCache?.find(m => m.id === numId);

  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch medication details');
  }
  const product = await response.json();

  if (cachedItem) {
    return {
      ...cachedItem,
      subTitle: "Tavern on the Greend, New York",
      description: product.description,
      clinicName: cachedItem.location, 
      address: "434 Rockaway Ave, Brooklyn",
      zipCode: "11212-5366",
      city: "New York",
      timeRange: "10 am - 4 pm Eastern Daylight Time",
      tags: [cachedItem.name, `Vaccine #${cachedItem.id + 75}`]
    };
  }

  throw new Error("Medication not found in active dataset");
};

export const updateLocalMedicationApi = (id: number, updatedFields: Partial<Medication>) => {
  if (!localMedicationsCache) return;
  
  localMedicationsCache = localMedicationsCache.map((item) => {
    if (item.id === id) {
      const addedCurrent = (updatedFields.current ?? item.current) - item.current;
      const addedTotal = (updatedFields.total ?? item.total) - item.total;

      const updatedLogs = [...item.logs];
      
      if (addedCurrent > 0 || addedTotal > 0) {

        const todayDay = new Date().getDate(); 
        const formattedToday = todayDay < 10 ? `0${todayDay}` : `${todayDay}`;
        
        updatedLogs.push({
          date: `${formattedToday} June 2026`,
          completedDone: addedCurrent > 0 ? addedCurrent : 0,
          totalPlanned: addedTotal > 0 ? addedTotal : 0
        });
      }

      return { ...item, ...updatedFields, logs: updatedLogs };
    }
    return item;
  });
};