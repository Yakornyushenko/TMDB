import React, { FC, useEffect, useState } from "react";
import { Button } from "@/src/components/Button/Button";
import { ButtonType } from "@/src/components/Button/buttonType";
import block from "bem-cn";
import RateIcon from "@/public/icons/RateIcon";
import { Movies } from "@/src/types/base";

const b = block("rateModalForm");

interface RateModalProps {
  movieTitle: string;
  id: number;
  image: string;
  rating: number;
  release: number;
  voteCount: number;
  genres: Movies.Genre;
}

export const RateModalForm: FC<RateModalProps> = (props) => {
  const { movieTitle, setIsOpen, id } = props;

  useEffect(() => {
    const storageRatedMovies = JSON.parse(localStorage.getItem("movies"));
    const rateMovie = storageRatedMovies?.find((item) => item.id === id);
    setRate(rateMovie);
  }, []);

  const [selected, setSelected] = useState<number | undefined>(undefined);
  const [rate, setRate] = useState<number | undefined>(undefined);

  const arrayStars = Array.from({ length: 10 }, (component, index) => (
    <RateIcon key={index} />
  ));

  const ratedMovieProps = {
    genre_ids: props.genres,
    id: props.id,
    backdrop_path: props.image,
    title: props.movieTitle,
    vote_average: props.rating,
    release_date: props.release,
    vote_count: props.voteCount,
    personalRating: rate,
  };
  // localStorage logic
  const stringRatedMovies = localStorage.getItem("movies");
  const parseMovies = JSON.parse(stringRatedMovies);

  const isDuplicateMovie = parseMovies?.find(
    (item) => item.id === ratedMovieProps.id
  );
  const dubbedMovies = parseMovies?.filter(
    (item) => item.id !== ratedMovieProps.id
  );

  const changeRateMovie = () => {
    const ratedMovies = JSON.parse(localStorage.getItem("movies"));

    if (ratedMovies === null) {
      const arr = [];
      arr.push(ratedMovieProps);
      localStorage.setItem("movies", JSON.stringify(arr));
    } else {
      if (rate) {
        if (isDuplicateMovie) {
          dubbedMovies.push(ratedMovieProps);
          localStorage.setItem("movies", JSON.stringify(dubbedMovies));
        } else {
          parseMovies.push(ratedMovieProps);
          const newRatedMovies = JSON.stringify(parseMovies);
          localStorage.setItem("movies", newRatedMovies);
        }
      }
    }
    setIsOpen(false);
  };

  const removeRatedMovie = () => {
    setRate(undefined);
    if (isDuplicateMovie)
      localStorage.setItem("movies", JSON.stringify(dubbedMovies));
  };

  return (
    <>
      {movieTitle && <p className={b("sub-title")}>{movieTitle}</p>}

      <div className={b("stars")}>
        {arrayStars.map((item, index) => (
          <span
            key={index}
            onMouseOver={() => setSelected(index + 1)}
            onMouseLeave={() => setSelected(undefined)}
            className={b("star", {
              rated: index < rate,
              selected: index < selected,
            })}
            onClick={() => setRate(index + 1)}
          >
            {item}
          </span>
        ))}
      </div>

      <div className={b("btn-block")}>
        <Button onClick={() => changeRateMovie()} type={ButtonType.Fulfilled}>
          Save
        </Button>
        <Button
          onClick={() => removeRatedMovie()}
          type={ButtonType.Outline}
          purpleText
        >
          Remove rating
        </Button>
      </div>
    </>
  );
};
