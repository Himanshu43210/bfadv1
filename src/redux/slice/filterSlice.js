import { createSlice } from "@reduxjs/toolkit";

const fliterSlice = createSlice({
  name: "filter",
  initialState: {},
  reducers: {
    storeFilterData: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetFilterData: (state, action) => {
      return {};
    },
  },
});

export const { storeFilterData, resetFilterData } = fliterSlice.actions;
export default fliterSlice.reducer;
