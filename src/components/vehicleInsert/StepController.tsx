/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useDispatch, useSelector } from "react-redux";
import { BasicInfoStep } from "./steps/BasicInfo";
import { MediaStep } from "./steps/Media";
import { DetailsStep } from "./steps/Details";
import { RootState } from "@/redux/store";
import { setCurrentStep } from "@/redux/slice/vehicleInsertSlice";
import { FormStep } from "@/types/vehiclStep";
import { ReactNode, useEffect, useState } from "react";
import { PricingStep } from "./steps/Pricing";
import { ContactStep } from "./steps/Contact";
import { useCreateCarMutation } from "@/redux/api/carApi";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { resetFormData } from "@/redux/slice/vehicleInsertSlice";
import PublishStep from "./steps/PublishStep";

export function StepController() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [createCar] = useCreateCarMutation();
  const { data: getProfile } = useGetMyProfileQuery({});
  const userId = getProfile?.data?.id;
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentStep, formData } = useSelector((state: RootState) => state.form);

  const stepOrder: FormStep[] = ["basic", "media", "details", "pricing", "description", "publish"];

  // Get current step from URL query
  const getStepFromQuery = (): FormStep => {
    const stepFromQuery = searchParams.get("step") as FormStep;
    return stepOrder.includes(stepFromQuery) ? stepFromQuery : "basic";
  };

  // Sync Redux state with URL on mount and URL changes
  useEffect(() => {
    const stepFromQuery = getStepFromQuery();
    if (currentStep !== stepFromQuery) {
      dispatch(setCurrentStep(stepFromQuery));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const currentIndex = stepOrder.indexOf(currentStep);

  // Centralized validation logic
  const validateStep = (step: FormStep): string[] => {
    const errors: string[] = [];

    switch (step) {
      case "basic":
        if (!formData.category) errors.push("Category is required");
        if (!formData.brand) errors.push("Brand is required");
        if (!formData.model) errors.push("Model is required");
        if (!formData.year) errors.push("Year is required");
        if (!formData.transmission) errors.push("Transmission is required");
        if (!formData.color) errors.push("Color is required");
        if (!formData.kmh) errors.push("Mileage is required");
        if (!formData.engine) errors.push("Engine is required");
        if (!formData.maxSpeed) errors.push("Max speed is required");
        if (!formData.horsePower) errors.push("Horse power is required");
        if (!formData.seats) errors.push("Number of seats is required");
        if (!formData.fuelType) errors.push("Fuel type is required");
        if (!formData.isConfirmed) errors.push("Please confirm the vehicle details");
        break;

      case "media":
        if (!formData.mainImage) errors.push("Main image is required");
        break;

      case "details":
        const descriptionWordCount = (formData.description || "").trim().split(/\s+/).filter(Boolean).length;
        if (descriptionWordCount < 20) errors.push("Description must be at least 20 words");
        if (formData.deposite === undefined || formData.deposite === null) errors.push("Deposit amount is required");
        if (!formData.depositePolicy) errors.push("Deposit policy is required");
        if (!formData.fuelPolicy) errors.push("Fuel policy is required");
        if (!formData.mileagePolicy) errors.push("Mileage policy is required");
        if (!formData.damagePolicy) errors.push("Damage policy is required");
        break;

      case "pricing":
        if (!formData.price || !Array.isArray(formData.price)) {
          errors.push("Price information is required");
          break;
        }

        const nineHourEntry = formData.price.find((item) => item.rentalTime === 9);
        const twentyFourHourEntry = formData.price.find((item) => item.rentalTime === 24);
        const thirtyHourEntry = formData.price.find((item) => item.rentalTime === 30);
        if (!nineHourEntry || nineHourEntry.price <= 0) {
          errors.push("9-hour rental price is required");
        }
        if (!twentyFourHourEntry || twentyFourHourEntry.price <= 0) {
          errors.push("24-hour rental price is required");
        }
        if (!thirtyHourEntry || thirtyHourEntry.price <= 0) {
          errors.push("30-hour rental price is required");
        }

        formData.price.forEach((entry) => {
          if (entry.rentalTime !== 24 && entry.price > 0 && !entry.kilometerPerHour && entry.kilometerPerHour !== "Unlimited") {
            errors.push(`Kilometer limit is required for ${entry.rentalTime}h rental`);
          }
        });

        if (!formData.accessories) errors.push("Accessories information is required");
        break;

      case "description":
        if (!formData.advertiserName) errors.push("Advertiser name is required");
        if (!formData.phoneNumber) errors.push("Phone number is required");
        if (!formData.email) errors.push("Email is required");
        if (!formData.whatsapp) errors.push("WhatsApp number is required");
        if (!formData.location) errors.push("Location is required");
        if (!formData.authenticationFile) errors.push("Authentication file is required");
        break;
    }

    return errors;
  };

  const isStepComplete = (step: FormStep): boolean => {
    return validateStep(step).length === 0;
  };

  const isAllStepsComplete = (): boolean => {
    return stepOrder.slice(0, -1).every((step) => isStepComplete(step));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const steps: Record<FormStep, ReactNode> = {
    basic: <BasicInfoStep errors={errors} />,
    media: <MediaStep errors={errors} />,
    details: <DetailsStep errors={errors} />,
    pricing: <PricingStep errors={errors} />,
    description: <ContactStep errors={errors} />,
    publish: <PublishStep errors={errors} />,
  };

  const navigateToStep = (step: FormStep) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", step);
    router.replace(`?${params.toString()}`, { scroll: false });
    dispatch(setCurrentStep(step));
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep);

    if (stepErrors.length > 0) {
      setErrors(stepErrors);
      toast.error("Please fix the errors before proceeding");
      return;
    }

    setErrors([]);
    if (currentIndex < stepOrder.length - 1) {
      navigateToStep(stepOrder[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    setErrors([]);
    if (currentIndex > 0) {
      navigateToStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleSubmit = async () => {
    if (!isAllStepsComplete()) {
      const allErrors: string[] = [];
      stepOrder.forEach((step) => {
        const stepErrors = validateStep(step);
        allErrors.push(...stepErrors);
      });
      setErrors(allErrors);
      toast.error("Please complete all required fields");
      return;
    }

    if (isSubmitting) return;
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
      formData.otherImages.forEach((image) => {
        bodyData.append("otherImages", image);
      });
    }

    if (formData?.video) {
      bodyData.append("video", formData.video);
    }

    if (formData?.mainImage) {
      bodyData.append("mainImage", formData.mainImage);
    }

    if (formData?.authenticationFile) {
      bodyData.append("authenticationFile", formData.authenticationFile);
    }

    try {
      const res = await createCar(bodyData).unwrap();

      if (res.success === true) {
        toast.success("Car Created Successfully");
        router.push(`/inserted-vehicle/${res.data.id}`);
        dispatch(resetFormData());
      }
    } catch (error: any) {
      if (Array.isArray(error?.data?.errorMessages)) {
        error.data.errorMessages.forEach((msg: any) => {
          toast.error(`${msg?.path}: ${msg?.message}` || "Unknown error");
        });
      } else {
        toast.error(`${error?.path}: ${error?.message}` || "An error occurred");
      }
      console.error("Error submitting data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    dispatch(resetFormData());
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", "basic");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-6">
      {/* Error Display */}
      {errors.length > 0 && (
        <div className="p-4 bg-red-50 border border-primary-200 rounded-md">
          <h3 className="text-primary font-medium mb-2">Please fix the following errors:</h3>
          <ul className="list-disc list-inside text-primary space-y-1">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Current Step */}
      {steps[currentStep]}

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-6 mt-6">
        {currentIndex > 0 && (
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrevious}
              className="w-[140px] py-1.5 rounded text-[15px] shadow shadow-black/10 border border-gray-200/20 font-medium"
            >
              Indietro
            </button>
            <button
              onClick={handleReset}
              className="w-[140px] py-1.5 rounded text-[15px] shadow shadow-black/10 border border-gray-200/20 font-medium"
            >
              reset
            </button>
          </div>
        )}

        {currentIndex < stepOrder.length - 1 ? (
          <button onClick={handleNext} className="w-[140px] py-1.5 rounded text-[15px] font-medium bg-primary text-white">
            Avanti
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-[140px] py-1.5 rounded text-[15px] font-medium ${
              isSubmitting ? "bg-gray-300 text-white cursor-not-allowed" : "bg-primary text-white cursor-pointer"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2 ml-3">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
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
