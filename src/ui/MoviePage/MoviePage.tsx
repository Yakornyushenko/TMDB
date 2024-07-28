"use client";
import React, { useEffect, useState } from "react";
import { fetchFilm, fetchMovieTrailer } from "@/src/api/api";
import { Breadcrumbs } from "@/src/components/Breadcrumbs/Breadcrumbs";
import SideBar from "@/src/ui/SideBar/SideBar";
import MovieContent from "@/src/ui/MoviePage/MovieContent/MovieContent";
import MovieCard from "@/src/ui/MovieCard/MovieCard";
import { RateModal, RateModalProps } from "@/src/ui/RateModal/RateModal";
import { Movies } from "@/src/types/base";
import { defaultTrailerUrl } from "@/src/constants";
import block from "bem-cn";

import "./MoviePage.scss";
import Image from "next/image";
import spinner from "@/public/icons/loadings/spinner.svg";

const b = block("movie");

const Movie = ({ id }) => {
  const [film, setFilm] = useState();
  const [trailerUrl, setTrailerUrl] = useState<string>();
  const [isOpenRateModal, setIsOpenRateModal] = useState<boolean>(false);
  const [rateModalProps, setRateModalProps] = useState<RateModalProps>();
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    fetchFilm(id).then((data) => {
      setIsLoading(true);
      setFilm(data);
    });
    fetchMovieTrailer(id)
      .then((data) => setTrailerUrl(`${defaultTrailerUrl}${data}`))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line
  }, []);

  if (isLoading && !film) {
    return (
      <div className={b("spinner")}>
        <Image src={spinner} alt={"Spinner"} />
      </div>
    );
  }
  return (
    <>
      <SideBar />
      <section className={b()}>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Movies", href: "/" },
            {
              label: "movie",
              href: "",
              active: true,
            },
          ]}
        />
        <MovieCard
          id={Number(id)}
          title={film?.original_title}
          release={film?.release_date}
          image={film?.poster_path}
          rating={film?.vote_average}
          genres={film?.genres?.map((item) => item?.name)}
          voteCount={film?.vote_count}
          setIsOpenRateModal={setIsOpenRateModal}
          setRateModalProps={setRateModalProps}
          budget={film?.budget}
          runtime={film?.runtime}
          premiere={film?.release_date}
          revenue={film?.revenue}
          isMoviePage
        />
        <MovieContent video={trailerUrl} description={film?.overview} />
      </section>
      {isOpenRateModal && (
        <RateModal setIsOpen={setIsOpenRateModal} {...rateModalProps} />
      )}
    </>
  );
};

export default Movie;
