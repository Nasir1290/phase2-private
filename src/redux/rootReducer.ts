import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import userReducer from "./slice/userSlice";
import vehicleInsertReducer from "./slice/vehicleInsertSlice";

// Combine all reducers
export const rootReducer = combineReducers({
  user: userReducer,
  form: vehicleInsertReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
