import { OptionProps } from "@/src/types/base";

export const BASE_IMAGE_URL = `https://image.tmdb.org/t/p/original`;
export const IS_HOME_PAGE = "/";
export const IS_RATED_PAGE = "/ratedMovies";
export const IS_EMPTY_PAGE = "/empty";

export enum SortBy {
  asc = "asc",
  desc = "desc",
}
export const defaultTrailerUrl = "https://www.youtube.com/embed/";
export const defaultApiUrl = "https://api.themoviedb.org/3/";

export const sortOptions: OptionProps[] = [
  {
    label: "Title",
    value: "original_title",
  },
  {
    label: "Most popular",
    value: "popularity",
  },
  {
    label: "Revenue",
    value: "revenue",
  },
  {
    label: "Release date",
    value: "primary_release_date",
  },
  {
    label: "Average vote",
    value: "vote_average",
  },
  {
    label: "Vote count",
    value: "vote_count",
  },
];
