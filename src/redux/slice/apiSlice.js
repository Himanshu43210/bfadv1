import { createSlice } from "@reduxjs/toolkit";
import { callApi } from "../utils/apiActions";
import { FAILED, LOADING, SUCCESS } from "../../components/utils/Const";
import { getApiName } from "../utils/api";

const apiSlice = createSlice({
  name: "api/callApi",
  initialState: { data: {}, status: {}, error: null },
  reducers: {
    resetApiStatus: (state, action) => {
      state.status[action.payload] = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(callApi.pending, (state, action) => {
        state.status[getApiName(action.meta.arg.url)] = LOADING;
      })
      .addCase(callApi.fulfilled, (state, action) => {
        state.status[getApiName(action.meta.arg.url)] = SUCCESS;
        // Add all fetched data to the state
        state.data[getApiName(action.meta.arg.url)] = action.payload;
      })
      .addCase(callApi.rejected, (state, action) => {
        state.status[getApiName(action.meta.arg.url)] = FAILED;
        state.error[getApiName(action.meta.arg.url)] = action.error.message;
      });
  },
});
export const { resetApiStatus } = apiSlice.actions;
export default apiSlice.reducer;
