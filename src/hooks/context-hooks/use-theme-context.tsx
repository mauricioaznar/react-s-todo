import React from "react";
import {
  ThemeContext,
  ProgramsContextInterface,
} from "../../global-state/context/theme-context";

export const useThemeContext: () => ProgramsContextInterface = () => {
  return React.useContext(ThemeContext);
};
