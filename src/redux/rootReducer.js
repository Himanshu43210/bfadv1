import { combineReducers } from "@reduxjs/toolkit";
import apiReducer from "./slice/apiSlice";
import filterSlice from "./slice/filterSlice";
import userSlice from "./slice/userSlice";

const rootReducer = combineReducers({
  api: apiReducer,
  filter: filterSlice,
  profile: userSlice,
});

export default rootReducer;
