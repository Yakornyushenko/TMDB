"use client";
import React, { useEffect, useState } from "react";
import { fetchGenres, fetchMovies } from "@/src/api/api";
import { Movies } from "@/src/types/base";
import block from "bem-cn";
import MovieCard from "@/src/ui/MovieCard/MovieCard";
import {
  initialPaginationInfo,
  Pagination,
} from "@/src/ui/Pagination/Pagination";
import Image from "next/image";
import spinner from "../../../public/icons/loadings/spinner.svg";
import "./MoviesList.scss";
import { RateModal, RateModalProps } from "@/src/ui/RateModal/Modal/RateModal";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { IS_HOME_PAGE, IS_RATED_PAGE } from "@/src/constants";

const b = block("moviesList");

export default function MoviesLis() {
  //Routing
  const pathName = usePathname();
  const router = useRouter();
  // Modal
  const [isOpenRateModal, setIsOpenRateModal] = useState<boolean>(false);
  const [rateModalProps, setRateModalProps] = useState<RateModalProps>();
  // DATA/API
  const [movies, setMovies] = useState<Movies.Movie[]>(),
    [genres, setGenres] = useState<Movies.Genre[]>(),
    stringStorage = localStorage.getItem("movies"),
    parseStorage = JSON.parse(stringStorage),
    [storage, setStorage] = useState<any>();
  // pagination
  const [page, setPage] = useState<number>(initialPaginationInfo.page);
  const [paginationInfo, setPaginationInfo] = useState<Movies.PaginationInfo>(
    initialPaginationInfo
  );
  // MANAGERS
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    fetchGenres().then((data) => setGenres(data));

    if (pathName === IS_HOME_PAGE) {
      fetchMovies(page)
        .then((data) => {
          setMovies(data.results);

          setPaginationInfo({
            totalResults: data?.total_results ?? 0,
            page: data.page ?? 0,
            totalPages: data?.total_pages ?? 0,
          });
        })
        .finally(() => setIsLoading(false));
    } else if (pathName === IS_RATED_PAGE) {
      setPaginationInfo({
        totalResults: parseStorage?.length ?? 0,
        page: page,
        totalPages: parseStorage?.length / 4 ?? 0,
      });

      const firstSliceValue = page * 4;
      const secondSliceValue = (page + 1) * 4;
      setStorage(parseStorage?.slice(firstSliceValue, secondSliceValue));

      setIsLoading(false);
    }
    //eslint-disable-next-line
  }, [page, pathName, stringStorage]);

  // remove/add page scroll
  useEffect(() => {
    if (isOpenRateModal) window.document.body.classList.add("isRateModalOpen");
    else window.document.body.classList.remove("isRateModalOpen");
  }, [isOpenRateModal]);

  useEffect(() => {
    if (movies === undefined && !isLoading) {
      (storage?.length < 1 || storage === undefined) && router.push("/empty");
    }
  }, [movies, isLoading, storage, router]);

  const selectedGenres = (genresIds: number[] | undefined) => {
    return genres
      ?.filter((item) => genresIds?.includes(item.id))
      ?.map((item) => item.name);
  };

  if (isLoading && movies) {
    return (
      <div className={b("spinner")}>
        <Image src={spinner} alt={"Loader"} />
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
                genres={selectedGenres(item?.genre_ids)}
                image={item?.backdrop_path}
                rating={item?.vote_average}
                title={item?.title}
                release={item?.release_date}
                key={item?.id}
                id={item?.id}
                voteCount={item?.vote_count}
              />
            ))
          : storage?.map((item) => (
              <MovieCard
                setRateModalProps={setRateModalProps}
                isOpenRateModal={isOpenRateModal}
                setIsOpenRateModal={setIsOpenRateModal}
                genres={item?.genre_ids}
                image={item?.backdrop_path}
                rating={item?.vote_average}
                title={item.title}
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
}
