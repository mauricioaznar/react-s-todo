import React from 'react'
import {grey} from "@mui/material/colors";
import {createTheme, ThemeProvider} from "@mui/material";
import WebFont from 'webfontloader'
import {appVariants, AppVariantType} from "./app-variants";
import {useHistory} from "react-router-dom";


interface AppVariantContextInterface {
    toggleAppVariant: () => void;
    selectAppVariant: (av: AppVariantType) => void;
    currAppVariant: AppVariantType | null;
    appVariants: AppVariantType[]
}

const AppVariantContext = React.createContext<AppVariantContextInterface>(
    {
        toggleAppVariant: () => {
        },
        selectAppVariant: () => {},
        currAppVariant: null,
        appVariants: []
    }
);


export const useAppVariant: () => AppVariantContextInterface = () => {
    return React.useContext(AppVariantContext);
}

interface AppVariantProps {
    children: React.ReactNode
}

export const AppVariantProvider = (props: AppVariantProps) => {

    const history = useHistory()

    const [currAppVariant, setCurrAppVariant] = React.useState<AppVariantType>(
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
            selectAppVariant: (av: AppVariantType) => {
                history.push('/')
                window.localStorage.setItem('appVariant', av.name)
                setCurrAppVariant(av);
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () => {

            const families = [currAppVariant.primaryFont, currAppVariant.secondaryFont, currAppVariant.textFont]
            if (currAppVariant.tertiaryFont) {
                families.push(currAppVariant.tertiaryFont)
            }
            WebFont.load({
                google: {
                    families: families,
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

            const tertiaryFont = {
                fontFamily: [
                    `"${currAppVariant.tertiaryFont ? currAppVariant.tertiaryFont : currAppVariant.secondaryFont}"`,
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


    return (
        <AppVariantContext.Provider
            value={
                {
                    toggleAppVariant,
                    selectAppVariant,
                    currAppVariant,
                    appVariants
                }
            }
        >
            <ThemeProvider theme={theme}>
                { props.children }
            </ThemeProvider>
        </ AppVariantContext.Provider >
    )
}
