import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import {BrowserRouter as Router} from 'react-router-dom';
import theme from './theme';
import {ApolloClient, ApolloLink, ApolloProvider, createHttpLink, from, InMemoryCache, split,} from "@apollo/client";
import Main from "./Main";
import {Provider} from "react-redux";
import DateAdapter from '@mui/lab/AdapterMoment';

import {store} from "./state";
import {onError} from "@apollo/client/link/error";
import {logout} from "./state/action-creators";
import {setContext} from "@apollo/client/link/context";
import {LocalizationProvider} from "@mui/lab";
import {WebSocketLink} from "@apollo/client/link/ws";
import {getMainDefinition} from "@apollo/client/utilities";

const apiUrl = process.env.NODE_ENV === 'development' ? 'localhost:3005' : 's-todo-server.mauaznar.com'

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

const httpProtocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
const httpLink = createHttpLink({
    uri: `${httpProtocol}://${apiUrl}/graphql`,
});

const authLink = setContext(async (_, {headers}) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null,
        }
    }
});


const logoutLink = onError(({graphQLErrors, networkError, operation, forward}) => {
    if (graphQLErrors) {
        for (let err of graphQLErrors) {
            if (err.extensions?.code === 'UNAUTHENTICATED') {
                // Apollo Server sets code to UNAUTHENTICATED
                // when an AuthenticationError is thrown in a resolver


                store.dispatch(logout() as any)
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

const webSocketProtocol = process.env.NODE_ENV === 'development' ? 'ws' : 'wss'

interface ErrorMessage {
    message: string;
}

const wsLink = new WebSocketLink({
    uri: `${webSocketProtocol}://${apiUrl}/graphql`,
    options: {
        reconnect: true,
        lazy: true,
        inactivityTimeout: 1000,
        connectionParams: () => {
            return {
                isWebSocket: true,
                authorization: `Bearer ${window.localStorage.getItem('token')}`,
            }
        },
        connectionCallback: (error: unknown) => {
            const errorMessage = error as ErrorMessage
            if (typeof error === 'object' && errorMessage.message) {
                throw new Error(errorMessage.message)
            }
            const errorArray = error as []
            if (errorArray.length && errorArray.length > 0) {
                throw new Error(errorArray.join(' '))
            }
        }
    }
});

const linkMiddleware = new ApolloLink((operation, forward) => {
    return forward(operation);
})

const splitLink = split(
    ({query}) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink.concat(linkMiddleware),
    from([
        authLink,
        logoutLink,
        httpLink
    ]),
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <LocalizationProvider dateAdapter={DateAdapter}>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Router>
                        <CssBaseline/>
                        <Main/>
                    </Router>
                </ThemeProvider>
            </Provider>
        </LocalizationProvider>
    </ApolloProvider>,
    document.querySelector('#root'),
);
