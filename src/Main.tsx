import React from 'react';
import App from "./App";
import LogInForm from "./templates/auth/LoginForm";

const Main = () => {
    const isAuthorized = false

    return (
        <>
            {
                isAuthorized ? <App/> : <LogInForm/>
            }
        </>
    );
};

export default Main;
