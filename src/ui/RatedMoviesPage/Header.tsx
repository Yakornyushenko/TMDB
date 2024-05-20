"use client";
import React, { FC, SetStateAction } from "react";
import { Input } from "@/src/components/Input/Input";
import loupe from "../../../public/icons/loupe.svg";
import "./style.scss";
import block from "bem-cn";

const b = block("header");

interface Props {
  setSearchValue: React.Dispatch<SetStateAction<string>>;
}

export const Header: FC<Props> = ({ setSearchValue }) => {
  return (
    <div className={b()}>
      <p className={b("title")}>Rated movies</p>
      {
        <Input
          className={b("input")}
          type="text"
          startHandler={loupe}
          endHandler={true}
          endHandlerText="Search"
          setValue={setSearchValue}
        />
      }
    </div>
  );
};
