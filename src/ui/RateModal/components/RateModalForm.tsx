"use client";
import React, { FC, useEffect, useState } from "react";
import { Button } from "@/src/components/Button/Button";
import { ButtonType } from "@/src/components/Button/buttonType";
import block from "bem-cn";
import RateIcon from "@/public/icons/components/RateIcon";
import { Movies } from "@/src/types/base";
import { addMovie, reRateMovie } from "@/src/lib/store/slices/ratedMoviesSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks";

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
  const ratedMoviesStore = useAppSelector((state) => state.ratedMovies);
  const dispatch = useAppDispatch();
  const { movieTitle, setIsOpen, id } = props;

  const [selected, setSelected] = useState<number | undefined>(undefined);
  const [rate, setRate] = useState<number | undefined>();
  const [ratedMovieProps, setRatedMovieProps] = useState<any>();

  const ratedMovie = ratedMoviesStore?.find((movie) => movie?.id === id);

  useEffect(() => {
    setRate(ratedMovie?.personalRating);
  }, []);

  const arrayStars = Array.from({ length: 10 }, (component, index) => (
    <RateIcon key={index} />
  ));
  useEffect(() => {
    setRatedMovieProps({
      genre_ids: props.genres,
      id: Number(props.id),
      backdrop_path: props.image,
      title: props.movieTitle,
      vote_average: props.rating,
      release_date: props.release,
      vote_count: props.voteCount,
      personalRating: rate,
    });
  }, [rate]);

  const isDuplicateMovie = ratedMoviesStore?.find(
    (item) => item?.id === ratedMovieProps?.id
  );

  const changeRateMovie = () => {
    if (!ratedMoviesStore) {
      dispatch(addMovie(ratedMovieProps));
    } else {
      if (rate) {
        if (isDuplicateMovie) {
          dispatch(reRateMovie(ratedMovieProps));
        } else {
          dispatch(addMovie(ratedMovieProps));
        }
      } else {
        dispatch(reRateMovie(ratedMovieProps));
      }
    }
    setIsOpen(false);
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
          onClick={() => setRate(undefined)}
          type={ButtonType.Outline}
          purpleText
        >
          Remove rating
        </Button>
      </div>
    </>
  );
};
