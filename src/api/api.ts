import { SortBy } from "@/src/constants";

export const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzYyMzQ2YjQ3NzUzZjY1YmJkMTg5YjBjNzJjOTI2MSIsInN1YiI6IjY2MzY0ZDk5NjYxMWI0MDEyYTY3ZTEzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eJ1d8L0sPLih-_QQzvlpePKxBckeMok0y6N02fFjYfM";

// Movies
export async function fetchMovies(
  page: number,
  release: number,
  sort: string,
  genres: number,
  to: number,
  from: number,
  sortBy: SortBy
) {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_year=${release}&with_genres=${genres || 18}&vote_average.lte=${to}&vote_average.gte=${from}&sort_by=${sort}.${sortBy}`,
    {
      method: "GET",
      next: {
        revalidate: 1800,
      },
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );
  try {
    const res = await response.json();
    const { page, results, total_pages, total_results } = res;
    return { page, total_pages, total_results, results };
  } catch (error) {
    console.error(error);
  }
}
const options = {
  method: "GET",
  next: {
    revalidate: 1800,
  },
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
};

// MoviePage
export async function fetchFilm(id: number) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options
  );
  try {
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
// MoviePage Trailer
export async function fetchMovieTrailer(id: number) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    options
  );
  try {
    const res = await response.json();
    const { key } = res?.results[0];
    return key;
  } catch (error) {
    console.error(error);
  }
}

// Genres
export async function fetchGenres() {
  const response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    {
      method: "GET",
      next: {
        revalidate: 1800,
      },
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );
  const { genres } = await response.json();
  return genres;
}
