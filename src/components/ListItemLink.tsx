import * as React from "react";
import {
  NavLink as RouterLink,
  LinkProps as RouterLinkProps,
  useLocation,
} from "react-router-dom";
import { ListItem, ListItemText, useTheme } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
  exact?: boolean;
  onClick: () => void;
}

export function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to, exact } = props;
  const theme = useTheme();
  const location = useLocation();

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, "to">>(
        function Link(itemProps, ref) {
          return (
            <RouterLink
              strict
              to={to}
              ref={ref}
              {...itemProps}
              role={undefined}
              exact={exact || false}
              onClick={props.onClick}
            />
          );
        },
      ),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? (
          <ListItemIcon
            style={{
              color:
                location.pathname === to ? theme.palette.primary.main : "unset",
            }}
          >
            {icon}
          </ListItemIcon>
        ) : null}
        <ListItemText
          primary={primary}
          style={{
            color:
              location.pathname === to ? theme.palette.primary.main : "unset",
          }}
        />
      </ListItem>
    </li>
  );
}
