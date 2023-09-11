import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const callApi = createAsyncThunk(
  "api/callApi",
  async (options, thunkAPI) => {
    const response = await axios(options);
    return response.data;
  }
);
