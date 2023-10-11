import { createSlice } from "@reduxjs/toolkit";

const parentSlice = createSlice({
  name: "parent",
  initialState: {},
  reducers: {
    storeParentData: (state, action) => {
      return action.payload;
    },
    clearParentData: (state, action) => {
      return {};
    },
  },
});

export const { storeParentData, clearParentData } = parentSlice.actions;
export default parentSlice.reducer;
