import React, {useEffect} from 'react';
import App from "./templates/App";
import {useTypedSelector} from "./hooks/useTypedSelector";
import LogInForm from "./templates/auth/LoginForm";
import {useCurrentUserQuery} from "./schema";
import {useActions} from "./hooks/useActions";

const Main = () => {
    const {accessToken} = useTypedSelector(
        (state) => state.auth
    )

    const {login} = useActions()


    const {data, loading} = useCurrentUserQuery()

    useEffect(() => {
        if (data?.currentUser.username) {
            login(window.localStorage.getItem('token')!)
        }
    }, [data])

    return (
        <>

            {
                loading ? 'Loading' :
                accessToken ? <App/> : <LogInForm/>
            }
        </>
    );
};

export default Main;

