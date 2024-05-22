"use client";
import React, { FC, useState } from "react";
import { MoviesList } from "@/src/ui/MoviesList/MoviesList";
import { Header } from "@/src/ui/RatedMoviesPage/components/Header";
import "./RatedMoviesPage.scss";
import block from "bem-cn";

const b = block("ratedMovies");

const RatedMoviesPage: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <section className={b()}>
      <Header setSearchValue={setSearchValue} />
      <MoviesList searchValue={searchValue} />
    </section>
  );
};

export default RatedMoviesPage;
