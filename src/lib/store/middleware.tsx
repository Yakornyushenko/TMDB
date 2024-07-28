export const localStorageMiddleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    const film = action.payload;
    const parseStorage = JSON.parse(localStorage.getItem("ratedMovies"));

    if (action.type === "ratedMovies/addMovie") {
      if (parseStorage === null) {
        // Инициализация локального хранилища
        localStorage.setItem("ratedMovies", JSON.stringify([film]));
      } else {
        // Добавление нового фильма при наличии хранилища
        parseStorage.push(film);
        localStorage.setItem("ratedMovies", JSON.stringify(parseStorage));
      }
    } else if (action.type === "ratedMovies/reRateMovie") {
      if (!film.personalRating) {
        // Удаление фильма из избранного
        const filteredParseStorage = parseStorage.filter(
          (item) => item.id !== film.id
        );
        localStorage.setItem(
          "ratedMovies",
          JSON.stringify(filteredParseStorage)
        );
      } else {
        // Изменение рейтинга фильма
        const filteredParseStorage = parseStorage.filter(
          (item) => item.id !== film.id
        );
        filteredParseStorage.push(film);
        localStorage.setItem(
          "ratedMovies",
          JSON.stringify(filteredParseStorage)
        );
      }
    }
    // Передача действия дальше
    return next(action);
  };
