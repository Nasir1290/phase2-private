import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VehicleFormData } from "@/types/vehiclStep";
import { IoIosArrowDown } from "react-icons/io";

interface RegistrationProps {
  formData: VehicleFormData;
  onFormChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<VehicleFormData>>;
}

const Registration = ({
  formData,
  onFormChange,
  setFormData,
}: RegistrationProps) => {
  const categories = [
    "Coupè",
    "Elettrica",
    "Hatchback",
    "Lusso",
    "Stationwagon",
    "Minivan",
    "Sportiva",
    "Monovolume",
    "Commerciali",
    "Suv",
    "Cabriolet",
  ];

  const carBrands = [
    "Alpine",
    "Alfa Romeo",
    "Aston Martin",
    "Audi",
    "Bentley",
    "Bmw",
    "BYD",
    "Cadillac",
    "Chevrolet",
    "Chrysler",
    "Citroen",
    "Cupra",
    "Dacia",
    "Daihatsu",
    "Dodge",
    "Dr",
    "Ferrari",
    "Fiat",
    "Ford",
    "Genesis",
    "Honda",
    "Hummer",
    "Hyundai",
    "Infiniti",
    "Isuzu",
    "Iveco",
    "Jaguar",
    "Jeep",
    "Kia",
    "Lamborghini",
    "Lancia",
    "Land Rover",
    "Lexus",
    "Lotus",
    "Maserati",
    "Mazda",
    "McLaren",
    "Mercedes-Benz",
    "Mini",
    "Mitsubishi",
    "Nissan",
    "Opel",
    "Peugeot",
    "Polestar",
    "Porsche",
    "Renault",
    "Rolls-Royce",
    "Seat",
    "Skoda",
    "Smart",
    "Subaru",
    "Suzuki",
    "Tesla",
    "Toyota",
    "Volvo",
    "Volkswagen",
    "Voyah",
    "Dongfeng",
  ];

  const years = [
    "1990",
    "1991",
    "1992",
    "1993",
    "1995",
    "1996",
    "1997",
    "1998",
    "1999",
    "2000",
    "2001",
    "2002",
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
  ];

  return (
    <div>
      <div className="space-y-10">
        <VehicleInsertionHeader
          title="Registrazione"
          subtitle="Inserisci i dati base del tuo veicolo"
        />
        <div className="flex flex-wrap items-center justify-start gap-10">
          {/* Categoria */}
          <div className="relative flex flex-col gap-3">
            <Label htmlFor="category" className="relative">
              Categoria
            </Label>
            <select
              id="category"
              value={formData.category}
              onChange={onFormChange}
              className="relative shadow-md rounded-lg border border-gray-100 w-60 px-4 py-2.5 appearance-none bg-transparent pr-8 text-sm font-normal text-black invalid:text-white"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category} className="text-black" value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute top-12 left-52 transform -translate-y-1/2 pointer-events-none">
              <IoIosArrowDown className="w-4 h-4 text-red" />
            </div>
          </div>

          {/* Marchio */}
          <div className="relative flex flex-col gap-3">
            <Label htmlFor="brand">Marchio</Label>
            <select
              id="brand"
              value={formData.brand}
              onChange={onFormChange}
              className="relative shadow-md rounded-lg border border-gray-100 w-60 px-4 py-2.5 appearance-none bg-transparent pr-8 text-sm font-normal text-black invalid:text-white"
            >
              <option value="" disabled>
                Select a brand
              </option>
              {carBrands.map((brand) => (
                <option key={brand} className="text-black" value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <div className="absolute top-12 left-52 transform -translate-y-1/2 pointer-events-none">
              <IoIosArrowDown className="w-4 h-4 text-red" />
            </div>
          </div>

          {/* Modello */}
          <div className="relative flex flex-col gap-3">
            <Label htmlFor="model">Modello</Label>
            <Input
              id="model"
              type="text"
              value={formData.model}
              onChange={onFormChange}
              className="shadow-md rounded-lg border border-gray-100 w-60 px-4 py-2.5 appearance-none bg-transparent text-sm font-normal text-black"
            />
          </div>

          {/* Anno */}
          <div className="relative flex flex-col gap-3">
            <Label htmlFor="year">Anno</Label>
            <select
              id="year"
              value={
                formData.year !== null && formData.year !== undefined
                  ? formData.year.toString()
                  : ""
              } // Convert year to string for the select value
              onChange={(e) => {
                const selectedYear = Number(e.target.value); // Convert the selected value to a number
                setFormData({
                  ...formData,
                  year: selectedYear,
                });
              }}
              className="relative shadow-md rounded-lg border border-gray-100 w-60 px-4 py-2.5 appearance-none bg-transparent pr-8 text-sm font-normal text-black invalid:text-white"
            >
              <option value="" disabled>
                Select a year
              </option>
              {years.map((year) => (
                <option key={year} className="text-black" value={year}>
                  {year}
                </option>
              ))}
            </select>
            <div className="absolute top-12 left-52 transform -translate-y-1/2 pointer-events-none">
              <IoIosArrowDown className="w-4 h-4 text-red" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
