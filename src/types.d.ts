import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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

export type Mutation = {
  __typename?: 'Mutation';
  createCat: Cat;
  deleteCat: Cat;
  updateCat: Cat;
};


export type MutationCreateCatArgs = {
  catInput: CatInput;
};


export type MutationDeleteCatArgs = {
  _id: Scalars['String'];
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  Cat: ResolverTypeWrapper<Cat>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Characteristics: ResolverTypeWrapper<Characteristics>;
  Mutation: ResolverTypeWrapper<{}>;
  CatInput: CatInput;
  CharacteristicsInput: CharacteristicsInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  Cat: Cat;
  String: Scalars['String'];
  Characteristics: Characteristics;
  Mutation: {};
  CatInput: CatInput;
  CharacteristicsInput: CharacteristicsInput;
  Boolean: Scalars['Boolean'];
};

export type SpecifiedByDirectiveArgs = {
  url: Scalars['String'];
};

export type SpecifiedByDirectiveResolver<Result, Parent, ContextType = any, Args = SpecifiedByDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  cats?: Resolver<Array<ResolversTypes['Cat']>, ParentType, ContextType>;
};

export type CatResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cat'] = ResolversParentTypes['Cat']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  breed?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  characteristics?: Resolver<ResolversTypes['Characteristics'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CharacteristicsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Characteristics'] = ResolversParentTypes['Characteristics']> = {
  coat?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lifespan?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCat?: Resolver<ResolversTypes['Cat'], ParentType, ContextType, RequireFields<MutationCreateCatArgs, 'catInput'>>;
  deleteCat?: Resolver<ResolversTypes['Cat'], ParentType, ContextType, RequireFields<MutationDeleteCatArgs, '_id'>>;
  updateCat?: Resolver<ResolversTypes['Cat'], ParentType, ContextType, RequireFields<MutationUpdateCatArgs, '_id' | 'catInput'>>;
};

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>;
  Cat?: CatResolvers<ContextType>;
  Characteristics?: CharacteristicsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  specifiedBy?: SpecifiedByDirectiveResolver<any, any, ContextType>;
};
