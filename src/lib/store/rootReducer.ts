import { combineReducers } from "redux";
import ratedMoviesReducer from "./slices/ratedMoviesSlice";
import paginationReducer from "@/src/lib/store/slices/paginationSlice";

export const rootReducer = combineReducers({
  ratedMovies: ratedMoviesReducer,
  pagination: paginationReducer,
});
