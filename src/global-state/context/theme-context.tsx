import * as React from "react";
import { themes } from "../../services/themes";
import WebFont from "webfontloader";
import { grey } from "@mui/material/colors";
import {
  createTheme,
  Theme as MuiTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Theme } from "../../types/theme";

export interface ProgramsContextInterface {
  toggleTheme: () => void;
  selectTheme: (av: Theme) => void;
  currentTheme: Theme | null;
  themes: Theme[];
}

const THEME_LOCAL_STORAGE_CONSTANT = "theme";

export const ThemeContext = React.createContext<ProgramsContextInterface>({
  toggleTheme: () => {},
  selectTheme: () => {},
  currentTheme: null,
  themes: [],
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = React.useState<Theme>(() => {
    const themeName = window.localStorage.getItem(THEME_LOCAL_STORAGE_CONSTANT);
    if (themeName) {
      const theme = themes.find((t) => themeName === t.name);
      return theme || themes[0];
    } else {
      return themes[0];
    }
  });

  const { toggleTheme, selectTheme } = React.useMemo(
    () => ({
      toggleTheme: () => {
        setCurrentTheme((prevTheme) => {
          const foundIndex = themes.findIndex((t) => t.name === prevTheme.name);
          const index = foundIndex === themes.length - 1 ? 0 : foundIndex + 1;
          const newTheme = themes[index];
          window.localStorage.setItem(
            THEME_LOCAL_STORAGE_CONSTANT,
            newTheme.name,
          );
          return newTheme;
        });
      },
      selectTheme: (av: Theme) => {
        window.localStorage.setItem(THEME_LOCAL_STORAGE_CONSTANT, av.name);
        setCurrentTheme(av);
      },
    }),
    [],
  );

  const muiTheme: MuiTheme = React.useMemo(() => {
    const families = [
      currentTheme.primaryFont,
      currentTheme.secondaryFont,
      currentTheme.textFont,
    ];
    if (currentTheme.tertiaryFont) {
      families.push(currentTheme.tertiaryFont);
    }

    WebFont.load({
      google: {
        families: families,
      },
    });

    const primaryFont = {
      fontFamily: [`"${currentTheme.primaryFont}"`, "Roboto"].join(","),
    };
    const secondaryFont = {
      fontFamily: [`"${currentTheme.secondaryFont}"`, "Roboto"].join(","),
    };

    const tertiaryFont = {
      fontFamily: [
        `"${
          currentTheme.tertiaryFont
            ? currentTheme.tertiaryFont
            : currentTheme.secondaryFont
        }"`,
        "Roboto",
      ].join(","),
    };

    const textFont = {
      fontFamily: [`"${currentTheme.textFont}"`, "sans-serif"].join(","),
    };
    const {
      mode: modeColor,
      primary,
      secondary,
      divider,
      backgroundPrimary,
      backgroundSecondary,
    } = currentTheme;

    const textPrimary = modeColor === "light" ? `#000000` : grey["50"];
    const textSecondary = modeColor === "light" ? grey["900"] : grey["400"];

    return createTheme({
      palette: {
        mode: modeColor,
        primary: {
          main: primary,
        },
        secondary: {
          main: secondary,
        },
        divider: divider,
        background: {
          default: backgroundPrimary,
          paper: backgroundSecondary,
        },
        text: {
          primary: textPrimary,
          secondary: textSecondary,
        },
      },
      typography: {
        ...textFont,
        h1: primaryFont,
        h2: primaryFont,
        h3: secondaryFont,
        h4: secondaryFont,
        h5: tertiaryFont,
        h6: tertiaryFont,
      },
      components: {
        // Name of the component
        MuiTableCell: {
          styleOverrides: {
            // Name of the slot
            root: {
              // Some CSS
              borderBottom: "1px solid transparent",
              borderBottomColor: divider,
            },
          },
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundColor: secondary,
              color: textPrimary,
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor: secondary,
              color: textPrimary,
            },
          },
        },
        MuiListSubheader: {
          styleOverrides: {
            root: {
              backgroundColor: "transparent",
              lineHeight: "2rem",
            },
          },
        },
      },
    });
  }, [currentTheme]);

  return (
    <ThemeContext.Provider
      value={{
        toggleTheme: toggleTheme,
        selectTheme: selectTheme,
        currentTheme: currentTheme,
        themes: themes,
      }}
    >
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {props.children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
