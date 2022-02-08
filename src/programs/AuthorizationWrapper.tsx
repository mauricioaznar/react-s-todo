import React, { useEffect } from 'react';
import { useTypedSelector } from '../hooks/redux-hooks/useTypedSelector';
import LogInForm from './auth-program/LoginForm';
import { useCurrentUserLazyQuery } from '../services/schema';
import { useActions } from '../hooks/redux-hooks/useActions';
import BigLoader from '../components/loaders/BigLoader';

interface AuthorizationWrapperProps {
  children: React.ReactElement<any, any> | null;
}

const AuthorizationWrapper = (props: AuthorizationWrapperProps) => {
  // auth-program
  const { accessToken } = useTypedSelector((state) => state.auth);

  const { login, setCurrentUser } = useActions();

  const [getCurrentUser, { loading, data }] = useCurrentUserLazyQuery();

  useEffect(() => {
    if (data?.currentUser.username) {
      setCurrentUser(data.currentUser);
      login(window.localStorage.getItem('token')!);
    }
  }, [data]);

  useEffect(() => {
    getCurrentUser();
  }, [accessToken]);

  // theme

  return loading ? <BigLoader /> : accessToken ? props.children : <LogInForm />;
};

export default AuthorizationWrapper;
