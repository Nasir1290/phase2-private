"use client";

import { cn } from "@/lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setCurrentStep } from "@/redux/slice/vehicleInsertSlice";
import { FormStep } from "@/types/vehiclStep";
import { useRouter, useSearchParams } from "next/navigation";

const steps = [
  { id: "basic", label: "Registrazione" },
  { id: "media", label: "Immagini" },
  { id: "details", label: "Descrizione" },
  { id: "pricing", label: "Prezzo" },
  { id: "description", label: "Contatto" },
   { id: "publish", label: "Pubblica" },
];

export function ProgressSteps() {
  const router = useRouter();
    const searchParams = useSearchParams();
  const { currentStep, formData } = useSelector(
    (state: RootState) => state.form
  );
  const dispatch = useDispatch();

  const isStepComplete = (step: string) => {
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
        // return !!formData.mainImage;
        return !!formData.mainImage;

      // && !!formData.otherImages;
      case "details":
        const descriptionWordCount = (formData.description || "")
          .trim()
          .split(/\s+/)
          .filter(Boolean).length;
        return (
          descriptionWordCount >= 20 &&
          !!formData.deposite &&
          !!formData.depositePolicy &&
          !!formData.fuelPolicy &&
          !!formData.mileagePolicy &&
          !!formData.damagePolicy
        );
      case "pricing":
        return !!formData.price && !!formData.accessories;
      case "description":
        return true
        case "publish":
        return true
      default:
        return false;
    }
  };

  // Allow navigation to a step if all previous steps are complete.
  const canNavigateToStep = (index: number) => {
    if (index === 0) return true;
    for (let i = 0; i < index; i++) {
      console.log("canNavigateToStep", steps[i].id, );
      if (!isStepComplete(steps[i].id)) {
        return false;
      }
    }
    return true;
  };

  const handleStepClick = (stepId: string, index: number) => {
    console.log(stepId, index , canNavigateToStep(index));
    if (canNavigateToStep(index)) {
      dispatch(setCurrentStep(stepId as FormStep));

       const params = new URLSearchParams(searchParams.toString());
      params.set("step",  stepId);
      router.replace(`?${params.toString()}`, { scroll: false });
      dispatch(setCurrentStep(stepId as FormStep));
    }
  };
    // const navigateToStep = (step: FormStep) => {
    //   const params = new URLSearchParams(searchParams.toString());
    //   params.set("step", step);
    //   router.replace(`?${params.toString()}`, { scroll: false });
    //   dispatch(setCurrentStep(step));
    // };

  return (
    <div className="flex items-center justify-between mb-20 mx-auto relative">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="flex items-center relative cursor-pointer"
          onClick={() => handleStepClick(step.id, index)}
        >
          {/* Connector Line */}
          {index > 0 && (
            <div
              className={cn(
                "absolute right-[90%] lg:right-[100%] top-4 lg:top-1/2 w-1/2 md:w-full h-[2px] z-0",
                "bg-gray-200"
              )}
            />
          )}

          {/* Step Circle and Label */}
          <div className="flex flex-col lg:flex-row  items-center gap-3 relative z-10">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center border shadow-md text-xs md:text-sm",
                currentStep === step.id
                  ? "border-primary bg-primary text-white"
                  : isStepComplete(step.id)
                  ? "text-black"
                  : "text-gray-700"
              )}
            >
              {index + 1}
            </div>
            <span
              className={cn(
                "text-[15px]",
                currentStep === step.id ? "text-primary" : "text-black"
              )}
            >
              {step.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
