import React from 'react'
import {grey} from "@mui/material/colors";
import {createTheme, Theme} from "@mui/material";
import WebFont from 'webfontloader'
import {AppVariant, appVariants} from "../services/app-variants";
import {useHistory} from "react-router-dom";


interface AppVariantContextInterface {
    toggleAppVariant: () => void;
    selectAppVariant: (av: AppVariant) => void;
    currAppVariant: AppVariant | null;
    appVariants: AppVariant[]
}




export const AppVariantContext = React.createContext<AppVariantContextInterface>(
    {
        toggleAppVariant: () => {
        },
        selectAppVariant: () => {},
        currAppVariant: null,
        appVariants: []
    }
);


export const useAppVariant: () => { appVariantContextValue: AppVariantContextInterface, theme: Theme } = () => {


    const history = useHistory()

    const [currAppVariant, setCurrAppVariant] = React.useState<AppVariant>(
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


    const {toggleAppVariant, selectAppVariant} = React.useMemo(
        () => ({
            toggleAppVariant: () => {
                history.push('/')
                setCurrAppVariant((prevTheme) => {
                    const foundIndex = appVariants.findIndex(t => t.name === prevTheme.name)
                    const index = foundIndex === appVariants.length - 1 ? 0 : foundIndex + 1;
                    const newTheme = appVariants[index]
                    window.localStorage.setItem('appVariant', newTheme.name)
                    return newTheme
                });
            },
            selectAppVariant: (av: AppVariant) => {
                history.push('/')
                window.localStorage.setItem('appVariant', av.name)
                setCurrAppVariant(av);
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () => {

            WebFont.load({
                google: {
                    families: [currAppVariant.primaryFont, currAppVariant.secondaryFont,  currAppVariant.textFont],
                },
            })

            const primaryFont = {
                fontFamily: [
                    `"${currAppVariant.primaryFont}"`,
                    'Roboto'
                ].join(',')
            }
            const secondaryFont = {
                fontFamily: [
                    `"${currAppVariant.secondaryFont}"`,
                    'Roboto'
                ].join(',')
            } 
            
            const textFont = {
                fontFamily: [
                    `"${currAppVariant.textFont}"`,
                    'sans-serif'
                ].join(',')
            }
            const {mode: modeColor, primary, secondary, divider, backgroundPrimary, backgroundSecondary} = currAppVariant

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
        [currAppVariant],
    );

    return {
        appVariantContextValue: {
            toggleAppVariant,
            selectAppVariant,
            currAppVariant,
            appVariants
        },
        theme
    }
}
