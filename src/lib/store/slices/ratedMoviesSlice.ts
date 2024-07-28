import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movies } from "@/src/types/base";

const initialState: Movies.Movie[] = [];

export const ratedMoviesSlice = createSlice({
  name: "ratedMovies",
  initialState: initialState,
  reducers: {
    addInitialState: (state, action: PayloadAction<Movies.Movie[]>) => {
      state = action.payload;
      return state || [];
    },
    addMovie: (state, action: PayloadAction<Movies.Movie>) => {
      const movie = action.payload;
      state.push(movie);
    },
    reRateMovie: (state, action: PayloadAction<Movies.Movie>) => {
      const movie = action.payload;
      const movieIndex = state.findIndex((item) => item.id === movie.id);
      state[movieIndex].personalRating = movie.personalRating;
    },
  },
});

export const { addInitialState, addMovie, reRateMovie } =
  ratedMoviesSlice.actions;
export default ratedMoviesSlice.reducer;
