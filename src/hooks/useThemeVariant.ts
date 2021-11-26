import React from 'react'
import {grey} from "@mui/material/colors";
import {createTheme, Theme} from "@mui/material";

export interface ThemeVariant {
    name: string;
    title: string;
    primary: string;
    secondary: string;
    backgroundPrimary: string;
    backgroundSecondary: string;
    mode: 'light' | 'dark';
    divider: string;
}


interface ThemeVariantContextInterface {
    toggleThemeVariant: () => void;
    themeVariant: ThemeVariant | null;
}

const themes: ThemeVariant[] = [
    {
        primary: `#D98014`,
        secondary: `#9937A6`,
        divider: `#D98014`,
        backgroundPrimary: `#5FA0D9`,
        backgroundSecondary: `#9ABBD9`,
        mode: 'light',
        name: 'gum',
        title: 'Gum'
    },
    {
        primary: `#E0AC84`,
        secondary: `#AC8466`,
        divider: `#E6D7CC`,
        backgroundPrimary: `#614A39`,
        backgroundSecondary: `#615B56`,
        mode: 'dark',
        name: 'wood',
        title: 'Wood'
    },
    {
        primary: `#6F92BF`,
        secondary: `#334035`,
        divider: `#261A18`,
        backgroundPrimary: `#3B67BF`,
        backgroundSecondary: `#457ABF`,
        mode: 'dark',
        name: 'gaming',
        title: 'Gaming'
    },
    {
        primary: `#F2CB05`,
        secondary: `#73260A`,
        divider: `#F27405`,
        backgroundPrimary: `#151340`,
        backgroundSecondary: `#2B308C`,
        mode: 'dark',
        name: 'dwarves',
        title: 'Dwarves'
    }
]

export const ThemeVariantContext = React.createContext<ThemeVariantContextInterface>(
    { toggleThemeVariant: () => {}, themeVariant: null }
);


export const useThemeVariant: () => { themeVariantContextValue: ThemeVariantContextInterface, theme: Theme } = () => {


    const [themeVariant, setThemeVariant] = React.useState<ThemeVariant>(
        () => {
            const themeName = window.localStorage.getItem('theme')
            if (themeName) {
                const theme = themes.find(t => themeName === t.name)
                return theme || themes[0]
            } else {
                return themes[0]
            }
        }
    );

    const { toggleThemeVariant } = React.useMemo(
        () => ({
            toggleThemeVariant: () => {
                setThemeVariant((prevTheme) => {
                    const foundIndex = themes.findIndex(t => t.name === prevTheme.name)
                    const index = foundIndex  === themes.length - 1 ? 0 : foundIndex + 1;
                    const newTheme = themes[index]
                    window.localStorage.setItem('theme', newTheme.name)
                    return newTheme
                });
            },
        }),
        [],
    );




    const theme = React.useMemo(
        () => {
            const displayFont = {
                fontFamily: [
                    '"Bebas Neue"',
                    'cursive'
                ].join(',')
            }
            const sansFont = {
                fontFamily: [
                    '"Nunito"',
                    'sans-serif'
                ].join(',')
            }
            const { mode: modeColor, primary, secondary, divider, backgroundPrimary, backgroundSecondary } = themeVariant

            const textPrimary = modeColor === 'light' ? grey["900"] : grey['50']
            const textSecondary = modeColor === 'light' ? grey['500'] : grey['50']

            return createTheme({
                palette: {
                    mode: modeColor,
                    primary: {
                        main: primary
                    },
                    secondary: {
                        main: secondary
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
                    ...sansFont,
                    h1: displayFont,
                    h2: displayFont,
                    h3: displayFont,
                    h4: displayFont,
                    h5: displayFont,
                    h6: displayFont,

                },
                components: {
                    // Name of the component
                    MuiTableCell: {
                        styleOverrides: {
                            // Name of the slot
                            root: {
                                // Some CSS
                                borderBottom: '1px solid transparent',
                                borderBottomColor: divider
                            },
                        },
                    },
                    MuiDrawer: {
                        styleOverrides: {
                            paper: {
                                backgroundColor: secondary,
                                color: textPrimary
                            }
                        }
                    },
                    MuiAppBar: {
                        styleOverrides: {
                            root: {
                                backgroundColor: secondary,
                                color: textPrimary
                            }
                        }
                    }
                },
            })
        },
        [themeVariant],
    );

    return {
        themeVariantContextValue: {
            toggleThemeVariant,
            themeVariant
        },
        theme
    }
}
