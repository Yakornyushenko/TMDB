"use client";
import React, { FC, useEffect, useState } from "react";
import block from "bem-cn";
import Image from "next/image";
import noImage from "../../../public/icons/noImage.png";
import goldRatingStar from "../../../public/icons/stars/goldRatingStar.svg";
import "./MovieCard.scss";
import { BASE_IMAGE_URL } from "@/src/constants";
import RateIcon from "@/public/icons/RateIcon";
import Link from "next/link";
import { Movies } from "@/src/types/base";

const b = block("movieCard");

const MovieCard: FC<Movies.MovieCard> = ({
  title,
  release,
  image,
  rating,
  genres,
  id,
  voteCount,
  setIsOpenRateModal,
  setRateModalProps,
  // special for movie page
  isMoviePage = false,
  runtime,
  budget,
  revenue,
}) => {
  const [checkRate, setCheckRate] = useState<number>();

  useEffect(() => {
    const stringStorage = localStorage?.getItem("movies");
    const parseStorage = JSON.parse(stringStorage);
    const movie = parseStorage?.find((item) => item.id === id);
    setCheckRate(movie?.personalRating);
  }, []);

  const rateIconHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    setIsOpenRateModal(true);
    setRateModalProps({
      id: id,
      image: image,
      movieTitle: title,
      rating: rating,
      release: release,
      voteCount: voteCount,
      genres: genres,
    });
  };
  const durationFormat = (duration: number | undefined) => {
    const hour = String(duration).slice(0, 1);
    const min = String(duration).slice(1, 3);
    return `${hour}h  ${min}m`;
  };

  const dateFormat = (dateString: string | undefined) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return (
      dateString && new Date(dateString)?.toLocaleDateString("en-US", options)
    );
  };
  const moneyFormat = (summary: number | undefined) => {
    const options = {
      style: "currency",
      currency: "USD",
    };
    return summary?.toLocaleString("en-US", options);
  };

  return (
    <Link
      key={id}
      className={b({ isMoviePage: isMoviePage })}
      href={`/movie/${id}`}
    >
      <Image
        className={b("image")}
        width={!isMoviePage ? 120 : 250}
        height={!isMoviePage ? 170 : 350}
        src={image ? `${BASE_IMAGE_URL}${image}` : noImage}
        alt="Movie image"
      />

      <div className={b("info")}>
        <div>
          <div className={b("title-wrapper")}>
            <p className={b("title")}>{title}</p>

            <div
              onClick={(e) => rateIconHandler(e)}
              className={b("title-rate-block")}
            >
              <RateIcon
                className={b("rate-icon", {
                  rated: checkRate !== undefined,
                })}
              />
              {checkRate && (
                <span className={b("rate-value")}>{checkRate}</span>
              )}
            </div>
          </div>

          <p className={b("sub-title")}>{release?.slice(0, 4)}</p>

          {rating !== 0 ? (
            <div className={b("sub-title-wrapper")}>
              <Image src={goldRatingStar} alt="Rating" />

              <p>{String(rating)?.slice(0, 3)}</p>
              <p className={b("sub-title")}>
                ({String(voteCount)?.slice(0, 3)}M)
              </p>
            </div>
          ) : (
            <p className={b("sub-title")}>Not indicated</p>
          )}
        </div>

        <div>
          {isMoviePage && (
            <>
              <div className={b("description-row")}>
                <p className={b("sub-title")}>Duration</p>
                <p>{durationFormat(runtime) || "No duration"}</p>
              </div>

              <div className={b("description-row")}>
                <p className={b("sub-title")}>Premiere</p>
                <p>{dateFormat(release) || "No date"} </p>
              </div>

              <div className={b("description-row")}>
                <p className={b("sub-title")}>Budget</p>
                <p>{moneyFormat(budget) || "No budget"}</p>
              </div>

              <div className={b("description-row")}>
                <p className={b("sub-title")}>Gross worldwide</p>
                <p>{moneyFormat(revenue) || "No revenue"}</p>
              </div>
            </>
          )}
          <div
            className={b("description-row", { isNotMoviePage: !isMoviePage })}
          >
            <p className={b("sub-title")}>Genres</p>
            <p>{genres?.slice(0, 3).join(", ") || "No genres"}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
