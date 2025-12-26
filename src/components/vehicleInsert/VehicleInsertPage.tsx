"use client";
import { initializeStep } from "@/redux/slice/vehicleInsertSlice";
import { FormStep } from "@/types/vehiclStep";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ProgressSteps } from "./ProgressSteps";
import { StepController } from "./StepController";

const VehicleInsertPage = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize step from URL on component mount
    const stepFromQuery = searchParams.get("step") as FormStep;
    if (stepFromQuery) {
      dispatch(initializeStep(stepFromQuery));
    }
  }, [searchParams, dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6x mx-auto">
        <ProgressSteps />
        <StepController />
      </div>
    </div>
  );
};

export default VehicleInsertPage;
