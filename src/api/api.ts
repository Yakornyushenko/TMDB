// curl --request GET \
//      --url 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc' \
//      --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzYyMzQ2YjQ3NzUzZjY1YmJkMTg5YjBjNzJjOTI2MSIsInN1YiI6IjY2MzY0ZDk5NjYxMWI0MDEyYTY3ZTEzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eJ1d8L0sPLih-_QQzvlpePKxBckeMok0y6N02fFjYfM' \
//      --header 'accept: application/json'

export const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzYyMzQ2YjQ3NzUzZjY1YmJkMTg5YjBjNzJjOTI2MSIsInN1YiI6IjY2MzY0ZDk5NjYxMWI0MDEyYTY3ZTEzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eJ1d8L0sPLih-_QQzvlpePKxBckeMok0y6N02fFjYfM";

// Movies
export async function fetchMovies(page) {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page + 1}&sort_by=popularity.desc`,
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

// Movie
export async function fetchFilm(id) {
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
