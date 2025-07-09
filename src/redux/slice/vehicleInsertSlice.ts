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
    // Add resetFormData action to clear formData
    resetFormData(state) {
      state.formData = {}; // Reset formData to an empty object
    },
  },
});

export const { updateFormData, setCurrentStep, resetFormData } =
  formSlice.actions;

export default formSlice.reducer;
