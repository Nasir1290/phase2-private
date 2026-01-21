/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
// import { Input } from "@/components/ui/input";
// import { VehicleFormData } from "@/types/vehiclStep";

// interface PriceProps {
//   formData: VehicleFormData;
//   setFormData: React.Dispatch<React.SetStateAction<VehicleFormData>>;
// }

// const EditPrice = ({ formData, setFormData }: PriceProps) => {
//   const rentalTimes = ["1", "9", "24"]; // Rental time values

//   const handlePriceChange = (index: number, field: string, value: string) => {
//     setFormData((prevData) => {
//       // Create a deep copy of the price array or initialize if empty
//       const updatedPrice = prevData.price ? [...prevData.price] : [];

//       // Initialize the price object if it doesn't exist
//       if (!updatedPrice[index]) {
//         updatedPrice[index] = {
//           rentalTime: parseInt(rentalTimes[index]),
//           price: 0,
//           kilometerPerHour: "",
//         };
//       }

//       // Create a new object for the price entry to ensure state updates
//       const newPriceEntry = { ...updatedPrice[index] };

//       // Update the specific field with proper type conversion
//       if (field === "rentalTime") {
//         newPriceEntry.rentalTime = parseInt(value) || 0;
//       } else if (field === "price") {
//         newPriceEntry.price = parseFloat(value) || 0;
//       } else if (field === "kilometerPerHour") {
//         // Validate number input or allow "Unlimited"
//         if (value !== "Unlimited" && value !== "" && !/^\d*$/.test(value)) {
//           return prevData; // Don't update if invalid
//         }
//         newPriceEntry.kilometerPerHour = value;
//       }

//       // Update the price array
//       updatedPrice[index] = newPriceEntry;

//       // Return new state object
//       return {
//         ...prevData,
//         price: updatedPrice,
//       };
//     });
//   };

//   const handleUnlimitedToggle = (index: number) => {
//     setFormData((prevData) => {
//       const updatedPrice = prevData.price ? [...prevData.price] : [];

//       // Initialize if doesn't exist
//       if (!updatedPrice[index]) {
//         updatedPrice[index] = {
//           rentalTime: parseInt(rentalTimes[index]),
//           price: 0,
//           kilometerPerHour: "",
//         };
//       }

//       // Toggle between "Unlimited" and empty string
//       updatedPrice[index] = {
//         ...updatedPrice[index],
//         kilometerPerHour:
//           updatedPrice[index].kilometerPerHour === "Unlimited"
//             ? ""
//             : "Unlimited",
//       };

//       return {
//         ...prevData,
//         price: updatedPrice,
//       };
//     });
//   };

//   return (
//     <div>
//       <VehicleInsertionHeader
//         title="Prezzo"
//         subtitle="Il prezzo per 24 ore è obbligatorio. Gli altri sono opzionali."
//       />
//       <div className="space-y-6">
//         {rentalTimes.map((rentalTime, index) => (
//           <div key={`${rentalTime}-${index}`} className="flex flex-wrap gap-10">
//             {/* Rental Time */}
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <span className="z-10 absolute top-3 left-8 text-[15px] font-normal">
//                   {rentalTime}
//                 </span>
//                 <Input
//                   readOnly
//                   className="relative border shadow-md w-[175px] md:w-[210px] lg:w-[230px] xl:w-[260px] rounded-lg px-4 py-6"
//                 />
//                 <span className="absolute top-3 right-8 text-[15px] font-normal">
//                   ORA
//                 </span>
//               </div>
//             </div>

//             {/* Price - Only required for 24-hour rental */}
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <Input
//                   value={formData.price?.[index]?.price ?? ""}
//                   onChange={(e) =>
//                     handlePriceChange(index, "price", e.target.value)
//                   }
//                   className="relative border shadow-md w-[175px] md:w-[210px] lg:w-[230px] xl:w-[260px] rounded-lg px-4 py-6"
//                   required={rentalTime === "24"}
//                 />
//                 <span className="absolute top-3 right-8 text-[15px] font-normal">
//                   CHF
//                 </span>
//               </div>
//             </div>

//             {/* Kilometer per Hour */}
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <Input
//                   value={formData.price?.[index]?.kilometerPerHour ?? ""}
//                   onChange={(e) =>
//                     handlePriceChange(index, "kilometerPerHour", e.target.value)
//                   }
//                   className="relative border shadow-md w-[175px] md:w-[210px] lg:w-[230px] xl:w-[260px] rounded-lg px-4 py-6"
//                   disabled={
//                     formData.price?.[index]?.kilometerPerHour === "Unlimited"
//                   }
//                 />
//                 <span className="absolute top-3 right-8 text-[15px] font-normal">
//                   KM
//                 </span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={
//                     formData.price?.[index]?.kilometerPerHour === "Unlimited"
//                   }
//                   onChange={() => handleUnlimitedToggle(index)}
//                   className="w-4 h-4"
//                 />
//                 <span className="text-sm text-text_dark_gray/70">
//                   Km illimitati
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EditPrice;

"use client";

