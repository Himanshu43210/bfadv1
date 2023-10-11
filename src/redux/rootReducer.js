import { combineReducers } from "@reduxjs/toolkit";
import apiReducer from "./slice/apiSlice";
import filterSlice from "./slice/filterSlice";
import userSlice from "./slice/userSlice";
import parentSlice from "./slice/parentSlice";

const rootReducer = combineReducers({
  api: apiReducer,
  filter: filterSlice,
  profile: userSlice,
  parent: parentSlice,
});

export default rootReducer;
