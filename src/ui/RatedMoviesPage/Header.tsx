"use client";
import React, { FC, SetStateAction } from "react";
import { Input } from "@/src/components/Input/Input";
import block from "bem-cn";
import loupe from "../../../public/icons/loupe.svg";
import "./style.scss";

const b = block("header");

interface Props {
  setSearchValue: React.Dispatch<SetStateAction<string>>;
}

export const Header: FC<Props> = ({ setSearchValue }) => {
  return (
    <div className={b()}>
      <p
        style={{
          fontSize: 32,
          fontWeight: 700,
        }}
      >
        Rated movies
      </p>
      {
        <Input
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
