/* eslint-disable @typescript-eslint/no-explicit-any */
export type VehicleFormData = {
  // Basic Info --done
  category: string;
  brand: string;
  model: string;
  year: number | any;
  transmission: string;
  color: string;
  kmh: number;
  engine: string;
  maxSpeed: number | any;
  horsePower: number | any;
  seats: number | any;
  fuelType: string;
  isConfirmed?: boolean;
  // isBusinessRental: boolean;
  // postAdd: boolean;

  // Media
  otherImages?: File[] | undefined | null;
  mainImage: File | null;
  video?: File;

  // Description --done
  description: string;
  deposite: number | any;
  depositePolicy: string;
  fuelPolicy: string;
  mileagePolicy: string;
  damagePolicy: string;

  price:
    | Array<{
        rentalTime: number | any;
        price: number;
        kilometerPerHour: string;
      }>
    | any;
  accessories: string[] | any;

  // Contact --done
  advertiserName: string;
  phoneNumber: string;
  email: string;
  location: string;
  longitude: number | any;
  latitude: number | any;
  whatsapp: string;
  authenticationFile: File | null;

  ownerId: string;

  // --------------
  // Implement after map integrate map api
  // location: {
  //   lat: number;
  //   lng: number;
  // };
  // -----------------
};

export type FormStep =
  | "basic"
  | "media"
  | "details"
  | "pricing"
  | "description"
  | "publish";
