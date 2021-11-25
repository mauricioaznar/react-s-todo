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
import {amber, deepOrange, grey} from "@mui/material/colors";
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
            return createTheme({
                palette: {
                    mode,
                    ...(mode === 'light'
                        ? {
                            // palette values for light mode
                            common: {
                                black: deepOrange[500],
                                white: deepOrange[500]
                            },
                            primary: amber,
                            divider: amber[100],
                            background: {
                                default: deepOrange[500],
                                paper: deepOrange[900],
                            },
                            text: {
                                primary: grey[900],
                                secondary: grey[800],
                            },
                        }
                        : {
                            // palette values for dark mode
                            primary: deepOrange,
                            divider: deepOrange[700],
                            background: {
                                default:  deepOrange[500],
                                paper: deepOrange[900],
                            },
                            text: {
                                primary: '#fff',
                                secondary: grey[500],
                            },
                        }),
                },
                typography: {
                    ...sansFont,
                    h1: displayFont,
                    h2: displayFont,
                    h3: displayFont,
                    h4: displayFont,
                    h5: displayFont,
                    h6: displayFont,

                }
            })
        }
,
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

