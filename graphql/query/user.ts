import { graphql } from "../../gql";

// using condegen to manage types for data recieved from backend
export const verifyUserGoogleTokenQuery = graphql(`
  #graphql
  query verifyUserGoogleTokenQuery($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

export const getCurrentUser = graphql(`
  #graphql
  query getCurrentUser {
    getCurrentUser {
      id
      firstName
      email
      profileImageURL
    }
  }
`);
