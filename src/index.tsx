import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import theme from './theme';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
});



ReactDOM.render(
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
            <Router>
                <CssBaseline />
                <App />
            </Router>
        </ThemeProvider>
    </ApolloProvider>,
  document.querySelector('#root'),
);
