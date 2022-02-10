import * as React from "react";
import { ReactElement } from "react";
import HomeIcon from "@mui/icons-material/Home";
import Home from "../components/views/home/Home";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UserForm from "../components/views/auth/UserForm";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import UserList from "../components/views/auth/UserList";
import PetsIcon from "@mui/icons-material/Pets";
import FormikForm from "../components/views/forms/cat/FormikForm";
import CatList from "../components/views/forms/cat/CatList";
import { CatForm } from "../components/views/forms/cat/CatForm";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TodoList from "../components/views/utilities/todo/todo-list";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import TodoForm from "../components/views/utilities/todo/todo-form";
import NoteForm from "../components/views/utilities/todo/note-form";
import NoteList from "../components/views/utilities/todo/note-list";
import { Route } from "../types/route";
import UiEngineering from "../components/views/ui-engineering/ui-engineering";

export const routes: Route[] = [
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
  {
    icon: <PetsIcon />,
    name: "FormikForm",
    path: "/formikForm",
    component: <FormikForm />,
    navbar: true,
    title: "Formik inputs",
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
  {
    icon: <PlaylistAddIcon />,
    name: "UiEngineering",
    path: "/uiEngineering",
    navbar: true,
    component: <UiEngineering />,
    title: "Ui engineering",
  },
];
