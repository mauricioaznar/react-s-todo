import * as React from "react";
import "./styles.css";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";

import AuthorizationWrapper from "./programs/AuthorizationWrapper";
import { store } from "./global-state/redux";
import client from "./services/init-apollo-client";
import ProgramHandler from "./programs/ProgramHandler";
import { Providers } from "./global-state/context/providers";

ReactDOM.render(
  <ApolloProvider client={client}>
    <Providers store={store}>
      <AuthorizationWrapper>
        <ProgramHandler />
      </AuthorizationWrapper>
    </Providers>
  </ApolloProvider>,
  document.querySelector("#root"),
);
