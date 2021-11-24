import * as React from "react";
import {ColumnOrder} from "../../schema";

export interface EnhancedTableProps<T> {
    onRequestSort: (event: React.MouseEvent<unknown>, property: T) => void;
    order: ColumnOrder;
    orderBy: T |  null;
}

export interface EnhancedTableHeadProps<T> extends EnhancedTableProps<T> {
    title: T;
    width?: string;
}
