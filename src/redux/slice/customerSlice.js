import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer",
  initialState: {},
  reducers: {
    storeCustomerData: (state, action) => {
      return action.payload;
    },
    clearCustomerData: (state, action) => {
      return {};
    },
  },
});

export const { storeCustomerData, clearCustomerData } = customerSlice.actions;
export default customerSlice.reducer;
