import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "../redux/slices/JobSlice";

export default configureStore({ reducer: { jobReducer } });
