export interface TestLog {
  date: string;          
  completedDone: number; 
  totalPlanned: number;  
}
export interface Medication {
  id: number;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  success: boolean;
  current: number;
  total: number;
  statusWeights: {
    blue: number;
    red: number;
    orange: number;
    green: number;
  };
  logs: TestLog[];

}
export interface MedicationDetails {
  id: number;
  name: string;
  subTitle: string;
  description: string;
  clinicName: string;
  address: string;
  zipCode: string;
  city: string;
  startDate: string;
  endDate: string;
  timeRange: string;
  tags: string[];
  current: number;
  total: number;
  success: boolean;
  statusWeights: {
    blue: number;
    red: number;
    orange: number;
    green: number;
  };
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