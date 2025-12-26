import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VehicleFormData, FormStep } from "@/types/vehiclStep";

interface FormState {
  formData: Partial<VehicleFormData>;
  currentStep: FormStep;
}

const initialState: FormState = {
  formData: {},
  currentStep: "basic",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormData(state, action: PayloadAction<Partial<VehicleFormData>>) {
      state.formData = { ...state.formData, ...action.payload };
    },
    setCurrentStep(state, action: PayloadAction<FormStep>) {
      state.currentStep = action.payload;
    },
    resetFormData(state) {
      state.formData = {};
      state.currentStep = "basic";
    },
    initializeStep(state, action: PayloadAction<FormStep>) {
      const validSteps: FormStep[] = ["basic", "media", "details", "pricing", "description", "publish"];
      if (validSteps.includes(action.payload) && state.currentStep !== action.payload) {
        state.currentStep = action.payload;
      }
    },
  },
});

export const { updateFormData, setCurrentStep, resetFormData, initializeStep } = formSlice.actions;

export default formSlice.reducer;