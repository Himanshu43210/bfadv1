import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const callApi = createAsyncThunk(
  "api/callApi",
  async (options, thunkAPI) => {
    const response = await axios(options).catch((e) => {
      toast.error(e.data.message)
    });
    return response.data;
  }
);
