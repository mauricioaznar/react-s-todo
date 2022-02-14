import React, { useEffect } from "react";
import { useTypedSelector } from "../../../hooks/redux-hooks/use-typed-selector";
import LoginForm from "../../views/auth/login-form";
import { useCurrentUserLazyQuery } from "../../../services/schema";
import { useActions } from "../../../hooks/redux-hooks/use-actions";
import BigLoader from "../../dum/loaders/big-loader";

interface AuthorizationWrapperProps {
  children: React.ReactElement<any, any> | null;
}

const AuthorizationWrapper = (props: AuthorizationWrapperProps) => {
  // auth
  const { accessToken } = useTypedSelector((state) => state.auth);

  const { login, setCurrentUser } = useActions();

  const [getCurrentUser, { loading }] = useCurrentUserLazyQuery({
    onCompleted: function (data) {
      if (data?.currentUser.username) {
        setCurrentUser(data.currentUser);
        login(window.localStorage.getItem("token")!);
      }
    },
  });

  useEffect(() => {
    if (accessToken !== null) {
      void getCurrentUser();
    }
  }, [accessToken]);

  return loading ? (
    <BigLoader />
  ) : accessToken !== null ? (
    props.children
  ) : (
    <LoginForm />
  );
};

export default AuthorizationWrapper;
