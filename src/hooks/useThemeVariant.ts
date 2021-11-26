import React from 'react'
import {grey} from "@mui/material/colors";
import IcecreamIcon from '@mui/icons-material/Icecream';
import ParkIcon from '@mui/icons-material/Park';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import {createTheme, SvgIconTypeMap, Theme} from "@mui/material";
import {OverridableComponent} from "@mui/material/OverridableComponent";

export interface ThemeVariant {
    name: string;
    title: string;
    primary: string;
    secondary: string;
    backgroundPrimary: string;
    backgroundSecondary: string;
    mode: 'light' | 'dark';
    divider: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {muiName: string}
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
        name: 'ice_cream',
        title: 'Ice Cream',
        icon: IcecreamIcon
    },
    {
        primary: `#E0AC84`,
        secondary: `#AC8466`,
        divider: `#E6D7CC`,
        backgroundPrimary: `#614A39`,
        backgroundSecondary: `#615B56`,
        mode: 'dark',
        name: 'forest',
        title: 'Forest',
        icon: ParkIcon
    },
    {
        primary: `#6F92BF`,
        secondary: `#334035`,
        divider: `#261A18`,
        backgroundPrimary: `#3B67BF`,
        backgroundSecondary: `#457ABF`,
        mode: 'dark',
        name: 'gaming',
        title: 'Gaming',
        icon: SportsEsportsIcon
    },
    {
        primary: `#F2CB05`,
        secondary: `#73260A`,
        divider: `#151340`,
        backgroundPrimary: `#151340`,
        backgroundSecondary: `#2B308C`,
        mode: 'dark',
        name: 'dwarves',
        title: 'Dwarves',
        icon: ChildCareIcon
    },
    {
        primary: `#91A646`,
        secondary: `#F2B705`,
        divider: `#D97904`,
        backgroundPrimary: `#590202`,
        backgroundSecondary: `#D91818`,
        mode: 'light',
        name: 'fast_food',
        title: 'Fast Food',
        icon: FastfoodIcon
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

            const textPrimary = modeColor === 'light' ? `#000000` : grey['50']
            const textSecondary = modeColor === 'light' ? grey['900'] : grey['400']

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
