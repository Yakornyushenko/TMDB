import { SortBy } from "@/src/constants";
import { api } from "@/src/api/index";

// Movies
export async function fetchMovies(
  currentPage: number,
  release: number,
  sort: string,
  genres: number,
  to: number,
  from: number,
  sortBy: SortBy
) {
  const data = await api(
    `discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&primary_release_year=${release}&with_genres=${genres || 18}&vote_average.lte=${to}&vote_average.gte=${from}&sort_by=${sort}.${sortBy}`
  );
  const { page, results, total_pages, total_results } = data;
  return { page, total_pages, total_results, results };
}
// Movie
export async function fetchFilm(id: number) {
  return await api(`movie/${id}?language=en-US`);
}
// Movie trailer
export async function fetchMovieTrailer(id: number) {
  const data = await api(`movie/${id}/videos?language=en-US`);
  try {
    const { key } = data?.results[0];
    return key;
  } catch (error) {
    console.error(error);
  }
}
// Genres
export async function fetchGenres() {
  const data = await api(`genre/movie/list?language=en`);
  const { genres } = data;
  return genres;
}
