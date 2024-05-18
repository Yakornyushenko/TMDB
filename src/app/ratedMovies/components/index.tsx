"use client";
import React, { FC, useState } from "react";
import { MoviesList } from "@/src/ui/MoviesList/MoviesList";
import { Header } from "@/src/app/ratedMovies/components/Header";

const RatedMoviePage: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <Header setSearchValue={setSearchValue} />
      <MoviesList searchValue={searchValue} />
    </>
  );
};

export default RatedMoviePage;