import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
import { Input } from "@/components/ui/input";
import { VehicleFormData } from "@/types/vehiclStep";
import { useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface PriceEntry {
  rentalTime: number;
  price: number;
  kilometerPerHour: string;
}

interface PriceProps {
  formData: VehicleFormData;
  setFormData: React.Dispatch<React.SetStateAction<VehicleFormData>>;
}

const EditPrice = ({ formData, setFormData }: PriceProps) => {
  const availableOptions = [
    { value: 1, label: "1 ORA" },
    { value: 9, label: "9 ORE" },
    { value: 24, label: "24 ORE" },
    { value: 168, label: "7 GIORNI" },
    { value: 720, label: "30 GIORNI" },
  ];
  console.log({ formData });
  // Helper to find a price entry by rentalTime
  const getPriceEntry = useCallback(
    (rentalTime: number): PriceEntry | undefined =>
      formData.price?.find((p: any) => p.rentalTime === rentalTime),
    [formData.price]
  );

  // Always ensure 24h exists (but only add it once if missing)
  const has24h = !!getPriceEntry(24);

  // Memoize sorted displayed prices (always include 24h even if empty)
  const displayedPrices = useMemo(() => {
    const prices = formData.price || [];

    // If 24 doesn't exist in data → show it with default/empty values
    if (!has24h) {
      return [{ rentalTime: 24, price: 0, kilometerPerHour: "" }, ...prices];
    }

    return [...prices].sort((a, b) => a.rentalTime - b.rentalTime);
  }, [formData.price, has24h]);

  // Available options user can still add
  const addableOptions = availableOptions.filter(
    (opt) => !displayedPrices.some((p) => p.rentalTime === opt.value)
  );

  const handleAddPricing = (valueStr: string) => {
    const rentalTime = parseInt(valueStr, 10);
    if (isNaN(rentalTime)) return;

    setFormData((prev) => ({
      ...prev,
      price: [
        ...(prev.price || []),
        { rentalTime, price: 0, kilometerPerHour: "" },
      ],
    }));
  };

  const handleRemovePricing = (rentalTime: number) => {
    if (rentalTime === 24) return; // never remove 24h

    setFormData((prev) => ({
      ...prev,
      price: (prev.price || []).filter((p: any) => p.rentalTime !== rentalTime),
    }));
  };

  const updatePriceField = (
    rentalTime: number,
    field: keyof PriceEntry,
    value: string | number
  ) => {
    setFormData((prev) => {
      const currentPrices = prev.price || [];

      // If this is the 24h entry and it doesn't exist yet → create it
      if (rentalTime === 24 && !has24h) {
        return {
          ...prev,
          price: [
            ...currentPrices,
            { rentalTime: 24, price: 0, kilometerPerHour: "" },
          ],
        };
      }

      const updated = currentPrices.map((p: any) =>
        p.rentalTime === rentalTime
          ? {
              ...p,
              [field]:
                field === "price"
                  ? Number(value) || 0
                  : field === "kilometerPerHour"
                  ? String(value)
                  : p[field],
            }
          : p
      );

      return { ...prev, price: updated };
    });
  };

  const toggleUnlimited = (rentalTime: number) => {
    setFormData((prev) => {
      const updated = (prev.price || []).map((p: any) =>
        p.rentalTime === rentalTime
          ? {
              ...p,
              kilometerPerHour:
                p.kilometerPerHour === "Unlimited" ? "" : "Unlimited",
            }
          : p
      );
      return { ...prev, price: updated };
    });
  };

  const getLabel = (rentalTime: number) => {
    const found = availableOptions.find((o) => o.value === rentalTime);
    return found ? found.label : `${rentalTime} ORE`;
  };

  return (
    <div>
      <VehicleInsertionHeader
        title="Prezzo"
        subtitle="Il prezzo per 24 ore è obbligatorio. Gli altri sono opzionali."
      />

      <div className="space-y-6 mt-6">
        {displayedPrices.map((entry) => {
          const is24h = entry.rentalTime === 24;
          const isUnlimited = entry.kilometerPerHour === "Unlimited";
          const label = getLabel(entry.rentalTime);

          return (
            <div
              key={entry.rentalTime}
              className="flex flex-wrap items-center gap-6 md:gap-10"
            >
              {/* Rental Time Display */}
              <div className="relative min-w-[160px] md:min-w-[200px]">
                <Input
                  readOnly
                  value=""
                  className="border shadow-md rounded-lg px-4 py-6 text-center"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-[15px] font-medium">{label}</span>
                </div>
              </div>

              {/* Price */}
              <div className="relative min-w-[160px] md:min-w-[200px]">
                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  value={entry.price || ""}
                  onChange={(e) =>
                    updatePriceField(entry.rentalTime, "price", e.target.value)
                  }
                  className="border shadow-md rounded-lg px-4 py-6 pr-12"
                  required={is24h}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium">
                  CHF
                </span>
              </div>

              {/* Kilometers */}
              <div className="relative min-w-[160px] md:min-w-[200px]">
                <Input
                  value={isUnlimited ? "" : entry.kilometerPerHour || ""}
                  onChange={(e) =>
                    !isUnlimited &&
                    updatePriceField(
                      entry.rentalTime,
                      "kilometerPerHour",
                      e.target.value
                    )
                  }
                  disabled={isUnlimited}
                  className="border shadow-md rounded-lg px-4 py-6 pr-12"
                  placeholder={isUnlimited ? "Illimitati" : ""}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium">
                  KM
                </span>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={`unlimited-${entry.rentalTime}`}
                  checked={isUnlimited}
                  onChange={() => toggleUnlimited(entry.rentalTime)}
                  className="h-4 w-4"
                />
                <label
                  htmlFor={`unlimited-${entry.rentalTime}`}
                  className="text-sm text-gray-700 cursor-pointer whitespace-nowrap"
                >
                  Km illimitati
                </label>
              </div>

              {!is24h && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemovePricing(entry.rentalTime)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {addableOptions.length > 0 && (
        <div className="mt-8">
          <Select onValueChange={handleAddPricing}>
            <SelectTrigger className="w-[260px]">
              <SelectValue placeholder="Aggiungi fascia di prezzo" />
            </SelectTrigger>
            <SelectContent>
              {addableOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value.toString()}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default EditPrice;
