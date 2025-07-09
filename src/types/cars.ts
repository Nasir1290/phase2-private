interface RentalPrice {
  rentalTime: number;
  price: number;
  kilometerPerHour: string;
}

export type Car = {
  id: string;
  name: string;
  brand: string;
  deposit: string;
  depositePolicy: string;
  damagePolicy: string;
  mileagePolicy: string;
  fuelPolicy: string;
  year: string;
  color: string;
  kmh: string;
  transmission: string;
  engine: string;
  maxSpeed: string;
  horsePower: string;
  seats: string;
  fuelType: string;
  description: string;
  price: RentalPrice[];
  custom: string;
  model: string;
  accessories: string[];
  daily_price: number | string;
  distance: string;
  mainImage: string;
  otherImages: string[];
  location: string;
  advertiserName: string;
  phoneNumber: number;
  whatsapp: number;
  longitude: number;
  latitude: number;
};
