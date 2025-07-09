"use client";

import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
import { Input } from "@/components/ui/input";
import { VehicleFormData } from "@/types/vehiclStep";
import { useEffect } from "react";

interface PriceProps {
  formData: VehicleFormData;
  setFormData: React.Dispatch<React.SetStateAction<VehicleFormData>>;
}

const Price = ({ formData, setFormData }: PriceProps) => {
  const rentalTimes = [1, 9, 24]; // Using numbers directly

  // Initialize price array with all three entries if empty
  useEffect(() => {
    if (!formData.price || formData.price.length < 3) {
      setFormData((prev) => ({
        ...prev,
        price: [
          { rentalTime: 1, price: 0, kilometerPerHour: "" },
          { rentalTime: 9, price: 0, kilometerPerHour: "" },
          { rentalTime: 24, price: 0, kilometerPerHour: "" },
        ],
      }));
    }
  }, [formData.price, setFormData]);

  const handlePriceChange = (index: number, field: string, value: string) => {
    setFormData((prevData) => {
      // Ensure we always have 3 price entries
      const updatedPrice =
        prevData.price?.length === 3
          ? [...prevData.price]
          : [
              { rentalTime: 1, price: 0, kilometerPerHour: "" },
              { rentalTime: 9, price: 0, kilometerPerHour: "" },
              { rentalTime: 24, price: 0, kilometerPerHour: "" },
            ];

      // Convert empty string to 0 for price field
      const processedValue = field === "price" && value === "" ? "0" : value;

      // Update the specific field
      updatedPrice[index] = {
        ...updatedPrice[index],
        [field]:
          field === "price"
            ? parseFloat(processedValue) || 0
            : field === "kilometerPerHour" &&
              !/^\d*$/.test(value) &&
              value !== "Unlimited"
            ? updatedPrice[index].kilometerPerHour // Keep old value if invalid
            : value,
      };

      return { ...prevData, price: updatedPrice };
    });
  };

  const handleUnlimitedToggle = (index: number) => {
    setFormData((prevData) => {
      const updatedPrice = [...prevData.price];
      updatedPrice[index] = {
        ...updatedPrice[index],
        kilometerPerHour:
          updatedPrice[index].kilometerPerHour === "Unlimited"
            ? ""
            : "Unlimited",
      };
      return { ...prevData, price: updatedPrice };
    });
  };

  // Display empty string for 0 values, but keep 0 in the form data
  const displayValue = (value: number | string) => {
    return value === 0 ? "" : value;
  };

  return (
    <div>
      <VehicleInsertionHeader
        title="Prezzo"
        subtitle="Il prezzo per 24 ore è obbligatorio. Gli altri sono opzionali."
      />
      <div className="space-y-6">
        {rentalTimes.map((rentalTime, index) => (
          <div key={index} className="flex flex-wrap gap-10">
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

            {/* Price */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input
                  value={displayValue(formData.price[index]?.price ?? "")}
                  onChange={(e) =>
                    handlePriceChange(index, "price", e.target.value)
                  }
                  className="relative border shadow-md w-[175px] md:w-[210px] lg:w-[230px] xl:w-[260px] rounded-lg px-4 py-6"
                  required={index === 2} // 24h is required (index 2)
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
                  value={formData.price[index]?.kilometerPerHour ?? ""}
                  onChange={(e) =>
                    handlePriceChange(index, "kilometerPerHour", e.target.value)
                  }
                  className="relative border shadow-md w-[175px] md:w-[210px] lg:w-[230px] xl:w-[260px] rounded-lg px-4 py-6"
                  disabled={
                    formData.price[index]?.kilometerPerHour === "Unlimited"
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
                    formData.price[index]?.kilometerPerHour === "Unlimited"
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

export default Price;
