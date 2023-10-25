import { createSlice } from "@reduxjs/toolkit";

const initialStatevalue = { dark: false };
export const themeSlice = createSlice({
  name: "theme",
  initialState: { value: initialStatevalue },
  reducers: {
    updateTheme: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateTheme } = themeSlice.actions;
export default themeSlice.reducer;
