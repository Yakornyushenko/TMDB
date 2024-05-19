"use client";
import React from "react";
import block from "bem-cn";
import Filter from "@/src/ui/Filter/Filter";
import { MoviesList } from "@/src/ui/MoviesList/MoviesList";

const b = block("homePage");

const HomePage = () => {
  return (
    <>
      <h1 className={b()}>Movies</h1>
      <Filter />
      <MoviesList />
    </>
  );
};

export default HomePage;
