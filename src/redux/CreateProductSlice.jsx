import { createSlice } from "@reduxjs/toolkit";

const savedFavorite = JSON.parse(localStorage.getItem("favorite")) || [];

const initialState = {
  product: [],
  Favorite: savedFavorite,
};

export const createProductSlice = createSlice({
  name: "PRODUCT_SLICE",
  initialState,
  reducers: {
    getProduct(state, action) {
      state.product = action.payload;
    },

    getFavorite(state, action) {
      const isExist = state.Favorite.some(
        (item) => item._id === action.payload._id
      );

      if (isExist) {
        state.Favorite = state.Favorite.filter(
          (item) => item._id !== action.payload._id
        );
      } else {
        state.Favorite.push(action.payload);
      }

      localStorage.setItem("favorite", JSON.stringify(state.Favorite));
    },
  },
});

export const { getProduct, getFavorite } = createProductSlice.actions;
export default createProductSlice.reducer;
