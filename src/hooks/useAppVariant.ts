import React from 'react'
import {grey} from "@mui/material/colors";
import {createTheme, Theme} from "@mui/material";
import WebFont from 'webfontloader'
import {AppVariant, appVariants} from "../services/app-variants";
import {useHistory} from "react-router-dom";


interface AppVariantContextInterface {
    toggleAppVariant: () => void;
    appVariant: AppVariant | null;
}




export const AppVariantContext = React.createContext<AppVariantContextInterface>(
    {
        toggleAppVariant: () => {
        },
        appVariant: null
    }
);


export const useAppVariant: () => { appVariantContextValue: AppVariantContextInterface, theme: Theme } = () => {


    const history = useHistory()

    const [appVariant, setAppVariant] = React.useState<AppVariant>(
        () => {
            const themeName = window.localStorage.getItem('appVariant')
            if (themeName) {
                const appVariant = appVariants.find(t => themeName === t.name)
                return appVariant || appVariants[0]
            } else {
                return appVariants[0]
            }
        }
    );


    const {toggleAppVariant} = React.useMemo(
        () => ({
            toggleAppVariant: () => {
                history.push('/')
                setAppVariant((prevTheme) => {
                    const foundIndex = appVariants.findIndex(t => t.name === prevTheme.name)
                    const index = foundIndex === appVariants.length - 1 ? 0 : foundIndex + 1;
                    const newTheme = appVariants[index]
                    window.localStorage.setItem('appVariant', newTheme.name)
                    return newTheme
                });
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () => {

            WebFont.load({
                google: {
                    families: [appVariant.primaryFont, appVariant.secondaryFont,  appVariant.textFont],
                },
            })

            const primaryFont = {
                fontFamily: [
                    `"${appVariant.primaryFont}"`,
                    'Roboto'
                ].join(',')
            }
            const secondaryFont = {
                fontFamily: [
                    `"${appVariant.secondaryFont}"`,
                    'Roboto'
                ].join(',')
            } 
            
            const textFont = {
                fontFamily: [
                    `"${appVariant.textFont}"`,
                    'sans-serif'
                ].join(',')
            }
            const {mode: modeColor, primary, secondary, divider, backgroundPrimary, backgroundSecondary} = appVariant

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
                    ...textFont,
                    h1: primaryFont,
                    h2: primaryFont,
                    h3: primaryFont,
                    h4: secondaryFont,
                    h5: secondaryFont,
                    h6: secondaryFont,

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
        [appVariant],
    );

    return {
        appVariantContextValue: {
            toggleAppVariant,
            appVariant
        },
        theme
    }
}
