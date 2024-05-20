"use client";
import React, { FC, useEffect, useState } from "react";
import { fetchGenres, fetchMovies } from "@/src/api/api";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { selectedGenres } from "@/src/lib/utils";
import { Movies, OptionProps } from "@/src/types/base";
import { RateModal, RateModalProps } from "@/src/ui/RateModal/Modal/RateModal";
import MovieCard from "@/src/ui/MovieCard/MovieCard";
import { IS_HOME_PAGE, IS_RATED_PAGE, SortBy } from "@/src/constants";
import {
  initialPaginationInfo,
  Pagination,
} from "@/src/ui/Pagination/Pagination";
import Image from "next/image";
import spinner from "../../../public/icons/loadings/spinner.svg";
import emptyFilters from "../../../public/icons/emptyFilters.svg";
import "./MoviesList.scss";

import block from "bem-cn";

const b = block("moviesList");
export interface Filter {
  selectedDate?: OptionProps;
  selectedGenre?: OptionProps;
  selectedSort?: OptionProps;
  selectedTo?: string | number;
  selectedFrom?: string | number;

  searchValue?: string;
}
export const MoviesList: FC<Filter> = ({
  searchValue,
  selectedFrom,
  selectedTo,
  selectedSort,
  selectedDate,
  selectedGenre,
}) => {
  //Routing
  const pathName = usePathname();
  const router = useRouter();
  // Modal
  const [isOpenRateModal, setIsOpenRateModal] = useState<boolean>(false);
  const [rateModalProps, setRateModalProps] = useState<RateModalProps>();
  // DATA/API
  const [movies, setMovies] = useState<Movies.Movie[]>();
  const [genres, setGenres] = useState<Movies.Genre[]>();
  const [movieStorage, setMovieStorage] = useState<any>();
  // pagination
  const [page, setPage] = useState<number>(initialPaginationInfo.page);
  const [paginationInfo, setPaginationInfo] = useState<Movies.PaginationInfo>(
    initialPaginationInfo
  );
  // MANAGERS
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const currentPage = localStorage.getItem("currentPage");
    const stringStorage = localStorage?.getItem("movies");
    const parseStorage = JSON.parse(stringStorage);
    setIsLoading(true);
    fetchGenres().then((data) => setGenres(data));

    if (pathName === IS_HOME_PAGE) {
      fetchMovies(
        Number(currentPage) || page || 1,
        selectedDate?.value as number,
        selectedSort?.value as string,
        selectedGenre?.value as number,
        selectedTo as number,
        selectedFrom as number,

        SortBy.desc
      )
        .then((data) => {
          setMovies(data.results);

          setPaginationInfo({
            totalResults: data?.total_results ?? 0,
            page: currentPage ? Number(currentPage) : data.page,
            totalPages: data?.total_pages ?? 0,
          });
        })
        .finally(() => setIsLoading(false));
    } else if (pathName === IS_RATED_PAGE) {
      if (searchValue?.length > 0) {
        const foundRatedMovie = parseStorage?.find(
          (item) => item.title === searchValue
        );

        setPaginationInfo({
          totalResults: foundRatedMovie?.length ?? 0,
          page: foundRatedMovie ? Number(currentPage) : page,
          totalPages:
            foundRatedMovie?.length >= 4 ? foundRatedMovie?.length / 4 : 0,
        });

        if (foundRatedMovie) {
          setMovieStorage([foundRatedMovie]);
        } else {
          setMovieStorage(undefined);
        }
        setIsLoading(false);
        return;
      }
      setPaginationInfo({
        totalResults: parseStorage?.length ?? 0,
        page: currentPage ? Number(currentPage) : page,
        totalPages: parseStorage?.length >= 4 ? parseStorage?.length / 4 : 0,
      });
      // rating's pagination count
      const firstSliceValue = page * 4;
      const secondSliceValue = (page + 1) * 4;
      setMovieStorage(parseStorage?.slice(firstSliceValue, secondSliceValue));

      setIsLoading(false);
    }
    //eslint-disable-next-line
  }, [selectedSort, selectedDate, selectedGenre, page, pathName, searchValue]);

  // remove/add page scroll
  useEffect(() => {
    if (isOpenRateModal) window.document.body.classList.add("isRateModalOpen");
    else window.document.body.classList.remove("isRateModalOpen");
  }, [isOpenRateModal]);

  useEffect(() => {
    if (movies === undefined && !isLoading) {
      if (movieStorage === undefined || movieStorage?.length < 1)
        router.push("/empty");
    }
  }, [movies, isLoading, router, movieStorage]);

  if (isLoading && movies) {
    return (
      <div className={b("loader")}>
        <Image src={spinner} alt="Spinner" />
      </div>
    );
  }
  if (movies?.length === 0) {
    return (
      <div className={b("loader")}>
        <Image src={emptyFilters} alt="No such movies" />
        <p className={b("empty-text")}>
          We don't have such movies, look for another one
        </p>
      </div>
    );
  }
  return (
    <>
      <div className={b()}>
        {movies
          ? movies?.map((item) => (
              <MovieCard
                setRateModalProps={setRateModalProps}
                isOpenRateModal={isOpenRateModal}
                setIsOpenRateModal={setIsOpenRateModal}
                genres={selectedGenres(item?.genre_ids, genres)}
                image={item?.poster_path}
                rating={item?.vote_average}
                title={item?.title}
                release={item?.release_date}
                key={item?.id}
                id={item?.id}
                voteCount={item?.vote_count}
              />
            ))
          : movieStorage?.map((item) => (
              <MovieCard
                setRateModalProps={setRateModalProps}
                isOpenRateModal={isOpenRateModal}
                setIsOpenRateModal={setIsOpenRateModal}
                genres={item?.genre_ids}
                image={item?.backdrop_path}
                rating={item?.vote_average}
                title={item?.title}
                release={item?.release_date}
                key={item?.id}
                id={item?.id}
                voteCount={item?.vote_count}
              />
            ))}
      </div>
      <div
        className={b("pagination", { ratedPage: pathName === IS_RATED_PAGE })}
      >
        <Pagination
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          totalPages={paginationInfo.totalPages}
        />
      </div>

      {isOpenRateModal && (
        <RateModal setIsOpen={setIsOpenRateModal} {...rateModalProps} />
      )}
    </>
  );
};
