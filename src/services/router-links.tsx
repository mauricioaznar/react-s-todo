import * as React from "react";
import { ReactElement } from "react";
import HomeIcon from "@mui/icons-material/Home";
import Home from "../programs/home/Home";

export interface RouterLink {
  title: string;
  icon?: ReactElement<any, any>;
  name: string;
  path: string;
  component: ReactElement<any, any>;
  exact?: boolean;
  navbar?: boolean;
}

export const commonLinks: RouterLink[] = [
  {
    icon: <HomeIcon />,
    name: "Home",
    path: "/",
    component: <Home />,
    title: "Sign in",
    exact: true,
  },
];
