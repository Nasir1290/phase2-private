// create slice to store data and remove data of user

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserState {
  user: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const initialState: UserState = {
  user: null, // Default value
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.data;

      const accessToken = action.payload.data.accessToken;

      // Save accessToken to localStorage (client-side only)
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", accessToken);
      }
    },
    removeUser: (state) => {
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
      }
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectIsLoggedIn = (state: RootState) => !!state.user.user;

export default userSlice.reducer;
