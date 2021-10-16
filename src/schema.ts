import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  cats: Array<Cat>;
  currentUser: User;
  users: Array<User>;
};

export type Cat = {
  __typename?: 'Cat';
  _id: Scalars['String'];
  breed: Scalars['String'];
  characteristics: Characteristics;
};

export type Characteristics = {
  __typename?: 'Characteristics';
  coat: Scalars['String'];
  color: Scalars['String'];
  lifespan: Scalars['String'];
  size: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCat: Cat;
  createUser: User;
  deleteCat: Cat;
  login: AccessToken;
  updateCat: Cat;
};


export type MutationCreateCatArgs = {
  catInput: CatInput;
};


export type MutationCreateUserArgs = {
  userInput: UserInput;
};


export type MutationDeleteCatArgs = {
  _id: Scalars['String'];
};


export type MutationLoginArgs = {
  userInput: UserInput;
};


export type MutationUpdateCatArgs = {
  _id: Scalars['String'];
  catInput: CatInput;
};

export type CatInput = {
  breed: Scalars['String'];
  characteristics: CharacteristicsInput;
};

export type CharacteristicsInput = {
  coat: Scalars['String'];
  color: Scalars['String'];
  lifespan: Scalars['String'];
  size: Scalars['String'];
};

export type UserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type AccessToken = {
  __typename?: 'AccessToken';
  accessToken: Scalars['String'];
};


export const GetCatsDocument = gql`
    query GetCats {
  cats {
    _id
    breed
    characteristics {
      color
      coat
      lifespan
      size
    }
  }
}
    `;

/**
 * __useGetCatsQuery__
 *
 * To run a query within a React component, call `useGetCatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCatsQuery(baseOptions?: Apollo.QueryHookOptions<GetCatsQuery, GetCatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCatsQuery, GetCatsQueryVariables>(GetCatsDocument, options);
      }
export function useGetCatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCatsQuery, GetCatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCatsQuery, GetCatsQueryVariables>(GetCatsDocument, options);
        }
export type GetCatsQueryHookResult = ReturnType<typeof useGetCatsQuery>;
export type GetCatsLazyQueryHookResult = ReturnType<typeof useGetCatsLazyQuery>;
export type GetCatsQueryResult = Apollo.QueryResult<GetCatsQuery, GetCatsQueryVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    username
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    _id
    username
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const LoginDocument = gql`
    mutation Login($userInput: userInput!) {
  login(userInput: $userInput) {
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($userInput: userInput!) {
  createUser(userInput: $userInput) {
    username
    _id
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const DeleteCatDocument = gql`
    mutation DeleteCat($id: String!) {
  deleteCat(_id: $id) {
    breed
  }
}
    `;
export type DeleteCatMutationFn = Apollo.MutationFunction<DeleteCatMutation, DeleteCatMutationVariables>;

/**
 * __useDeleteCatMutation__
 *
 * To run a mutation, you first call `useDeleteCatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCatMutation, { data, loading, error }] = useDeleteCatMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCatMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCatMutation, DeleteCatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCatMutation, DeleteCatMutationVariables>(DeleteCatDocument, options);
      }
export type DeleteCatMutationHookResult = ReturnType<typeof useDeleteCatMutation>;
export type DeleteCatMutationResult = Apollo.MutationResult<DeleteCatMutation>;
export type DeleteCatMutationOptions = Apollo.BaseMutationOptions<DeleteCatMutation, DeleteCatMutationVariables>;
export const UpdateCatDocument = gql`
    mutation UpdateCat($id: String!, $catInput: CatInput!) {
  updateCat(_id: $id, catInput: $catInput) {
    breed
  }
}
    `;
export type UpdateCatMutationFn = Apollo.MutationFunction<UpdateCatMutation, UpdateCatMutationVariables>;

/**
 * __useUpdateCatMutation__
 *
 * To run a mutation, you first call `useUpdateCatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCatMutation, { data, loading, error }] = useUpdateCatMutation({
 *   variables: {
 *      id: // value for 'id'
 *      catInput: // value for 'catInput'
 *   },
 * });
 */
export function useUpdateCatMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCatMutation, UpdateCatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCatMutation, UpdateCatMutationVariables>(UpdateCatDocument, options);
      }
export type UpdateCatMutationHookResult = ReturnType<typeof useUpdateCatMutation>;
export type UpdateCatMutationResult = Apollo.MutationResult<UpdateCatMutation>;
export type UpdateCatMutationOptions = Apollo.BaseMutationOptions<UpdateCatMutation, UpdateCatMutationVariables>;
export const CreateCatDocument = gql`
    mutation CreateCat($catInput: CatInput!) {
  createCat(catInput: $catInput) {
    breed
  }
}
    `;
export type CreateCatMutationFn = Apollo.MutationFunction<CreateCatMutation, CreateCatMutationVariables>;

/**
 * __useCreateCatMutation__
 *
 * To run a mutation, you first call `useCreateCatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCatMutation, { data, loading, error }] = useCreateCatMutation({
 *   variables: {
 *      catInput: // value for 'catInput'
 *   },
 * });
 */
export function useCreateCatMutation(baseOptions?: Apollo.MutationHookOptions<CreateCatMutation, CreateCatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCatMutation, CreateCatMutationVariables>(CreateCatDocument, options);
      }
export type CreateCatMutationHookResult = ReturnType<typeof useCreateCatMutation>;
export type CreateCatMutationResult = Apollo.MutationResult<CreateCatMutation>;
export type CreateCatMutationOptions = Apollo.BaseMutationOptions<CreateCatMutation, CreateCatMutationVariables>;
export type GetCatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCatsQuery = { __typename?: 'Query', cats: Array<{ __typename?: 'Cat', _id: string, breed: string, characteristics: { __typename?: 'Characteristics', color: string, coat: string, lifespan: string, size: string } }> };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', username: string } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', _id: string, username: string }> };

export type LoginMutationVariables = Exact<{
  userInput: UserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AccessToken', accessToken: string } };

export type SignInMutationVariables = Exact<{
  userInput: UserInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', username: string, _id: string } };

export type DeleteCatMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteCatMutation = { __typename?: 'Mutation', deleteCat: { __typename?: 'Cat', breed: string } };

export type UpdateCatMutationVariables = Exact<{
  id: Scalars['String'];
  catInput: CatInput;
}>;


export type UpdateCatMutation = { __typename?: 'Mutation', updateCat: { __typename?: 'Cat', breed: string } };

export type CreateCatMutationVariables = Exact<{
  catInput: CatInput;
}>;


export type CreateCatMutation = { __typename?: 'Mutation', createCat: { __typename?: 'Cat', breed: string } };

export const namedOperations = {
  Query: {
    GetCats: 'GetCats',
    CurrentUser: 'CurrentUser',
    GetUsers: 'GetUsers'
  },
  Mutation: {
    Login: 'Login',
    SignIn: 'SignIn',
    DeleteCat: 'DeleteCat',
    UpdateCat: 'UpdateCat',
    CreateCat: 'CreateCat'
  }
}