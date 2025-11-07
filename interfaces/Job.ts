export interface IJob {
  id: number;
  id_vehicle: number;
  description: string;
  price: number;
  date: string;
  latitude?: number;
  longitude?: number;
}
