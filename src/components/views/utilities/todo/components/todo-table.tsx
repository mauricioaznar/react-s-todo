import EnhancedTodoContainerProps from "./i-todo-container-props";
import { FilterTodoColumn } from "../../../../../services/schema";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import EnhancedTableHead from "../../../../dum/enhanced-table/enhanced-table-head";
import TableBody from "@mui/material/TableBody";
import { TodoNode } from "../../../../../types/todo";
import { useTypedSelector } from "../../../../../hooks/redux-hooks/use-typed-selector";
import { useEditTodoClick } from "../hooks/use-edit-todo-click";
import { useDeleteTodo } from "../hooks/use-delete-todo";
import * as React from "react";
import { Box, IconButton } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import { formatDate } from "../../../../../helpers/format-date";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

export function EnhancedTodoTable(
  props: EnhancedTodoContainerProps<FilterTodoColumn>,
) {
  const { onRequestSort, order, orderBy, edges } = props;

  return (
    <TableContainer
      component={Paper}
      sx={{ overflowY: "hidden", overflowX: "hidden" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={"10%"}>&nbsp;</TableCell>
            <EnhancedTableHead
              onRequestSort={onRequestSort}
              order={order}
              title={FilterTodoColumn.Description}
              orderBy={orderBy}
              width={"30%"}
            />
            <EnhancedTableHead
              onRequestSort={onRequestSort}
              order={order}
              title={FilterTodoColumn.Due}
              orderBy={orderBy}
              width={"20%"}
            />
            <TableCell width={"10%"}>Completed</TableCell>
            <TableCell width={"20%"}>User</TableCell>
            <TableCell width={"10%"}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {edges?.map((item) => {
            const todoNode = item.node;
            return (
              todoNode && (
                <TableRow key={todoNode?._id}>
                  <TodoCells todo={todoNode} />
                </TableRow>
              )
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function TodoCells({ todo }: { todo: TodoNode }) {
  const { currentUser } = useTypedSelector((state) => state.auth);

  const { handleEditTodoClick } = useEditTodoClick();

  const { isDisabled, handleDeleteClick } = useDeleteTodo();

  return (
    <React.Fragment>
      <TableCell align={"center"}>
        <Box
          sx={{
            "& > :not(style)": {
              m: 2,
            },
          }}
        >
          {todo.locked ? (
            <LockRoundedIcon fontSize={"medium"} />
          ) : (
            <LockOpenRoundedIcon fontSize={"medium"} />
          )}
        </Box>
      </TableCell>
      <TableCell>{todo.description}</TableCell>
      <TableCell>{formatDate(todo.due)}</TableCell>
      <TableCell>{todo.completed_percentage}</TableCell>
      <TableCell>{todo.user?.username}</TableCell>
      <TableCell>
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
          }}
        >
          {currentUser?._id === todo.user?._id ? (
            <IconButton
              size={"small"}
              onClick={() => {
                handleEditTodoClick(todo);
              }}
            >
              <CreateIcon fontSize={"small"} />
            </IconButton>
          ) : null}
          {currentUser?._id === todo.user?._id ? (
            <IconButton
              disabled={isDisabled}
              size={"small"}
              onClick={async () => {
                await handleDeleteClick(todo);
              }}
            >
              <DeleteIcon fontSize={"small"} />
            </IconButton>
          ) : null}
        </Box>
      </TableCell>
    </React.Fragment>
  );
}
