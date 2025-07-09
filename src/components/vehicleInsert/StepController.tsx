/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useDispatch, useSelector } from "react-redux";
import { BasicInfoStep } from "./steps/BasicInfo";
import { MediaStep } from "./steps/Media";
import { DetailsStep } from "./steps/Details";
import { RootState } from "@/redux/store";
import { setCurrentStep } from "@/redux/slice/vehicleInsertSlice";
import { FormStep } from "@/types/vehiclStep";
import { ReactNode, useEffect, useState, useCallback } from "react";
import { PricingStep } from "./steps/Pricing";
import { ContactStep } from "./steps/Contact";
import { useCreateCarMutation } from "@/redux/api/carApi";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { resetFormData } from "@/redux/slice/vehicleInsertSlice";

type StepFieldErrors = {
  [key in FormStep]?: string[];
};

export function StepController() {
  const dispatch = useDispatch();
  const [createCar] = useCreateCarMutation();
  const { data: getProfile } = useGetMyProfileQuery({});
  const userId = getProfile?.data?.id;
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [fieldErrors, setFieldErrors] = useState<StepFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { currentStep, formData } = useSelector(
    (state: RootState) => state.form
  );
  const stepOrder: FormStep[] = [
    "basic",
    "media",
    "details",
    "pricing",
    "description",
  ];

  const currentIndex = stepOrder.indexOf(currentStep);

  const isStepComplete = useCallback(
    (step: FormStep): boolean => {
      switch (step) {
        case "basic":
          return (
            !!formData.category &&
            !!formData.brand &&
            !!formData.model &&
            !!formData.year &&
            !!formData.transmission &&
            !!formData.color &&
            !!formData.kmh &&
            !!formData.engine &&
            !!formData.maxSpeed &&
            !!formData.horsePower &&
            !!formData.seats &&
            !!formData.fuelType &&
            !!formData.isConfirmed
          );
        case "media":
          return !!formData.mainImage;
        case "details":
          const descriptionWordCount = (formData.description || "")
            .trim()
            .split(/\s+/)
            .filter(Boolean).length;
          return (
            descriptionWordCount >= 20 &&
            formData.deposite !== undefined && // Changed this line
            formData.deposite !== null &&
            !!formData.depositePolicy &&
            !!formData.fuelPolicy &&
            !!formData.mileagePolicy &&
            !!formData.damagePolicy
          );
        case "pricing":
          const hasValid24HourPrice = formData.price?.some(
            (item: any) =>
              item.rentalTime === 24 &&
              item.price > 0 &&
              (item.kilometerPerHour || item.kilometerPerHour === "Unlimited")
          );
          const allPriceKmPairsValid = !formData.price?.some(
            (item: any) =>
              item.price > 0 &&
              !item.kilometerPerHour &&
              item.kilometerPerHour !== "Unlimited"
          );

          return (
            hasValid24HourPrice &&
            allPriceKmPairsValid &&
            !!formData.accessories
          );

        case "description":
          return (
            !!formData.advertiserName &&
            !!formData.phoneNumber &&
            !!formData.email &&
            !!formData.whatsapp &&
            !!formData.location &&
            !!formData.authenticationFile
          );
        default:
          return false;
      }
    },
    [formData]
  );

  const isAllStepsComplete = useCallback(() => {
    return stepOrder.every((step) => isStepComplete(step));
  }, [stepOrder, isStepComplete]);

  useEffect(() => {
    // Reset the step to "basic" when the component mounts
    dispatch(setCurrentStep("basic"));
  }, [dispatch]);

  const steps: Record<FormStep, ReactNode> = {
    basic: <BasicInfoStep errors={fieldErrors.basic || []} />,
    media: <MediaStep errors={fieldErrors.media || []} />,
    details: <DetailsStep errors={fieldErrors.details || []} />,
    pricing: <PricingStep errors={fieldErrors.pricing || []} />,
    description: <ContactStep errors={fieldErrors.description || []} />,
  };

  const getBasicStepErrors = useCallback((): string[] => {
    const errors: string[] = [];
    if (!formData.category) errors.push("category");
    if (!formData.brand) errors.push("brand");
    if (!formData.model) errors.push("model");
    if (!formData.year) errors.push("year");
    if (!formData.transmission) errors.push("transmission");
    if (!formData.color) errors.push("color");
    if (!formData.kmh) errors.push("kmh");
    if (!formData.engine) errors.push("engine");
    if (!formData.maxSpeed) errors.push("maxSpeed");
    if (!formData.horsePower) errors.push("horsePower");
    if (!formData.seats) errors.push("seats");
    if (!formData.fuelType) errors.push("fuelType");
    // Add checks for all required basic fields...
    return errors;
  }, [formData]);
  const getDetailsStepErrors = useCallback((): string[] => {
    const errors: string[] = [];
    if (!formData.description) errors.push("description");
    if (formData.deposite === undefined || formData.deposite === null)
      errors.push("deposite");
    if (!formData.depositePolicy) errors.push("depositePolicy");
    if (!formData.fuelPolicy) errors.push("fuelPolicy");
    if (!formData.mileagePolicy) errors.push("mileagePolicy");
    if (!formData.damagePolicy) errors.push("damagePolicy");

    // Add checks for all required basic fields...
    return errors;
  }, [formData]);
  // Update the getPricingStepErrors function in StepController
  const getPricingStepErrors = useCallback((): string[] => {
    const errors: string[] = [];

    // Check if price array exists and has at least one entry
    if (!formData.price || !Array.isArray(formData.price)) {
      errors.push("price");
      return errors;
    }

    // Find the 24-hour entry
    const twentyFourHourEntry = formData.price.find(
      (item) => item.rentalTime === 24
    );

    // Validate 24-hour entry
    if (
      !twentyFourHourEntry ||
      twentyFourHourEntry.price <= 0 ||
      (!twentyFourHourEntry.kilometerPerHour &&
        twentyFourHourEntry.kilometerPerHour !== "Unlimited")
    ) {
      errors.push("24hourPrice");
      errors.push("24hourKm");
    }

    // Validate other price entries (if they have price, they must have km)
    formData.price.forEach((entry) => {
      if (
        entry.rentalTime !== 24 &&
        entry.price > 0 &&
        !entry.kilometerPerHour &&
        entry.kilometerPerHour !== "Unlimited"
      ) {
        errors.push(`price_${entry.rentalTime}`);
        errors.push(`km_${entry.rentalTime}`);
      }
    });

    if (!formData.accessories) {
      errors.push("accessories");
    }

    return errors;
  }, [formData.price, formData.accessories]);
  const getDescriptionStepErrors = useCallback((): string[] => {
    const errors: string[] = [];
    if (!formData.advertiserName) errors.push("advertiserName");
    if (!formData.phoneNumber) errors.push("phoneNumber");
    if (!formData.email) errors.push("email");
    if (!formData.whatsapp) errors.push("whatsapp");
    if (!formData.location) errors.push("location");
    if (!formData.authenticationFile) errors.push("authenticationFile");

    // Add checks for all required basic fields...
    return errors;
  }, [formData]);

  const validateCurrentStep = useCallback((): string[] => {
    switch (currentStep) {
      case "basic":
        return getBasicStepErrors();
      case "media":
        return !formData.mainImage ? ["mainImage"] : [];
      case "details":
        return getDetailsStepErrors();
      case "pricing":
        return getPricingStepErrors();
      case "description":
        return getDescriptionStepErrors();
      // Add validation for other steps...
      default:
        return [];
    }
  }, [
    currentStep,
    formData,
    getBasicStepErrors,
    formData.mainImage,
    getDetailsStepErrors,
    getPricingStepErrors,
    getDescriptionStepErrors,
  ]);

  // Handle error state only when trying to go to the next step
  const handleNext = () => {
    const stepErrors = validateCurrentStep();
    if (stepErrors.length > 0) {
      setFieldErrors((prev) => ({
        ...prev,
        [currentStep]: stepErrors,
      }));
      toast.error("Please fill all required fields before proceeding...");
      return;
    }

    const stepIsValid = isStepComplete(currentStep);

    if (!stepIsValid) {
      // Set error message based on current step
      let errorMessage = "";
      switch (currentStep) {
        case "basic":
          errorMessage = "Please fill in all basic fields before proceeding.";
          break;
        case "media":
          errorMessage = "Main image is required.";
          break;
        case "details":
          errorMessage = "Please fill in all details fields before proceeding.";
          break;
        case "pricing":
          errorMessage = "Price and accessories are required.";
          break;
        case "description":
          errorMessage = "Please fill in all contact fields.";
          break;
        default:
          break;
      }

      setErrors((prev) => ({
        ...prev,
        [currentStep]: errorMessage,
      }));
    } else {
      // Proceed to next step if valid
      if (currentIndex < stepOrder.length - 1) {
        dispatch(setCurrentStep(stepOrder[currentIndex + 1]));
        setErrors({});
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      dispatch(setCurrentStep(stepOrder[currentIndex - 1]));
    }
  };
  // Scroll to the top when the current step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const handleSubmit = async () => {
    if (!isAllStepsComplete()) {
      toast.error("Please complete all steps before submitting");
      return;
    }

    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);

    const bodyData = new FormData();

    const data = {
      ownerId: userId,
      category: formData?.category,
      brand: formData?.brand,
      model: formData?.model,
      year: formData?.year,
      transmission: formData?.transmission,
      color: formData?.color,
      kmh: formData?.kmh,
      engine: formData?.engine,
      maxSpeed: formData?.maxSpeed,
      horsePower: formData?.horsePower,
      seats: formData?.seats,
      fuelType: formData?.fuelType,
      description: formData?.description,
      deposite: formData?.deposite,
      depositePolicy: formData?.depositePolicy,
      fuelPolicy: formData?.fuelPolicy,
      mileagePolicy: formData?.mileagePolicy,
      damagePolicy: formData?.damagePolicy,
      accessories: formData?.accessories,
      price: formData?.price,
      advertiserName: formData?.advertiserName,
      phoneNumber: formData?.phoneNumber,
      email: formData?.email,
      whatsapp: formData?.whatsapp,
      location: formData?.location,
      latitude: formData?.latitude,
      longitude: formData?.longitude,
    };
    bodyData.append("bodyData", JSON.stringify(data));

    if (formData?.otherImages) {
      formData?.otherImages.forEach((image) => {
        bodyData.append("otherImages", image);
      });
    }

    if (formData?.video) {
      bodyData.append("video", formData?.video);
    }

    if (formData?.mainImage) {
      bodyData.append("mainImage", formData?.mainImage);
    }

    if (formData?.authenticationFile) {
      bodyData.append("authenticationFile", formData?.authenticationFile);
    }

    try {
      const res = await createCar(bodyData).unwrap();

      if (res.success === true) {
        toast.success("Car Created Successfully");
        // toast.success(res.message);
        router.push(`/inserted-vehicle/${res.data.id}`);

        // Reset the form data after successful submission
        dispatch(resetFormData());
      }
    } catch (error: any) {

      // Check if errorMessages exists and is an array
      if (Array.isArray(error?.data?.errorMessages)) {
        // Display each error message as a separate toast
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error?.data?.errorMessages.forEach((msg: any) => {
          toast.success(msg?.path + ": " + msg?.message || "Unknown error"); // Display the message from each error object
        });
      } else {
        // If errorMessages is not available, display the overall message
        toast.success(error?.path + ": " + error?.message || "Unknown error");
      }

      console.error("Error submitting data:", error); // Log the full error
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="space-y-6">
      {/* Display error message if any required fields are missing */}
      {Object.keys(errors).length > 0 && (
        <div className="p-4 bg-red text-white text-center">
          <p>{errors[currentStep]}</p>
        </div>
      )}

      {/* Display the current step */}
      {steps[currentStep]}

      {/* Navigation buttons */}
      <div className="flex justify-end gap-6 mt-6">
        {currentIndex > 0 && (
          <button
            onClick={handlePrevious}
            className="w-[140px] py-1.5 rounded text-[15px] shadow shadow-black/10 border border-gray-200/20 font-medium"
          >
            Indietro
          </button>
        )}

        {currentIndex < stepOrder.length - 1 ? (
          <button
            onClick={handleNext}
            // disabled={!isStepComplete(currentStep)}
            className={`w-[140px] py-1.5 rounded text-[15px] font-medium ${
              isStepComplete(currentStep)
                ? "bg-red text-white"
                : "bg-gray-300 text-white"
            }`}
          >
            Avanti
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!isAllStepsComplete() || isSubmitting}
            className={`w-[140px] py-1.5 rounded text-[15px] font-medium ${
              isAllStepsComplete() && !isSubmitting
                ? "bg-red text-white cursor-pointer"
                : "bg-gray-300 text-white cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2 ml-3">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>{" "}
                Publishing...
              </div>
            ) : (
              "Pubblica"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
