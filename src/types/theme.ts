import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

export interface Theme {
  name: string;
  title: string;
  description: string;
  primary: string;
  secondary: string;
  backgroundPrimary: string;
  backgroundSecondary: string;
  mode: "light" | "dark";
  divider: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  primaryFont: string;
  secondaryFont: string;
  tertiaryFont?: string;
  textFont: string;
}
