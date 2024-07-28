import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterProps {
  value: number;
}

const initialState: CounterProps = {
  value: 0,
};
export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setCurrentPage } = paginationSlice.actions;
export default paginationSlice.reducer;
