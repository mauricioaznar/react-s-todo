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
import {red} from "@mui/material/colors";


const Main = () => {

    // auth
    const {accessToken} = useTypedSelector(
        (state) => state.auth
    )

    const {login, setCurrentUser} = useActions()

    const [getCurrentUser, { loading, data }] = useCurrentUserLazyQuery();

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
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: {
                        main: '#556cd6',
                    },
                    secondary: {
                        main: '#19857b',
                    },
                    error: {
                        main: red.A400,
                    },
                },
            }),
        [mode],
    );

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={memoTheme}>
                    <CssBaseline/>
                    <SnackbarProvider maxSnack={6}>
                        {
                            loading ? 'Loading' :
                                accessToken ? <App/> : <LogInForm/>
                        }
                    </SnackbarProvider>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </LocalizationProvider>
    );
};

export default Main;

