import React, {useEffect} from 'react';
import App from "./templates/App";
import {useTypedSelector} from "./hooks/useTypedSelector";
import LogInForm from "./templates/auth/LoginForm";
import {useCurrentUserLazyQuery} from "./services/schema";
import {useActions} from "./hooks/useActions";
import CssBaseline from "@mui/material/CssBaseline";
import {SnackbarProvider} from "notistack";
import DateAdapter from "@mui/lab/AdapterMoment";
import {LocalizationProvider} from "@mui/lab";
import {AppVariantProvider} from "./hooks/app-variants/useAppVariant";
import BigLoader from "./components/loaders/BigLoader";


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


    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <AppVariantProvider>
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
            </AppVariantProvider>
        </LocalizationProvider>
    );
};

export default Main;

