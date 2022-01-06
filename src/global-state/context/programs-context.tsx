import * as React from "react";
import { useHistory } from "react-router-dom";
import { ProgramInterface, programs } from "../../services/programs";
import WebFont from "webfontloader";
import { grey } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

export interface ProgramsContextInterface {
  toggleAppVariant: () => void;
  selectAppVariant: (av: ProgramInterface) => void;
  currAppVariant: ProgramInterface | null;
  appVariants: ProgramInterface[];
}

export const ProgramsContext = React.createContext<ProgramsContextInterface>({
  toggleAppVariant: () => {},
  selectAppVariant: () => {},
  currAppVariant: null,
  appVariants: [],
});

interface ProgramsProviderProps {
  children: React.ReactNode;
}

export const ProgramsProvider = (props: ProgramsProviderProps) => {
  const history = useHistory();

  const [currAppVariant, setCurrAppVariant] = React.useState<ProgramInterface>(
    () => {
      const themeName = window.localStorage.getItem("appVariant");
      if (themeName) {
        const appVariant = programs.find((t) => themeName === t.name);
        return appVariant || programs[0];
      } else {
        return programs[0];
      }
    }
  );

  const { toggleAppVariant, selectAppVariant } = React.useMemo(
    () => ({
      toggleAppVariant: () => {
        history.push("/");
        setCurrAppVariant((prevTheme) => {
          const foundIndex = programs.findIndex(
            (t) => t.name === prevTheme.name
          );
          const index = foundIndex === programs.length - 1 ? 0 : foundIndex + 1;
          const newTheme = programs[index];
          window.localStorage.setItem("appVariant", newTheme.name);
          return newTheme;
        });
      },
      selectAppVariant: (av: ProgramInterface) => {
        history.push("/");
        window.localStorage.setItem("appVariant", av.name);
        setCurrAppVariant(av);
      },
    }),
    []
  );

  const theme = React.useMemo(() => {
    const families = [
      currAppVariant.primaryFont,
      currAppVariant.secondaryFont,
      currAppVariant.textFont,
    ];
    if (currAppVariant.tertiaryFont) {
      families.push(currAppVariant.tertiaryFont);
    }
    WebFont.load({
      google: {
        families: families,
      },
    });

    const primaryFont = {
      fontFamily: [`"${currAppVariant.primaryFont}"`, "Roboto"].join(","),
    };
    const secondaryFont = {
      fontFamily: [`"${currAppVariant.secondaryFont}"`, "Roboto"].join(","),
    };

    const tertiaryFont = {
      fontFamily: [
        `"${
          currAppVariant.tertiaryFont
            ? currAppVariant.tertiaryFont
            : currAppVariant.secondaryFont
        }"`,
        "Roboto",
      ].join(","),
    };

    const textFont = {
      fontFamily: [`"${currAppVariant.textFont}"`, "sans-serif"].join(","),
    };
    const {
      mode: modeColor,
      primary,
      secondary,
      divider,
      backgroundPrimary,
      backgroundSecondary,
    } = currAppVariant;

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
      },
    });
  }, [currAppVariant]);

  return (
    <ProgramsContext.Provider
      value={{
        toggleAppVariant,
        selectAppVariant,
        currAppVariant,
        appVariants: programs,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </ProgramsContext.Provider>
  );
};
