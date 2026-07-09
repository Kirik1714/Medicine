export interface MedicationStatusWeights {
  blue: number;
  red: number;
  orange: number;
  green: number;
}

export interface TestLog {
  date: string;          
  completedDone: number; 
  totalPlanned: number;  
}

export interface BaseMedication {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  current: number;
  total: number;
  success: boolean;
  statusWeights: MedicationStatusWeights;
}

export interface Medication extends BaseMedication {
  location: string;
  logs: TestLog[];
}

export interface MedicationDetails extends BaseMedication {
  subTitle: string;
  description: string;
  clinicName: string; 
  address: string;
  zipCode: string;
  city: string;
  timeRange: string;
  tags: string[];
  logs: TestLog[];
}


export interface Product {
  id: number;
  title: string;
  stock: number;
  category: string;
}

export interface ProductsResponse {
  products: Product[];
}