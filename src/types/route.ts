import { ReactElement } from "react";

export interface Route {
  title: string;
  icon?: ReactElement<any, any>;
  name: string;
  path: string;
  component: ReactElement<any, any>;
  exact?: boolean;
  navbar?: boolean;
}

export interface RouteGroup {
  title: string;
  routes: Route[];
}
