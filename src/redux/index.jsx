import { configureStore } from "@reduxjs/toolkit";
import createProductSlice from "./CreateProductSlice";
import personSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    mainReducer: createProductSlice,
    userReducer: personSlice,
  },
});
