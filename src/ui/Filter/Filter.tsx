"use client";
import "./filter.scss";
import LowerArrow from "../../../public/icons/lowerArrow.svg";
import UpperArrow from "../../../public/icons/upperArrow.svg";
import block from "bem-cn";
import { Input } from "@/src/components/Input/Input";
import { Button } from "@/src/components/Button/Button";
import { ButtonType } from "@/src/components/Button/buttonType";
import { fetchGenres } from "@/src/api/api";
import { useEffect, useState } from "react";
import CustomSelect from "@/src/components/Select/Selector";
import { createGenresOptions, generateData } from "@/src/lib/utils";
import { OptionProps } from "@/src/types/base";
import { sortOptions } from "@/src/constants";

const b = block("filter");

const Filter = () => {
  const [selectedGenre, setSelectedGenre] = useState<OptionProps>(null);
  const [selectedDate, setSelectedDate] = useState<OptionProps>(null);
  const [SelectedSort, setSelectedSort] = useState<OptionProps>(sortOptions[1]);
  const [genresOptions, setGenresOptions] = useState<OptionProps[]>(null);
  const [dateOptions, setDateOptions] = useState<OptionProps[]>(
    generateData(50, 1850)
  );
  console.log("SelectedSort", SelectedSort);
  useEffect(() => {
    fetchGenres().then((data) => {
      setGenresOptions(createGenresOptions(data));
    });
  }, []);

  const onMenuScrollBottom = () => {
    setDateOptions(generateData(174, 1850));
  };
  const onMenuScrollToTop = () => {
    setDateOptions(generateData(50, 1850));
  };

  return (
    <section className={b()}>
      <div className={b("wrapper")}>
        <div>
          <p className={b("title")}>Ratings</p>
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
            />
            <Input
              placeholder="To"
              pattern="/^[0-9]+$/"
              startHandler={UpperArrow}
              endHandler={LowerArrow}
            />
          </div>
        </div>
        <Button style={{ marginTop: 30 }} type={ButtonType.Outline}>
          Reset filters
        </Button>
      </div>
      <div style={{ minWidth: 284 }}>
        <p className={b("title")}>Sort by</p>
        <CustomSelect
          className={b("sort-select")}
          onChange={setSelectedSort}
          value={SelectedSort}
          options={sortOptions}
          placeholder="Select genre"
        />
      </div>
    </section>
  );
};
export default Filter;
