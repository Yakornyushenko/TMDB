"use client";
import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "@/src/components/Breadcrumbs/Breadcrumbs";
import SideBar from "@/src/ui/SideBar/SideBar";
import { fetchFilm } from "@/src/api/api";

const Movie = ({ id }) => {
  const [film, setFilm] = useState();

  useEffect(() => {
    fetchFilm(id).then((data) => {
      setFilm(data);
    });
  }, []);
  console.log("film", film);
  return (
    <section style={{ display: "flex" }}>
      <SideBar />
      <Breadcrumbs
        breadcrumbs={[
          { label: "Movies", href: "/" },
          {
            label: "movie",
            href: "",
            active: true,
          },
        ]}
      />
    </section>
  );
};

export default Movie;
