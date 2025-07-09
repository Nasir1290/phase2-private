/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateFormData } from "@/redux/slice/vehicleInsertSlice";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
import { useEffect, useState } from "react";
import { availableAccessories } from "@/components/adminDashboard/pages/addVehicle/Accessori";

interface PriceStepProps {
  errors: string[];
}



type Accessory = (typeof availableAccessories)[number];

export function PricingStep({ errors }: PriceStepProps) {
  const dispatch = useDispatch();
  const hasError = (fieldName: string) => errors.includes(fieldName);
  const { formData } = useSelector((state: RootState) => state.form);
  const [touchedFields, setTouchedFields] = useState<{
    [rentalTime: number]: boolean;
  }>({});

  // Initialize form data if empty
  useEffect(() => {
    if (!formData.price || formData.price.length === 0) {
      dispatch(
        updateFormData({
          price: [
            { rentalTime: 1, price: 0, kilometerPerHour: "" },
            { rentalTime: 9, price: 0, kilometerPerHour: "" },
            { rentalTime: 24, price: 0, kilometerPerHour: "" },
          ],
        })
      );
    }
  }, [dispatch, formData.price]);

  // Initialize touched fields based on existing data
  useEffect(() => {
    if (formData.price) {
      const initialTouched = formData.price.reduce((acc: any, item: any) => {
        if (item.price > 0 || item.kilometerPerHour) {
          acc[item.rentalTime] = true;
        }
        return acc;
      }, {} as { [key: number]: boolean });
      setTouchedFields(initialTouched);
    }
  }, [formData.price]);

  const shouldShowError = (rentalTime: number, field: "price" | "km") => {
    const fieldKey =
      field === "price" ? `${rentalTime}_price` : `${rentalTime}_km`;

    return (
      (touchedFields[rentalTime] &&
        ((rentalTime === 24 &&
          ((field === "price" &&
            formData.price?.find((p: any) => p.rentalTime === rentalTime)
              ?.price <= 0) ||
            (field === "km" &&
              !formData.price?.find((p: any) => p.rentalTime === rentalTime)
                ?.kilometerPerHour &&
              formData.price?.find((p: any) => p.rentalTime === rentalTime)
                ?.kilometerPerHour !== "Unlimited"))) ||
          (rentalTime !== 24 &&
            formData.price?.find((p: any) => p.rentalTime === rentalTime)
              ?.price > 0 &&
            !formData.price?.find((p: any) => p.rentalTime === rentalTime)
              ?.kilometerPerHour &&
            formData.price?.find((p: any) => p.rentalTime === rentalTime)
              ?.kilometerPerHour !== "Unlimited"))) ||
      hasError(fieldKey)
    );
  };

  const handleAccessoryChange = (accessory: Accessory) => {
    const currentAccessories = formData.accessories || [];
    const updatedAccessories = currentAccessories.includes(accessory)
      ? currentAccessories.filter((item: any) => item !== accessory)
      : [...currentAccessories, accessory];
    dispatch(updateFormData({ accessories: updatedAccessories }));
  };

  const handleInputChange = (field: string, value: string) => {
    const [rentalTimeStr, fieldName] = field.split("_");
    const rentalTime = parseInt(rentalTimeStr);

    // Update touched state
    setTouchedFields((prev) => ({ ...prev, [rentalTime]: true }));

    const updatedPriceData = (formData.price || []).map((item: any) => {
      if (item.rentalTime === rentalTime) {
        const updatedItem = { ...item };

        if (fieldName === "kilometerPerHour") {
          updatedItem.kilometerPerHour =
            value === "Unlimited" ? "Unlimited" : value.replace(/[^0-9]/g, "");
        } else if (fieldName === "price") {
          updatedItem.price =
            value === "" ? 0 : parseFloat(value.replace(/[^0-9.]/g, ""));
        }

        return updatedItem;
      }
      return item;
    });

    dispatch(updateFormData({ price: updatedPriceData }));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: string
  ) => {
    if (field.includes("kilometerPerHour") || field.includes("price")) {
      // Allow: backspace, delete, tab, escape, enter
      if (
        [46, 8, 9, 27, 13].includes(e.keyCode) ||
        // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.ctrlKey && [65, 67, 86, 88].includes(e.keyCode))
      ) {
        return;
      }
      // Allow only numbers
      if (
        !(
          (e.keyCode >= 48 && e.keyCode <= 57) ||
          (e.keyCode >= 96 && e.keyCode <= 105)
        )
      ) {
        e.preventDefault();
      }
    }
  };

  const handleUnlimitedKmToggle = (rentalTime: number) => {
    const updatedPriceData = (formData.price || []).map((item: any) => {
      if (item.rentalTime === rentalTime) {
        return {
          ...item,
          kilometerPerHour:
            item.kilometerPerHour === "Unlimited" ? "" : "Unlimited",
        };
      }
      return item;
    });

    // Mark the field as touched when toggling unlimited km
    setTouchedFields((prev) => ({ ...prev, [rentalTime]: true }));
    dispatch(updateFormData({ price: updatedPriceData }));
  };

  return (
    <div className="space-y-6">
      {/* Price Section */}
      <div>
        <VehicleInsertionHeader
          title="Prezzo"
          subtitle="Gestisci il prezzo e i chilometri inclusi, compila almeno una riga"
        />

        <div className="space-y-6">
          {formData.price?.map((entry: any) => (
            <div
              key={entry.rentalTime}
              className="flex flex-wrap gap-10 items-center"
            >
              {/* Rental Time (readonly) */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Input
                    type="number"
                    value={entry.rentalTime}
                    readOnly
                    className="relative border shadow-md w-[260px] rounded-lg px-4 py-6 border-black/5"
                  />
                  <span className="absolute top-3 right-8 text-[15px] font-normal">
                    {entry.rentalTime === 1 ? "ORA" : "ORE"}
                  </span>
                </div>
              </div>

              {/* Price Input */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Input
                    required={entry.rentalTime === 24}
                    type="text"
                    value={entry.price === 0 ? "" : entry.price}
                    onChange={(e) =>
                      handleInputChange(
                        `${entry.rentalTime}_price`,
                        e.target.value
                      )
                    }
                    onKeyDown={(e) => handleKeyDown(e, "price")}
                    className={`relative border shadow-md w-[260px] rounded-lg px-4 py-6 ${
                      shouldShowError(entry.rentalTime, "price")
                        ? "border-red"
                        : "border-black/5"
                    }`}
                    inputMode="numeric"
                  />
                  <span className="absolute top-3 right-8 text-[15px] font-normal">
                    CHF
                  </span>
                </div>
              </div>

              {/* Kilometer Input */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Input
                    required={entry.rentalTime === 24 || entry.price > 0}
                    type="text"
                    value={entry.kilometerPerHour}
                    onChange={(e) =>
                      handleInputChange(
                        `${entry.rentalTime}_kilometerPerHour`,
                        e.target.value
                      )
                    }
                    onKeyDown={(e) => handleKeyDown(e, "kilometerPerHour")}
                    className={`relative border shadow-md w-[260px] rounded-lg px-4 py-6 ${
                      shouldShowError(entry.rentalTime, "km")
                        ? "border-red"
                        : "border-black/5"
                    }`}
                    disabled={entry.kilometerPerHour === "Unlimited"}
                    inputMode="numeric"
                  />
                  <span className="absolute top-3 right-8 text-[15px] font-normal">
                    KM
                  </span>
                  {shouldShowError(entry.rentalTime, "km") && (
                    <p className="text-red text-xs mt-1">
                      {entry.rentalTime === 24
                        ? "24-hour rental requires both price and kilometers"
                        : "Please enter kilometers or select Unlimited"}
                    </p>
                  )}
                </div>
              </div>

              {/* Unlimited KM Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`unlimitedKm_${entry.rentalTime}`}
                  checked={entry.kilometerPerHour === "Unlimited"}
                  onChange={() => handleUnlimitedKmToggle(entry.rentalTime)}
                  className="hidden"
                />
                <div
                  className={`checkbox-custom h-4 w-4 border-2 border-black/70 relative rounded-[3px] ${
                    entry.kilometerPerHour === "Unlimited" ? "bg-white" : ""
                  }`}
                  onClick={() => handleUnlimitedKmToggle(entry.rentalTime)}
                >
                  {entry.kilometerPerHour === "Unlimited" && (
                    <div className="absolute top-0.5 bottom-0.5 left-0.5 right-0.5 w-2 h-2 bg-red" />
                  )}
                </div>
                <label
                  htmlFor={`unlimitedKm_${entry.rentalTime}`}
                  className="text-sm font-medium cursor-pointer"
                >
                  Km illimitati
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Separator className="my-20" />
      </div>

      {/* Accessories Section */}
      <div>
        <VehicleInsertionHeader
          title="Accessori"
          subtitle="Seleziona gli accessori disponibili nel tuo veicolo dall'elenco"
        />

        <p className="text-sm font-normal text-text_light_gray pt-6 pb-4">
          {formData.accessories?.length || 0}/{availableAccessories.length}{" "}
          Selezionati
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {availableAccessories.map((accessory) => (
            <div key={accessory} className="flex items-center space-x-4">
              <div
                className={`${
                  hasError("accessories") && !formData.accessories
                    ? "border-red"
                    : "border-black/5"
                } flex items-center space-x-2 bg-white border border-gray-100 shadow-md w-[260px] rounded-lg px-4 py-4 ${
                  formData.accessories?.includes(accessory)
                    ? "shadow-sm shadow-red/30"
                    : ""
                }`}
                onClick={() => handleAccessoryChange(accessory)}
              >
                <input
                  type="checkbox"
                  checked={formData.accessories?.includes(accessory) || false}
                  readOnly
                  className="hidden"
                />
                <div
                  className={`checkbox-custom h-4 w-4 border-2 border-black/70 relative rounded-[3px] ${
                    formData.accessories?.includes(accessory) ? "bg-white" : ""
                  }`}
                >
                  {formData.accessories?.includes(accessory) && (
                    <div className="absolute top-0.5 bottom-0.5 left-0.5 right-0.5 w-2 h-2 bg-red" />
                  )}
                </div>
                <p className="text-sm font-normal cursor-pointer">
                  {accessory}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Separator className="my-20" />
      </div>
    </div>
  );
}
