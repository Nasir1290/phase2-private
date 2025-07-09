"use client";

import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
import { Input } from "@/components/ui/input";
import { VehicleFormData } from "@/types/vehiclStep";

interface PriceProps {
  formData: VehicleFormData;
  setFormData: React.Dispatch<React.SetStateAction<VehicleFormData>>;
}

const EditPrice = ({ formData, setFormData }: PriceProps) => {
  const rentalTimes = ["1", "9", "24"]; // Rental time values

  const handlePriceChange = (index: number, field: string, value: string) => {
    setFormData((prevData) => {
      // Create a deep copy of the price array or initialize if empty
      const updatedPrice = prevData.price ? [...prevData.price] : [];

      // Initialize the price object if it doesn't exist
      if (!updatedPrice[index]) {
        updatedPrice[index] = {
          rentalTime: parseInt(rentalTimes[index]),
          price: 0,
          kilometerPerHour: "",
        };
      }

      // Create a new object for the price entry to ensure state updates
      const newPriceEntry = { ...updatedPrice[index] };

      // Update the specific field with proper type conversion
      if (field === "rentalTime") {
        newPriceEntry.rentalTime = parseInt(value) || 0;
      } else if (field === "price") {
        newPriceEntry.price = parseFloat(value) || 0;
      } else if (field === "kilometerPerHour") {
        // Validate number input or allow "Unlimited"
        if (value !== "Unlimited" && value !== "" && !/^\d*$/.test(value)) {
          return prevData; // Don't update if invalid
        }
        newPriceEntry.kilometerPerHour = value;
      }

      // Update the price array
      updatedPrice[index] = newPriceEntry;

      // Return new state object
      return {
        ...prevData,
        price: updatedPrice,
      };
    });
  };

  const handleUnlimitedToggle = (index: number) => {
    setFormData((prevData) => {
      const updatedPrice = prevData.price ? [...prevData.price] : [];

      // Initialize if doesn't exist
      if (!updatedPrice[index]) {
        updatedPrice[index] = {
          rentalTime: parseInt(rentalTimes[index]),
          price: 0,
          kilometerPerHour: "",
        };
      }

      // Toggle between "Unlimited" and empty string
      updatedPrice[index] = {
        ...updatedPrice[index],
        kilometerPerHour:
          updatedPrice[index].kilometerPerHour === "Unlimited"
            ? ""
            : "Unlimited",
      };

      return {
        ...prevData,
        price: updatedPrice,
      };
    });
  };

  return (
    <div>
      <VehicleInsertionHeader
        title="Prezzo"
        subtitle="Il prezzo per 24 ore è obbligatorio. Gli altri sono opzionali."
      />
      <div className="space-y-6">
        {rentalTimes.map((rentalTime, index) => (
          <div key={`${rentalTime}-${index}`} className="flex flex-wrap gap-10">
            {/* Rental Time */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <span className="z-10 absolute top-3 left-8 text-[15px] font-normal">
                  {rentalTime}
                </span>
                <Input
                  readOnly
                  className="relative border shadow-md w-[175px] md:w-[210px] lg:w-[230px] xl:w-[260px] rounded-lg px-4 py-6"
                />
                <span className="absolute top-3 right-8 text-[15px] font-normal">
                  ORA
                </span>
              </div>
            </div>

            {/* Price - Only required for 24-hour rental */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input
                  value={formData.price?.[index]?.price ?? ""}
                  onChange={(e) =>
                    handlePriceChange(index, "price", e.target.value)
                  }
                  className="relative border shadow-md w-[175px] md:w-[210px] lg:w-[230px] xl:w-[260px] rounded-lg px-4 py-6"
                  required={rentalTime === "24"}
                />
                <span className="absolute top-3 right-8 text-[15px] font-normal">
                  CHF
                </span>
              </div>
            </div>

            {/* Kilometer per Hour */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input
                  value={formData.price?.[index]?.kilometerPerHour ?? ""}
                  onChange={(e) =>
                    handlePriceChange(index, "kilometerPerHour", e.target.value)
                  }
                  className="relative border shadow-md w-[175px] md:w-[210px] lg:w-[230px] xl:w-[260px] rounded-lg px-4 py-6"
                  disabled={
                    formData.price?.[index]?.kilometerPerHour === "Unlimited"
                  }
                />
                <span className="absolute top-3 right-8 text-[15px] font-normal">
                  KM
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={
                    formData.price?.[index]?.kilometerPerHour === "Unlimited"
                  }
                  onChange={() => handleUnlimitedToggle(index)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-text_dark_gray/70">
                  Km illimitati
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditPrice;
