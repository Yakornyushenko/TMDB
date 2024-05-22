"use client";
import React, { FC, useState } from "react";
import { MoviesList } from "@/src/ui/MoviesList/MoviesList";
import { Header } from "@/src/ui/RatedMoviesPage/components/Header";

const RatedMoviesPage: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <Header setSearchValue={setSearchValue} />
      <MoviesList searchValue={searchValue} />
    </>
  );
};

export default RatedMoviesPage;
