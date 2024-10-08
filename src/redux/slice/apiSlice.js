import { createSlice } from "@reduxjs/toolkit";
import { callApi } from "../utils/apiActions.js";
import { FAILED, LOADING, SUCCESS } from "../../components/utils/Const.js";
import { getApiName } from "../utils/api.js";

const apiSlice = createSlice({
  name: "api/callApi",
  initialState: { data: {}, status: {}, error: {} }, // Change error: null to error: {}
  reducers: {
    resetApiStatus: (state, action) => {
      state.status[action.payload] = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(callApi.pending, (state, action) => {
        state.status[getApiName(action?.meta?.arg.url)] = LOADING;
      })
      .addCase(callApi.fulfilled, (state, action) => {
        state.status[getApiName(action?.meta?.arg?.url)] = SUCCESS;
        // Add all fetched data to the state
        state.data[getApiName(action?.meta?.arg?.url)] = action.payload;
      })
      .addCase(callApi.rejected, (state, action) => {
        const apiname = getApiName(action?.meta?.arg?.url);
        if (apiname !== "") {
          state.status[apiname] = FAILED;
          state.error[apiname] = action?.error.message; // Update state.error instead of a non-existent property
        }
      });
  },
});
export const { resetApiStatus } = apiSlice.actions;
export default apiSlice.reducer;
