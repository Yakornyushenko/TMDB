"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { poppins } from "@/src/styles/fonts";
import { IS_HOME_PAGE, IS_RATED_PAGE } from "@/src/constants";
import block from "bem-cn";

import "../../styles/globals.css";
import "./sideBar.scss";
import Logo from "../../../public/icons/logo.svg";

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
          disabled={pathName === IS_HOME_PAGE}
          className={b("link")}
          style={{ marginBottom: 16 }}
          href={IS_HOME_PAGE}
        >
          Movies
        </Link>

        <Link
          disabled={pathName === IS_RATED_PAGE}
          className={b("link")}
          href={IS_RATED_PAGE}
        >
          Rated movies
        </Link>
      </div>
    </div>
  );
}
