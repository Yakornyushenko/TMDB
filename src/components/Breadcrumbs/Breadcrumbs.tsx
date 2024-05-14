"use client";
import React, { FC } from "react";
import "./Breadcrumbs.scss";
import block from "bem-cn";
import Link from "next/link";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}
interface PropsBreadcrumbs {
  breadcrumbs: Breadcrumb[];
}

const b = block("breadcrumbs");

export const Breadcrumbs: FC<PropsBreadcrumbs> = ({ breadcrumbs }) => {
  return (
    <nav className={b()}>
      <ul className={b("list")}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li className={b("item")} key={index}>
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>

            {index < breadcrumbs.length - 1 ? (
              <span className={b("slash")}>/</span>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
};
