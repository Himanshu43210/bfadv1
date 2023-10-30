import { combineReducers } from "@reduxjs/toolkit";
import apiReducer from "./slice/apiSlice.js";
import filterSlice from "./slice/filterSlice.js";
import userSlice from "./slice/userSlice.js";
import parentSlice from "./slice/parentSlice.js";

const rootReducer = combineReducers({
  api: apiReducer,
  filter: filterSlice,
  profile: userSlice,
  parent: parentSlice,
});

export default rootReducer;
