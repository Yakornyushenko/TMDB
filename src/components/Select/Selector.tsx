"use client";
import React, { FC } from "react";
import Select from "react-select/base";

export interface Props {
  placeholder: "Выбрать";
  loadingMessage: () => "Загрузка...";
  components: {};
}
export const Selector: FC<Props> = ({}) => {
  return (
    <div>
      {/*<Select*/}
      {/*  inputValue={}*/}
      {/*  onChange={}*/}
      {/*  onInputChange={}*/}
      {/*  onMenuClose={}*/}
      {/*  onMenuOpen={}*/}
      {/*  value={}*/}
      {/*></Select>*/}
    </div>
  );
};

export default Selector;
