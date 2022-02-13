import React, { useEffect } from "react";
import { useTypedSelector } from "../../../hooks/redux-hooks/useTypedSelector";
import LoginForm from "../../views/auth/login-form";
import { useCurrentUserLazyQuery } from "../../../services/schema";
import { useActions } from "../../../hooks/redux-hooks/useActions";
import BigLoader from "../../dum/loaders/BigLoader";

interface AuthorizationWrapperProps {
  children: React.ReactElement<any, any> | null;
}

const AuthorizationWrapper = (props: AuthorizationWrapperProps) => {
  // auth
  const { accessToken } = useTypedSelector((state) => state.auth);

  const { login, setCurrentUser } = useActions();

  const [getCurrentUser, { loading, data }] = useCurrentUserLazyQuery();

  useEffect(() => {
    if (data?.currentUser.username) {
      setCurrentUser(data.currentUser);
      login(window.localStorage.getItem("token")!);
    }
  }, [data]);

  useEffect(() => {
    if (accessToken !== null) {
      void getCurrentUser();
    }
  }, [accessToken]);

  // theme-selector

  return loading ? <BigLoader /> : accessToken ? props.children : <LoginForm />;
};

export default AuthorizationWrapper;
