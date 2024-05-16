import { Movies } from "@/src/types/base";

export const selectedGenres = (
  genresIds: number[] | undefined,
  genres: Movies.Genre[] | undefined
) => {
  return genres
    ?.filter((item) => genresIds?.includes(item.id))
    ?.map((item) => item.name);
};
