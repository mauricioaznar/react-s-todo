import * as React from "react";
import "./styles.css";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";

import AuthorizationWrapper from "./components/smart/authorization-wrapper/authorization-wrapper";
import { store } from "./global-state/redux";
import client from "./services/init-apollo-client";
import App from "./components/views/App";
import { Providers } from "./global-state/context/providers";
import GlobalMessagesSnackbar from "./components/smart/global-messages/global-messages-snackbar";

ReactDOM.render(
  <ApolloProvider client={client}>
    <Providers store={store}>
      <AuthorizationWrapper>
        <App />
      </AuthorizationWrapper>
      <GlobalMessagesSnackbar />
    </Providers>
  </ApolloProvider>,
  document.querySelector("#root"),
);
