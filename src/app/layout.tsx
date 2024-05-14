"use client";
import React from "react";
import SideBar from "@/src/ui/SideBar/SideBar";
import { inter } from "@/src/styles/fonts";
import { IS_EMPTY_PAGE, IS_HOME_PAGE, IS_RATED_PAGE } from "@/src/constants";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={inter.className}>
        {(pathname === IS_HOME_PAGE ||
          pathname === IS_RATED_PAGE ||
          pathname === IS_EMPTY_PAGE) && <SideBar />}
        {children}
      </body>
    </html>
  );
}
