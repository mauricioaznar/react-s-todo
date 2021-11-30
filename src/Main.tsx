import React, {useEffect} from 'react';
import App from "./templates/App";
import {useTypedSelector} from "./hooks/useTypedSelector";
import LogInForm from "./templates/auth/LoginForm";
import { useCurrentUserLazyQuery } from "./schema";
import {useActions} from "./hooks/useActions";
import CssBaseline from "@mui/material/CssBaseline";
import {SnackbarProvider} from "notistack";
import {ThemeProvider} from "@mui/material/styles";
import DateAdapter from "@mui/lab/AdapterMoment";
import {LocalizationProvider} from "@mui/lab";
import {ThemeVariantContext, useThemeVariant} from "./hooks/useThemeVariant";
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
    const {theme, themeVariantContextValue} = useThemeVariant()


    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <ThemeVariantContext.Provider value={themeVariantContextValue}>
                <ThemeProvider theme={theme}>
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
            </ThemeVariantContext.Provider>
        </LocalizationProvider>
    );
};

export default Main;

