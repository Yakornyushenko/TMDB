"use client";
import "./filter.scss";
import LowerArrow from "../../../public/icons/lowerArrow.svg";
import UpperArrow from "../../../public/icons/upperArrow.svg";

import block from "bem-cn";
import { BaseComponentProps } from "@/src/types/base";
import { Input } from "@/src/components/Input/Input";
import { Button } from "@/src/components/Button/Button";
import { ButtonType } from "@/src/components/Button/buttonType";
import { fetchGenres } from "@/src/api/api";
import { useEffect, useState } from "react";

interface Props extends BaseComponentProps {}
const b = block("filter");

export default function Filter() {
  const [genre, setGenre] = useState<number>();
  const [selectedGenre, setSelectedGenre] = useState<number>();
  const [genres, setGenres] = useState();

  useEffect(() => {
    fetchGenres().then((data) => setGenres(data));
  }, []);

  const handleGenreSelect = (id: number) => {
    setGenre(id);
  };

  useEffect(() => {
    setSelectedGenre(genres?.find((item) => item.id === genre));
  }, [genre]);

  return (
    <section className={b()}>
      <div style={{ display: "flex" }}></div>
      <div className={b("wrapper")}>
        <h2 className={b("title")}>Ratings</h2>
        <div className={b("inputsBlock")}>
          <Input
            style={{ marginRight: 8 }}
            placeholder="From"
            pattern="/^[0-9]+$/"
            startIcon={UpperArrow}
            endIcon={LowerArrow}
          />
          <Input
            placeholder="To"
            pattern="/^[0-9]+$/"
            startIcon={UpperArrow}
            endIcon={LowerArrow}
          />
        </div>
      </div>
      <Button style={{ marginTop: 30 }} type={ButtonType.Outline}>
        Reset filters
      </Button>
    </section>
  );
}
