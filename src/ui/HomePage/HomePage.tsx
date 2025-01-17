"use client";
import React, { useState } from "react";
import Filter from "@/src/ui/Filter/Filter";
import { MoviesList } from "@/src/ui/MoviesList/MoviesList";
import { OptionProps } from "@/src/types/base";
import { sortOptions } from "@/src/constants";
import block from "bem-cn";

const b = block("homePage");

const HomePage = () => {
  const [selectedGenre, setSelectedGenre] = useState<OptionProps>(null);
  const [selectedDate, setSelectedDate] = useState<OptionProps>(null);
  const [selectedSort, setSelectedSort] = useState<OptionProps>(
    sortOptions[1] || null
  );
  const [selectedTo, setSelectedTo] = useState<string | number>("");
  const [selectedFrom, setSelectedFrom] = useState<string | number>("");
  return (
    <section>
      <h1 className={b("title")}>Movies</h1>
      <Filter
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        selectedTo={selectedTo}
        setSelectedTo={setSelectedTo}
        selectedFrom={selectedFrom}
        setSelectedFrom={setSelectedFrom}
      />
      <MoviesList
        selectedFrom={selectedFrom}
        selectedTo={selectedTo}
        selectedSort={selectedSort}
        selectedDate={selectedDate}
        selectedGenre={selectedGenre}
      />
    </section>
  );
};

export default HomePage;
