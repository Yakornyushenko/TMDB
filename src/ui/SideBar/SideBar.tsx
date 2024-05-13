"use client";

import React from "react";
import "../../styles/globals.css";
import "./sideBar.scss";
import Logo from "../../../public/icons/logo.svg";

import Image from "next/image";
import block from "bem-cn";
import Link from "next/link";
import { poppins } from "@/src/styles/fonts";
import { usePathname } from "next/navigation";

const b = block("sideBar");

export default function SideBar() {
  const pathName = usePathname();
  return (
    <div className={b()}>
      <div>
        <h2 className={`${poppins.className} ${b("title")}`}>
          <Image style={{ marginRight: 12 }} src={Logo} alt="Logo" />
          ArrowFlicks
        </h2>
      </div>

      <div className={b("btn-block")}>
        <Link
          disabled={pathName === "/"}
          className={b("link")}
          style={{ marginBottom: 16 }}
          href="/"
        >
          Movies
        </Link>

        <Link
          disabled={pathName === "/ratedMovies"}
          className={b("link")}
          href="/ratedMovies"
        >
          Rated movies
        </Link>
      </div>
    </div>
  );
}
