import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import {BrowserRouter as Router} from 'react-router-dom';
import theme from './theme';
import {ApolloClient, ApolloProvider, InMemoryCache,} from "@apollo/client";
import Main from "./Main";

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

const client = new ApolloClient({
    uri: `${apiUrl}/graphql`,
    cache: new InMemoryCache(),
});



ReactDOM.render(
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
            <Router>
                <CssBaseline />
                <Main />
            </Router>
        </ThemeProvider>
    </ApolloProvider>,
  document.querySelector('#root'),
);
