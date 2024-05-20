"use client";
import Image from "next/image";
import image404 from "../../../public/icons/404.png";
import block from "bem-cn";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/Button/Button";
import { poppins } from "@/src/styles/fonts";
import Logo from "@/public/icons/logo.svg";
import React from "react";
import "./CustomNotFound.scss";

const b = block("customNotFound");
export const CustomNotFound = () => {
  const router = useRouter();

  return (
    <div className={b()}>
      <div className={b("logo")}>
        <h2 className={`${poppins.className} ${b("title")}`}>
          <Image src={Logo} alt="Logo" />
          ArrowFlicks
        </h2>
      </div>
      <div className={b("content")}>
        <Image
          className={b("error-image")}
          src={image404}
          alt="Page not found"
        />
        <p className={b("text")}>We can’t find the page you are looking for</p>
        <Button onClick={() => router.push("/")} style={{ width: 103 }}>
          Go Home
        </Button>
      </div>
    </div>
  );
};
