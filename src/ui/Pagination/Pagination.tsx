"use client";
import React, { FC, SetStateAction } from "react";
import ReactPaginate from "react-paginate";
import Image from "next/image";
import block from "bem-cn";

import "./Pagination.scss";
import nextPaginationArrow from "../../../public/icons/nextPaginationArrow.svg";
import prevPaginationArrow from "../../../public/icons/prevPaginationArrow.svg";
import { Movies } from "@/src/types/base";

const b = block("pagination");

interface Props {
  isLoading: boolean;
  page: number;
  totalPages: number;
  setPage: React.Dispatch<SetStateAction<number>>;
}

export const initialPaginationInfo: Movies.PaginationInfo = {
  page: 0,
  totalPages: 0,
  totalResults: 0,
};

export const Pagination: FC<Props> = ({
  isLoading,
  page,
  totalPages,
  setPage,
}) => {
  if (totalPages <= 1) return;

  return (
    <ReactPaginate
      containerClassName={b("container", { loading: isLoading })}
      nextLabel={<Image alt="Next page" src={nextPaginationArrow} />}
      onPageChange={(selectedItem: { selected: number }) => {
        if (isLoading) return;
        setPage(selectedItem.selected);
      }}
      pageRangeDisplayed={3}
      marginPagesDisplayed={0}
      forcePage={page}
      breakLabel={0}
      pageCount={totalPages}
      previousLabel={<Image alt="Previous page" src={prevPaginationArrow} />}
    />
  );
};
