import * as React from 'react';
import './styles.css'
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {ApolloProvider,} from "@apollo/client";
import Main from "./Main";
import {Provider as StoreProvider} from "react-redux";

import {store} from "./state";
import client from "./services/apollo-client";


ReactDOM.render(
    <ApolloProvider client={client}>
        <StoreProvider store={store}>
            <Router>
                <Main />
            </Router>
        </StoreProvider>
    </ApolloProvider>,
    document.querySelector('#root'),
);
