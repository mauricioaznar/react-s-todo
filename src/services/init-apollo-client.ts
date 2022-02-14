import { ApolloClient, from, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { store } from "../global-state/redux";
import { logout } from "../global-state/redux/action-creators";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import apiUrl from "../constants/api-url";
// @ts-ignore
import { createUploadLink } from "apollo-upload-client";
import { pushErrorMessage } from "../global-state/redux/action-creators/global-messages";

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

const httpProtocol = process.env.NODE_ENV === "development" ? "http" : "https";
let httpLink = createUploadLink({
  uri: `${httpProtocol}://${apiUrl}/graphql`,
});

const authLink = setContext(async (_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        if (
          err.extensions?.code.toLowerCase() === "unauthenticated" ||
          err.message.toLowerCase() === "unauthorized"
        ) {
          const message =
            store.getState().auth.accessToken !== null
              ? "Session expired"
              : "Unauthorized";
          store.dispatch(pushErrorMessage(message) as any);
          store.dispatch(logout() as any);
          const oldHeaders = operation.getContext().headers;
          operation.setContext({
            headers: {
              ...oldHeaders,
              authorization: null,
            },
          });
          // Retry the request, returning the new observable
          return forward(operation);
        } else {
          if (Array.isArray(err.message)) {
            err.message.forEach((message) => {
              store.dispatch(pushErrorMessage(message) as any);
            });
          } else {
            store.dispatch(pushErrorMessage(err.message) as any);
          }
        }
      }
    }

    // To retry on network errors, we recommend the RetryLink
    // instead of the onError link. This just logs the error.
    if (networkError) {
      networkError.message = "Server error";
    }
  },
);

const webSocketProtocol = process.env.NODE_ENV === "development" ? "ws" : "wss";

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
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      };
    },
    connectionCallback: (error: unknown) => {
      const errorMessage = error as ErrorMessage;
      if (errorMessage && typeof error === "object" && errorMessage.message) {
        throw new Error(errorMessage.message);
      }
      const errorArray = error as [];
      if (errorArray && errorArray.length && errorArray.length > 0) {
        throw new Error(errorArray.join(" "));
      }
    },
  },
});

// const linkMiddleware = new ApolloLink((operation, forward) => {
//     return forward(operation);
// })

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  from([authLink, errorLink, httpLink]),
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
