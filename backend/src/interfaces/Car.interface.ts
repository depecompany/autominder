interface Car {
  model: string;
  releaseYear: number;
  brand: string;
  carType?: string | null;
  isPersonal: boolean | null;
  mileage?: number | null;
  fuelType?: string | null;
  hasMaintenance?: boolean | null;
  userId: number;
}
