import * as React from "react";
import "./styles.css";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { Provider as StoreProvider } from "react-redux";
import DateAdapter from "@mui/lab/AdapterMoment";
import { LocalizationProvider } from "@mui/lab";
import { SnackbarProvider } from "notistack";

import AuthorizationWrapper from "./programs/AuthorizationWrapper";
import { store } from "./global-state/redux";
import client from "./services/init-apollo-client";
import { ProgramsProvider } from "./global-state/context/programs-context";
import ProgramHandler from "./programs/ProgramHandler";

interface ProvidersProps {
  children: React.ReactElement<any, any>;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ApolloProvider client={client}>
      <StoreProvider store={store}>
        <Router>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <ProgramsProvider>
              <SnackbarProvider maxSnack={6}>
                <AuthorizationWrapper>{children}</AuthorizationWrapper>
              </SnackbarProvider>
            </ProgramsProvider>
          </LocalizationProvider>
        </Router>
      </StoreProvider>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Providers>
    <ProgramHandler />
  </Providers>,
  document.querySelector("#root")
);
