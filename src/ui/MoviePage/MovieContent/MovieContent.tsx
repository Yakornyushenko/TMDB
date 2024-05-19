"use client";
import React from "react";
import block from "bem-cn";
import Link from "next/link";
import Image from "next/image";

import "./MovieContent.scss";
import castleRock from "../../../../public/icons/companiesLink/CastleRock.svg";
import warnerBros from "../../../../public/icons/companiesLink/warnerBros.svg";
import darkWoods from "../../../../public/icons/companiesLink/darkwoods.svg";

const b = block("movieContent");

const MovieContent = ({ description, video }) => {
  return (
    <div className={b()}>
      <p className={b("title")}>Trailer</p>

      <iframe
        allowFullScreen
        width={500}
        height={281}
        className={b("video")}
        src={video}
        title="YouTube"
        aria-hidden="true"
      />

      <div className={b("description-block")}>
        <p className={b("title")}> Description</p>
        <p className={b("description")}>{description}</p>
      </div>

      <div className={b("production-block")}>
        <p className={b("title")}>Production</p>
        <Link
          href={"https://www.castlerockco.com/"}
          className={b("production-link")}
        >
          <Image
            width={40}
            height={40}
            src={castleRock}
            alt="Castle Rock Entertainment"
          />
          <p className={b("link-text")}>Castle Rock Entertainment</p>
        </Link>

        <Link href={"https://darkwoods.eu/"} className={b("production-link")}>
          <Image
            width={40}
            height={40}
            src={darkWoods}
            alt="Darkwoods Productions"
          />
          <p className={b("link-text")}>Darkwoods Productions</p>
        </Link>

        <Link
          href={"https://www.warnerbros.com/"}
          className={b("production-link")}
        >
          <Image
            width={40}
            height={40}
            src={warnerBros}
            alt="Warner Bros. Pictures"
          />
          <p className={b("link-text")}>Warner Bros. Pictures</p>
        </Link>
      </div>
    </div>
  );
};

export default MovieContent;
