export const selectedGenres = (genresIds: number[] | undefined, genres) => {
  return genres
    ?.filter((item) => genresIds?.includes(item.id))
    ?.map((item) => item.name);
};
