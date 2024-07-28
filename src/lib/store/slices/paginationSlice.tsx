import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationProps {
  value: number;
}

const initialState: PaginationProps = {
  value: 1,
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
