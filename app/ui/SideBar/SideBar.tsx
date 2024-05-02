"use client";
import React from "react";
import "../styles/globals.css";
import "./sideBar.scss";
import { Button } from "@/app/components/Button/Button";
import Logo from "../../../public/icons/logo.svg";
import Image from "next/image";
import block from "bem-cn";

const b = block("sideBar");

export default function SideBar() {
  return (
    <div className={b()}>
      <div>
        <h2 className={b("title")}>
          <Image style={{ marginRight: 12 }} src={Logo} alt="Logo" />{" "}
          ArrowFlicks
        </h2>
      </div>
      <div className={b("btn-block")}>
        <Button contentStart style={{ marginBottom: 16 }}>
          Movies
        </Button>

        <Button contentStart>Rated movies</Button>
      </div>
    </div>
  );
}
