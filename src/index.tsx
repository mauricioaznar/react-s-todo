import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import {BrowserRouter as Router} from 'react-router-dom';
import theme from './theme';
import {ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache,} from "@apollo/client";
import Main from "./Main";
import {Provider} from "react-redux";
import DateAdapter from '@mui/lab/AdapterMoment';

import {store} from "./state";
import {onError} from "@apollo/client/link/error";
import {logout} from "./state/action-creators";
import {setContext} from "@apollo/client/link/context";
import {LocalizationProvider} from "@mui/lab";

const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3005' : 'https://s-todo-server.mauaznar.com'

// const defaultOptions = {
//     watchQuery: {
//         fetchPolicy: 'no-cache',
//         errorPolicy: 'ignore',
//     },
//     query: {
//         fetchPolicy: 'no-cache',
//         errorPolicy: 'all',
//     },
// }

const httpLink = createHttpLink({
    uri: `${apiUrl}/graphql`,
});

const authLink = setContext(async (_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null,
        }
    }
});


const logoutLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        for (let err of graphQLErrors) {
            if (err.extensions?.code === 'UNAUTHENTICATED') {
                // Apollo Server sets code to UNAUTHENTICATED
                // when an AuthenticationError is thrown in a resolver


                    store.dispatch(logout()  as any)
                    const oldHeaders = operation.getContext().headers;
                    operation.setContext({
                        headers: {
                            ...oldHeaders,
                            authorization: null,
                        },
                    });
                    // Retry the request, returning the new observable
                    return forward(operation);

            }

        }
    }

    // To retry on network errors, we recommend the RetryLink
    // instead of the onError link. This just logs the error.
    if (networkError) {
        //
    }
})

const client = new ApolloClient({
    link: from([
        authLink,
        logoutLink,
        httpLink
    ]),
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <LocalizationProvider dateAdapter={DateAdapter}>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Router>
                        <CssBaseline />
                        <Main />
                    </Router>
                </ThemeProvider>
            </Provider>
        </LocalizationProvider>
    </ApolloProvider>,
  document.querySelector('#root'),
);
