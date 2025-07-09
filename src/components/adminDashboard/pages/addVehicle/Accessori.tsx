import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
import { VehicleFormData } from "@/types/vehiclStep";
import { useState } from "react";

interface AccessoriProps {
  formData: VehicleFormData;
  onFormChange: (name: string, value: string[]) => void;
}

export const availableAccessories = [
  "Animali benvenuti",
  "Self check-in",
  "Portapacchi",
  "USB",
  "Sensore angolo cieco",
  "Aria condizionata",
  "Navigatore",
  "Vetri riscaldabili",
  "Gancio di traino",
  "Cruise control",
  "Bluetoooth",
  "Sedili termici",
  "4x4",
  "Telecamera a 360°",
  "Assistenza alla guida",
  "Volante riscaldato",
  "Telecamera posteriore",
  "Fari xeno",
  "Sensori di parcheggio",
  "Tetto panoramico",
];

const Accessori = ({ formData, onFormChange }: AccessoriProps) => {
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>(
    formData.accessories || []
  );

  // Handle accessory selection or deselection
  const handleAccessoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;
    const updatedAccessories = checked
      ? [...selectedAccessories, value] // Add to selected
      : selectedAccessories.filter((item) => item !== value);

    setSelectedAccessories(updatedAccessories);

    onFormChange("accessories", updatedAccessories);
  };

  return (
    <div>
      <VehicleInsertionHeader
        title="Accessori"
        subtitle="Seleziona gli accessori disponibili nel tuo veicolo dall'elenco"
      />
      <p className="text-sm font-normal text-gray-500 pt-6 pb-4">
        {selectedAccessories.length}/{availableAccessories.length} Selezionati
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {availableAccessories.map((accessory) => (
          <div key={accessory} className="flex items-center space-x-4">
            <label
              className={`flex items-center space-x-2 bg-white border border-gray-100 shadow-md w-[260px] rounded-lg px-4 py-4 cursor-pointer transition ${
                selectedAccessories.includes(accessory) ? "bg-red" : ""
              }`}
            >
              <input
                type="checkbox"
                id={accessory}
                value={accessory}
                checked={selectedAccessories.includes(accessory)}
                onChange={handleAccessoryChange}
                className="hidden"
              />
              <div
                className={`checkbox-custom h-4 w-4 border-2 border-black/70 relative rounded-sm ${
                  selectedAccessories.includes(accessory) ? "bg-red" : ""
                }`}
                role="checkbox"
                aria-checked={selectedAccessories.includes(accessory)}
              ></div>
              <p className="text-sm font-normal">{accessory}</p>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accessori;
