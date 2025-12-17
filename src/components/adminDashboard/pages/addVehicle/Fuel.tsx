import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
import { Label } from "@/components/ui/label";
import { VehicleFormData } from "@/types/vehiclStep";
import { IoIosArrowDown } from "react-icons/io";

interface FuelProps {
  formData: VehicleFormData;
  onFormChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

interface FuelProps {
  formData: VehicleFormData;
  onFormChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // Typing onFormChange
}

const Fuel = ({ formData, onFormChange }: FuelProps) => {
  return (
    <div className="space-y-10">
      <VehicleInsertionHeader title="Carburante" subtitle="Seleziona il tipo di carburante necessario per il tuo veicolo" />
      {/* Carburante */}
      <div className="relative flex flex-col gap-3">
        <Label htmlFor="fuelType">Carburante</Label>
        <select
          id="fuelType"
          value={formData.fuelType}
          onChange={onFormChange}
          className="relative shadow-md rounded-lg border border-gray-100 w-60 px-4 py-2.5 appearance-none bg-transparent pr-8 text-sm font-normal text-black invalid:text-white"
        >
          <option value="" disabled>
            Select Carburante Type
          </option>
          <option className="text-black" value="BENZINA">
            Benzina
          </option>
          <option className="text-black" value="DIESEL">
            Diesel
          </option>
          <option className="text-black" value="ELETTRICO">
            Elettrico
          </option>
          <option className="text-black" value="IBRIDO">
            Ibrido
          </option>
        </select>

        {/* Custom Dropdown Arrow */}
        <div className="absolute top-12 left-52 transform -translate-y-1/2 pointer-events-none">
          <IoIosArrowDown className="w-4 h-4 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default Fuel;
