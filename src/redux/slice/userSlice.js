import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "profile",
  initialState: {},
  reducers: {
    storeUserData: (state, action) => {
      return action.payload;
    },
    clearUserData: (state, action) => {
      return {};
    },
  },
});

export const { storeUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
