import React, {useEffect} from 'react';
import App from "./templates/App";
import {useTypedSelector} from "./hooks/useTypedSelector";
import LogInForm from "./templates/auth/LoginForm";
import {useCurrentUserLazyQuery} from "./schema";
import {useActions} from "./hooks/useActions";
import CssBaseline from "@mui/material/CssBaseline";
import {SnackbarProvider} from "notistack";
import {ThemeProvider} from "@mui/material/styles";
import DateAdapter from "@mui/lab/AdapterMoment";
import {LocalizationProvider} from "@mui/lab";
import {createTheme} from "@mui/material";
import ColorModeContext from "./services/color-mode-context";
import {grey} from "@mui/material/colors";
import BigLoader from "./components/BigLoader";


const Main = () => {

    // auth
    const {accessToken} = useTypedSelector(
        (state) => state.auth
    )

    const {login, setCurrentUser} = useActions()

    const [getCurrentUser, {loading, data}] = useCurrentUserLazyQuery();

    useEffect(() => {
        if (data?.currentUser.username) {
            setCurrentUser(data.currentUser)
            login(window.localStorage.getItem('token')!)
        }
    }, [data])

    useEffect(() => {
        getCurrentUser()
    }, [accessToken])

    // theme
    const [mode, setMode] = React.useState<'light' | 'dark'>(
        window.localStorage.getItem('dark_mode') === 'light' ? 'light' : 'dark'
    );

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const newMode = prevMode === 'light' ? 'dark' : 'light'
                    window.localStorage.setItem('dark_mode', newMode)
                    return newMode
                });
            },
        }),
        [],
    );

    const memoTheme = React.useMemo(
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
            const primary = mode === 'light' ? `#D98014` : `#E0AC84`
            const secondary = mode === 'light' ? `#9937A6` : `#AC8466`
            const divider = mode === 'light' ? `#D98014` : `#E6D7CC`
            const backgroundPrimary = mode === 'light' ? `#5FA0D9` : `#614A39`
            const backgroundPaper = mode === 'light' ? `#9ABBD9` : `#615B56`
            const textPrimary = mode === 'light' ? grey["900"] : grey['50']
            const textSecondary = mode === 'light' ? grey['500'] : grey['50']
            return createTheme({
                palette: {
                    mode,
                    primary: {
                        main: primary
                    },
                    secondary: {
                        main: secondary
                    },
                    divider: divider,
                    background: {
                        default: backgroundPrimary,
                        paper: backgroundPaper,
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
        [mode],
    );

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={memoTheme}>
                    <CssBaseline/>
                    <SnackbarProvider maxSnack={6}>
                        {
                            loading
                                ? <BigLoader/>
                                : accessToken
                                    ? <App/>
                                    : <LogInForm/>
                        }
                    </SnackbarProvider>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </LocalizationProvider>
    );
};

export default Main;

