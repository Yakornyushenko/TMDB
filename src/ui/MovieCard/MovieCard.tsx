"use client";
import React, { FC, SetStateAction } from "react";
import block from "bem-cn";
import Image from "next/image";
import noImage from "../../../public/icons/noImage.png";
import goldRatingStar from "../../../public/icons/stars/goldRatingStar.svg";
import "./MovieCard.scss";
import { BASE_IMAGE_URL } from "@/src/constants";
import RateIcon from "@/public/icons/RateIcon";
import { RateModalProps } from "@/src/ui/RateModal/Modal/RateModal";

const b = block("movieCard");

interface Props {
  id: number | undefined;
  title: string | undefined;
  release: string | undefined;
  image: string | undefined;
  rating: number | undefined;
  genres: number[] | undefined;
  voteCount: number | undefined;
  setIsOpenRateModal: React.Dispatch<SetStateAction<boolean>>;
  setRateModalProps: React.Dispatch<SetStateAction<RateModalProps>>;
}

const MovieCard: FC<Props> = ({
  title,
  release,
  image,
  rating,
  genres,
  id,
  voteCount,
  setIsOpenRateModal,
  setRateModalProps,
}) => {
  const stringStorage = localStorage.getItem("movies"),
    parseStorage = JSON.parse(stringStorage),
    checkRate = parseStorage?.find((item) => item.id === id);

  const rateIconHandler = () => {
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

  return (
    <>
      <div key={id} className={b()}>
        <Image
          style={{
            aspectRatio: 16 / 9,
            marginRight: 16,
          }}
          width={119}
          height={170}
          src={image ? `${BASE_IMAGE_URL}${image}` : noImage}
          alt="film image"
        />

        <div className={b("info")}>
          <div>
            <div className={b("title-wrapper")}>
              <p className={b("title")}>{title}</p>

              <div
                onClick={() => rateIconHandler()}
                className={b("title-rate-block")}
              >
                <RateIcon
                  className={b("rate-icon", { rated: checkRate !== undefined })}
                />
                {checkRate && (
                  <span className={b("rate-value")}>
                    {checkRate.personalRating}
                  </span>
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

          <div style={{ display: "flex", gap: 8 }}>
            <p style={{ marginRight: 10 }} className={b("sub-title")}>
              Genres
            </p>
            <p>{genres?.slice(0, 3).join(", ")}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
