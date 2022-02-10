import { ApolloClient, ApolloQueryResult } from "@apollo/client";
import {
  IsUserOccupiedQuery,
  IsUserOccupiedQueryVariables,
  refetchIsUserOccupiedQuery,
} from "./schema";

type QueryDerivativeIsUserOccupiedType = (
  client: ApolloClient<object>,
  variables: IsUserOccupiedQueryVariables,
) => Promise<ApolloQueryResult<IsUserOccupiedQuery>>;

export const queryDerivativeIsUserOccupied: QueryDerivativeIsUserOccupiedType =
  async (client, variables) => {
    return client.query(refetchIsUserOccupiedQuery(variables));
  };
