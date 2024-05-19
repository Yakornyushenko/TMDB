"use client";
import "./filter.scss";
import LowerArrow from "../../../public/icons/lowerArrow.svg";
import UpperArrow from "../../../public/icons/upperArrow.svg";
import block from "bem-cn";
import { Input } from "@/src/components/Input/Input";
import { Button } from "@/src/components/Button/Button";
import { ButtonType } from "@/src/components/Button/buttonType";
import { fetchGenres } from "@/src/api/api";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import CustomSelect from "@/src/components/Select/Selector";
import { createGenresOptions, generateData } from "@/src/lib/utils";
import { OptionProps } from "@/src/types/base";
import { sortOptions } from "@/src/constants";

const b = block("filter");

interface Props {
  setSelectedDate: Dispatch<SetStateAction<OptionProps>>;
  selectedDate: OptionProps;
  setSelectedGenre: Dispatch<SetStateAction<OptionProps>>;
  selectedGenre: OptionProps;
  setSelectedSort: Dispatch<SetStateAction<OptionProps>>;
  selectedSort: OptionProps;
  setSelectedTo: Dispatch<SetStateAction<string | number>>;
  selectedTo: string | number;
  setSelectedFrom: Dispatch<SetStateAction<string | number>>;
  selectedFrom: string | number;
}

const Filter: FC<Props> = ({
  setSelectedFrom,
  setSelectedTo,
  setSelectedSort,
  setSelectedGenre,
  setSelectedDate,
  selectedDate,
  selectedGenre,
  selectedSort,
  selectedTo,
  selectedFrom,
}) => {
  const [genresOptions, setGenresOptions] = useState<OptionProps[]>(null);
  const [dateOptions, setDateOptions] = useState<OptionProps[]>(
    generateData(50, 1850)
  );

  useEffect(() => {
    fetchGenres().then((data) => {
      setGenresOptions(createGenresOptions(data));
    });
  }, []);

  const resetFilters = () => {
    setSelectedFrom("");
    setSelectedTo("");
    setSelectedSort(null);
    setSelectedGenre(null);
    setSelectedDate(null);
  };

  const onMenuScrollBottom = () => {
    setDateOptions(generateData(175, 1850));
  };
  const onMenuScrollToTop = () => {
    setDateOptions(generateData(50, 1850));
  };

  return (
    <section className={b()}>
      <div className={b("wrapper")}>
        <div>
          <p className={b("title")}>Genres</p>
          <CustomSelect
            onChange={setSelectedGenre}
            value={selectedGenre}
            options={genresOptions}
            placeholder="Select genre"
          />
        </div>
        <div>
          <p className={b("title")}>Release year</p>
          <CustomSelect
            onMenuScrollToTop={onMenuScrollToTop}
            onMenuScrollToBottom={onMenuScrollBottom}
            onChange={setSelectedDate}
            value={selectedDate}
            options={dateOptions}
            placeholder="Select release year"
          />
        </div>
        <div>
          <p className={b("title")}>Ratings</p>
          <div className={b("inputsBlock")}>
            <Input
              style={{ marginRight: 16 }}
              placeholder="From"
              pattern="/^[0-9]+$/"
              startHandler={UpperArrow}
              endHandler={LowerArrow}
              value={selectedFrom}
              setValue={setSelectedFrom}
            />
            <Input
              placeholder="To"
              pattern="/^[0-9]+$/"
              startHandler={UpperArrow}
              endHandler={LowerArrow}
              value={selectedTo}
              setValue={setSelectedTo}
            />
          </div>
        </div>
        <Button
          onClick={() => resetFilters()}
          style={{ marginTop: 30 }}
          type={ButtonType.Outline}
        >
          Reset filters
        </Button>
      </div>
      <div style={{ minWidth: 284 }}>
        <p className={b("title")}>Sort by</p>
        <CustomSelect
          className={b("sort-select")}
          onChange={setSelectedSort}
          value={selectedSort}
          options={sortOptions}
          placeholder="Select type of sort"
        />
      </div>
    </section>
  );
};
export default Filter;
