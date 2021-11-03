import React, {useEffect} from 'react';
import App from "./templates/App";
import {useTypedSelector} from "./hooks/useTypedSelector";
import LogInForm from "./templates/auth/LoginForm";
import {useCurrentUserLazyQuery} from "./schema";
import {useActions} from "./hooks/useActions";

const Main = () => {
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

