import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";
import Home from "../components/views/home/Home";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UserForm from "../components/views/auth/user-form";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import UserList from "../components/views/auth/user-list";
import PetsIcon from "@mui/icons-material/Pets";
import Inputs from "../components/views/forms/formik/formik-inputs";
import CatList from "../components/views/forms/cat/cat-list";
import { CatForm } from "../components/views/forms/cat/cat-form";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TodoList from "../components/views/utilities/todo/todo-list";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import TodoForm from "../components/views/utilities/todo/todo-form";
import NoteForm from "../components/views/utilities/todo/note-form";
import NoteList from "../components/views/utilities/todo/note-list";
import FormikNestedInputs from "../components/views/forms/formik/formik-nested-inputs/formik-nested-inputs";
import { Route, RouteGroup } from "../types/route";
import UiEngineering from "../components/views/ui-engineering/ui-engineering";

export const routeGroups: RouteGroup[] = [
  {
    title: "Auth",
    routes: [
      {
        icon: <HomeIcon />,
        name: "Home",
        path: "/",
        component: <Home />,
        title: "Sign in",
        exact: true,
      },
      {
        icon: <PersonAddIcon />,
        name: "SignInForm",
        path: "/signInForm",
        component: <UserForm />,
        title: "Sign in",
      },
      {
        icon: <PeopleAltIcon />,
        name: "UserList",
        path: "/users",
        component: <UserList />,
        navbar: true,
        title: "Users",
      },
    ],
  },
  {
    title: "Forms",
    routes: [
      {
        icon: <PetsIcon />,
        name: "Formik inputs",
        path: "/formikInputs",
        component: <Inputs />,
        navbar: true,
        title: "Formik inputs",
      },
      {
        icon: <PetsIcon />,
        name: "Nested inputs",
        path: "/formikNestedInputs",
        component: <FormikNestedInputs />,
        navbar: true,
        title: "Form nested inputs",
      },
      {
        icon: <PetsIcon />,
        name: "CatList",
        path: "/cats",
        component: <CatList />,
        navbar: true,
        title: "Form example",
      },
      {
        icon: <PetsIcon />,
        name: "CatForm",
        path: "/catForm",
        component: <CatForm />,
        navbar: false,
        title: "Form example",
      },
    ],
  },
  {
    title: "Utilities",
    routes: [
      {
        icon: <FormatListBulletedIcon />,
        name: "TodoList",
        path: "/todos",
        component: <TodoList archived={false} />,
        navbar: true,
        title: "Todos",
      },
      {
        icon: <FormatListBulletedIcon />,
        name: "Archive",
        path: "/archive",
        component: <TodoList archived={true} />,
        navbar: true,
        title: "Todo archive",
      },
      {
        icon: <PlaylistAddIcon />,
        name: "TodoForm",
        path: "/todoForm",
        component: <TodoForm />,
        title: "todo",
      },
      {
        icon: <PlaylistAddIcon />,
        name: "NoteForm",
        path: "/noteForm",
        component: <NoteForm />,
        title: "Notes",
      },
      {
        icon: <PlaylistAddIcon />,
        name: "Notes",
        path: "/notes",
        navbar: true,
        component: <NoteList />,
        title: "Notes",
      },
    ],
  },
  {
    title: "Other",
    routes: [
      {
        icon: <PlaylistAddIcon />,
        name: "UiEngineering",
        path: "/uiEngineering",
        navbar: true,
        component: <UiEngineering />,
        title: "Ui engineering",
      },
    ],
  },
];

export const routes: Route[] = routeGroups.reduce((acc, curr) => {
  const routes = curr.routes;
  return acc.concat(routes);
}, [] as Route[]);
