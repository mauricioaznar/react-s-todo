import { EnhancedTableHeadProps } from "./types";
import * as React from "react";
import TableCell from "@mui/material/TableCell";
import { TableSortLabel } from "@mui/material";

export default function EnhancedTableHead<T>(props: EnhancedTableHeadProps<T>) {
  const { onRequestSort, order, orderBy, title, width } = props;

  const createSortHandler =
    (property: T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableCell
      width={width ? width : "auto"}
      sortDirection={orderBy === title && order !== null ? order : false}
    >
      <TableSortLabel
        active={orderBy === title}
        direction={orderBy === title && order !== null ? order : "asc"}
        onClick={createSortHandler(title)}
      >
        {title}
      </TableSortLabel>
    </TableCell>
  );
}
