import {
  ApolloClient,
  from,
  InMemoryCache,
  ServerError,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { store } from "../global-state/redux";
import { logout } from "../global-state/redux/action-creators";
import ApolloErrorSeparator from "../constants/apollo-error-separator";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import apiUrl from "../constants/api-url";
// @ts-ignore
import { createUploadLink } from "apollo-upload-client";

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
const httpLink = createUploadLink({
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
        if (err.extensions?.code === "UNAUTHENTICATED") {
          // Apollo Server sets code to UNAUTHENTICATED
          // when an AuthenticationError is thrown in a resolver

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
            err.message = err.message.join(ApolloErrorSeparator);
          }
        }
      }
    }

    // To retry on network errors, we recommend the RetryLink
    // instead of the onError link. This just logs the error.
    if (networkError) {
      if (networkError.name === "ServerError") {
        const serverError = networkError as ServerError;
        networkError.message = serverError.result.message;
      }
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
