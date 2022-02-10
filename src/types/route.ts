import { ReactElement } from "react";
import { Route } from "@mui/icons-material";

export interface Route {
  title: string;
  icon?: ReactElement<any, any>;
  name: string;
  path: string;
  component: ReactElement<any, any>;
  exact?: boolean;
  navbar?: boolean;
}
