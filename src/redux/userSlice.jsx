import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const personSlice = createSlice({
  name: "PERSON",
  initialState,
  reducers: {
    getUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { getUser } = personSlice.actions;
export default personSlice.reducer;
