import { Movies } from "@/src/types/base";

export const selectedGenres = (
  genresIds: number[] | undefined,
  genres: Movies.Genre[] | undefined
) => {
  return genres
    ?.filter((item) => genresIds?.includes(item.id))
    ?.map((item) => item.name);
};

export const generateData = (count, startDate) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({ label: startDate + i, value: startDate + i });
  }
  return data;
};

export const createGenresOptions = (options) => {
  return options?.map((option) => {
    return {
      label: option.name,
      value: option.id,
    };
  });
};
