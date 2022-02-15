import React from "react";
import { Pagination } from "@mui/material";

interface OffsetPaginatorArrowsProps {
  setPage: (num: number) => void;
  count: number;
  perPage: number;
  page: number;
}

export function OffsetPaginatorArrows(props: OffsetPaginatorArrowsProps) {
  const { setPage, count, perPage, page } = props;
  console.log("count", count, "perPage", perPage, "page", page);

  const pageCount = Math.ceil(count / perPage);

  return (
    <Pagination
      count={pageCount}
      page={page}
      onChange={(e, value) => {
        setPage(value);
      }}
    />
  );
}
