/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  #graphql\n  mutation Example($payload: CreatePostData!) {\n    createPost(payload: $payload) {\n      id\n    }\n  }\n": types.ExampleDocument,
    "\n  #graphql\n  query getAllPosts {\n    getAllPosts {\n      author {\n        firstName\n        profileImageURL\n        userName\n      }\n      content\n      id\n      mediaURL\n    }\n  }\n": types.GetAllPostsDocument,
    "\n  #graphql\n  query Query($imageType: String!) {\n    getSignedURL(imageType: $imageType)\n  }\n": types.QueryDocument,
    "\n  #graphql\n  query verifyUserGoogleTokenQuery($token: String!) {\n    verifyGoogleToken(token: $token) {\n      jwtToken\n      newUser\n    }\n  }\n": types.VerifyUserGoogleTokenQueryDocument,
    "\n  #graphql\n  query getCurrentUser {\n    getCurrentUser {\n      id\n      firstName\n      lastName\n      email\n      profileImageURL\n      userName\n      following {\n        userName\n      }\n    }\n  }\n": types.GetCurrentUserDocument,
    "\n  #graphql\n  query getAllUsername {\n    getAllUsername\n  }\n": types.GetAllUsernameDocument,
    "\n  #graphql\n  query getUserDetails($payload: String!) {\n    getUserDetails(payload: $payload) {\n      firstName\n      lastName\n      posts {\n        author {\n          userName\n          profileImageURL\n        }\n        content\n        mediaURL\n      }\n      following {\n        userName\n        firstName\n        lastName\n        profileImageURL\n      }\n      follower {\n        userName\n        firstName\n        lastName\n        profileImageURL\n      }\n      profileImageURL\n      userName\n    }\n  }\n": types.GetUserDetailsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation Example($payload: CreatePostData!) {\n    createPost(payload: $payload) {\n      id\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  mutation Example($payload: CreatePostData!) {\n    createPost(payload: $payload) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query getAllPosts {\n    getAllPosts {\n      author {\n        firstName\n        profileImageURL\n        userName\n      }\n      content\n      id\n      mediaURL\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query getAllPosts {\n    getAllPosts {\n      author {\n        firstName\n        profileImageURL\n        userName\n      }\n      content\n      id\n      mediaURL\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query Query($imageType: String!) {\n    getSignedURL(imageType: $imageType)\n  }\n"): (typeof documents)["\n  #graphql\n  query Query($imageType: String!) {\n    getSignedURL(imageType: $imageType)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query verifyUserGoogleTokenQuery($token: String!) {\n    verifyGoogleToken(token: $token) {\n      jwtToken\n      newUser\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query verifyUserGoogleTokenQuery($token: String!) {\n    verifyGoogleToken(token: $token) {\n      jwtToken\n      newUser\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query getCurrentUser {\n    getCurrentUser {\n      id\n      firstName\n      lastName\n      email\n      profileImageURL\n      userName\n      following {\n        userName\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query getCurrentUser {\n    getCurrentUser {\n      id\n      firstName\n      lastName\n      email\n      profileImageURL\n      userName\n      following {\n        userName\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query getAllUsername {\n    getAllUsername\n  }\n"): (typeof documents)["\n  #graphql\n  query getAllUsername {\n    getAllUsername\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query getUserDetails($payload: String!) {\n    getUserDetails(payload: $payload) {\n      firstName\n      lastName\n      posts {\n        author {\n          userName\n          profileImageURL\n        }\n        content\n        mediaURL\n      }\n      following {\n        userName\n        firstName\n        lastName\n        profileImageURL\n      }\n      follower {\n        userName\n        firstName\n        lastName\n        profileImageURL\n      }\n      profileImageURL\n      userName\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query getUserDetails($payload: String!) {\n    getUserDetails(payload: $payload) {\n      firstName\n      lastName\n      posts {\n        author {\n          userName\n          profileImageURL\n        }\n        content\n        mediaURL\n      }\n      following {\n        userName\n        firstName\n        lastName\n        profileImageURL\n      }\n      follower {\n        userName\n        firstName\n        lastName\n        profileImageURL\n      }\n      profileImageURL\n      userName\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;