"use client";
import React from "react";
import noRateMovies from "../../../public/icons/loadings/noRateMovies.png";
import "./page.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/Button/Button";
import { ButtonType } from "@/src/components/Button/buttonType";
import block from "bem-cn";

const b = block("empty");

const Page = () => {
  const router = useRouter();
  return (
    <div className={b()}>
      <Image src={noRateMovies} alt="No rated Films" />
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <p className={b("title")}>You haven't rated any films yet</p>
      <Button
        onClick={() => router.push("/")}
        className={b("redirect")}
        type={ButtonType.Fulfilled}
      >
        Find movies
      </Button>
    </div>
  );
};

export default Page;
