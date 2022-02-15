import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

// mui
import AddIcon from "@mui/icons-material/Add";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Fab,
  IconButton,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";

// local
import {
  ColumnOrder,
  FilterTodoColumn,
  useGetTodosQuery,
} from "../../../../services/schema";
import {
  YEAR_MONTH_FORMAT,
  YEAR_MONTH_MASK,
} from "../../../../helpers/format-date";
import LocalStorage from "../../../../helpers/local-storage";
import { useGraphqlPagination } from "../../../../hooks/server-hooks/use-graphql-pagination";
import ClearableDatePicker from "../../../dum/clearable-date-picker/clearable-date-picker";
import { useMenu } from "../../../../hooks/material-ui-hooks/use-menu";
import PageLoader from "../../../dum/loaders/page-loader";
import { EnhancedTodoCards } from "./components/todo-cards";
import { EnhancedTodoTable } from "./components/todo-table";

// constants
const TODO_AFTER = "todo_after";
const TODO_LIMIT = "todo_limit";
const TODO_BEFORE = "todo_before";
const TODO_DUE = "todo_due";
const TODO_COMPLETED = "todo_completed";
const TODO_VIEW = "todo_view";

interface TodoListProps {
  archived?: boolean;
}

export default function TodoList({ archived = false }: TodoListProps) {
  const history = useHistory();

  const [order, setOrder] = React.useState<ColumnOrder>(ColumnOrder.Desc);
  const [orderBy, setOrderBy] = React.useState<FilterTodoColumn>(
    FilterTodoColumn.Id,
  );
  const [view, setView] = React.useState(LocalStorage.getBoolean(TODO_VIEW));
  const [completed, setCompleted] = useState(
    LocalStorage.getBoolean(TODO_COMPLETED),
  );
  const [due, setDue] = useState<string | null>(
    LocalStorage.getMomentDate(TODO_DUE, YEAR_MONTH_FORMAT),
  );

  const { handleClick, handleClose, open, anchorEl } = useMenu();

  const { limit, after, before, setBefore, setAfter, resetGraphqlPagination } =
    useGraphqlPagination({
      afterKey: TODO_AFTER,
      beforeKey: TODO_BEFORE,
      limitKey: TODO_LIMIT,
      limit: 10,
    });

  const { loading, data } = useGetTodosQuery({
    variables: {
      archived: archived,
      completed: archived ? null : completed,
      due: due,
      limit: limit,
      after: after,
      before: before,
      order: order,
      orderBy: orderBy,
    },
  });

  const edges = data?.todos.page.edges;
  const offset = data?.todos?.pageData?.offset || 0;
  const count = data?.todos?.pageData?.count || 0;
  const forwardDisabled = data?.todos?.pageData
    ? offset >= count - (limit ? limit : 0)
    : true;

  function handleCreateClick() {
    history.push("/todoForm");
  }

  function handleOrderBy(
    event: React.MouseEvent<unknown>,
    property: FilterTodoColumn,
  ) {
    if (property !== orderBy) {
      setOrderBy(property);
      setOrder(ColumnOrder.Asc);
    } else if (property === orderBy && order === ColumnOrder.Asc) {
      setOrder(ColumnOrder.Desc);
    } else if (property === orderBy && order === null) {
      setOrder(ColumnOrder.Asc);
      setOrderBy(property);
    } else {
      setOrderBy(FilterTodoColumn.Id);
      setOrder(ColumnOrder.Desc);
    }
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container alignItems={"center"} mb={2}>
        <Grid item xs>
          {<Typography variant={"h4"}>Todos</Typography>}
        </Grid>
        <Grid item>
          <Grid container spacing={2} alignItems={"center"}>
            <Grid item>
              <IconButton
                disabled={data?.todos?.pageData?.offset === 0}
                onClick={() => {
                  if (edges && edges.length > 0) {
                    setBefore(edges[0].cursor);
                  } else if (edges && edges.length === 0 && offset > 0) {
                    setBefore(after);
                  } else {
                    setBefore(null);
                  }
                }}
              >
                <ArrowBackIosIcon fontSize={"medium"} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                disabled={forwardDisabled}
                onClick={() => {
                  const newCursor =
                    edges && edges.length > 0
                      ? edges[edges.length - 1].cursor
                      : null;
                  setAfter(newCursor);
                }}
              >
                <ArrowForwardIosIcon fontSize={"medium"} />
              </IconButton>
            </Grid>
            {/* MENU */}
            <Grid item>
              <IconButton
                id="demo-positioned-button"
                aria-controls="demo-positioned-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <ListItem>
                  <ClearableDatePicker
                    views={due ? ["month"] : ["year", "month"]}
                    mask={YEAR_MONTH_MASK}
                    inputFormat={YEAR_MONTH_FORMAT}
                    label={"Selected due"}
                    value={due}
                    onChange={(newValue) => {
                      setDue(newValue);
                      if (newValue !== null) {
                        LocalStorage.saveMomentDate(
                          newValue,
                          TODO_DUE,
                          YEAR_MONTH_FORMAT,
                        );
                      } else {
                        LocalStorage.removeItem(TODO_DUE);
                      }
                    }}
                  />
                </ListItem>
                {!archived ? (
                  <MenuItem
                    onClick={() => {
                      const newCompleted = !completed;
                      LocalStorage.saveBoolean(newCompleted, TODO_COMPLETED);
                      setCompleted(newCompleted);
                      resetGraphqlPagination();
                    }}
                  >
                    <ListItemIcon>
                      {completed ? (
                        <CheckBoxIcon fontSize={"medium"} />
                      ) : (
                        <CheckBoxOutlineBlankIcon fontSize={"medium"} />
                      )}
                    </ListItemIcon>
                    {completed ? "Completed" : "Uncompleted"}
                  </MenuItem>
                ) : null}
                <MenuItem
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={() => {
                    const newView = !view;
                    LocalStorage.saveBoolean(newView, TODO_VIEW);
                    setView(newView);
                  }}
                >
                  <ListItemIcon>
                    {view ? (
                      <ViewModuleIcon fontSize={"medium"} />
                    ) : (
                      <ViewHeadlineIcon fontSize={"medium"} />
                    )}
                  </ListItemIcon>
                  {view ? "Cards" : "Table"}
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          {loading ? (
            <PageLoader />
          ) : view ? (
            <EnhancedTodoCards
              edges={edges}
              onRequestSort={handleOrderBy}
              order={order}
              orderBy={orderBy}
            />
          ) : (
            <EnhancedTodoTable
              edges={edges}
              onRequestSort={handleOrderBy}
              order={order}
              orderBy={orderBy}
            />
          )}
        </Grid>
      </Grid>

      <Fab
        sx={{
          margin: 0,
          top: "auto",
          right: 20,
          bottom: 20,
          position: "fixed",
          left: "auto",
        }}
        size={"large"}
        color="primary"
        aria-label="add"
        onClick={handleCreateClick}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
}
