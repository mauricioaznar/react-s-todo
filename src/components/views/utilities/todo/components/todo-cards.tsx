import EnhancedTodoContainerProps from "./i-todo-container-props";
import { FilterTodoColumn } from "../../../../../services/schema";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { TodoNode } from "../../../../../types/todo";
import { useTypedSelector } from "../../../../../hooks/redux-hooks/use-typed-selector";
import { useEditTodoClick } from "../hooks/use-edit-todo-click";
import { useDeleteTodo } from "../hooks/use-delete-todo";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { formatDate } from "../../../../../helpers/format-date";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";

export function EnhancedTodoCards(
  props: EnhancedTodoContainerProps<FilterTodoColumn>,
) {
  const { edges } = props;

  return (
    <Grid container>
      {edges?.map((item) => {
        const todoNode = item.node;
        return (
          todoNode && (
            <Grid
              key={todoNode?._id}
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                px: { sm: 2, md: 4 },
                py: { xs: 2, sm: 2, md: 0 },
              }}
            >
              <TodoCard todo={todoNode} />
            </Grid>
          )
        );
      })}
    </Grid>
  );
}

function TodoCard({ todo }: { todo: TodoNode }) {
  const { currentUser } = useTypedSelector((state) => state.auth);

  const { handleEditTodoClick } = useEditTodoClick();

  const { isDisabled, handleDeleteClick } = useDeleteTodo();

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {todo.description}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <span style={{ fontStyle: "normal", fontWeight: "bold" }}>
            {" "}
            due:{" "}
          </span>
          {formatDate(todo.due)}
        </Typography>
        <Typography variant="body2">
          <span style={{ fontStyle: "normal", fontWeight: "bold" }}>
            {" "}
            user:{" "}
          </span>{" "}
          {todo.user?.username}
        </Typography>
        <ul>
          {todo?.items.map((item) => (
            <li
              style={{
                textDecoration: item.completed ? "line-through" : undefined,
              }}
              key={item.description}
            >
              {item.description}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardActions style={{ display: "flex", alignItems: "center" }}>
        {currentUser?._id === todo.user?._id ? (
          <Button
            size={"small"}
            onClick={() => {
              handleEditTodoClick(todo);
            }}
          >
            Edit
          </Button>
        ) : null}
        {currentUser?._id === todo.user?._id ? (
          <Button
            disabled={isDisabled}
            size={"small"}
            onClick={async () => {
              await handleDeleteClick(todo);
            }}
          >
            Delete
          </Button>
        ) : null}
        <Box style={{ flexGrow: 1, display: "flex", justifyContent: "end" }}>
          {todo.locked ? (
            <LockRoundedIcon fontSize={"medium"} />
          ) : (
            <LockOpenRoundedIcon fontSize={"medium"} />
          )}
        </Box>
      </CardActions>
    </Card>
  );
}
