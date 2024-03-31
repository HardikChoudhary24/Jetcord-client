import { graphql } from "../../gql";

// using condegen to manage types for data recieved from backend
export const verifyUserGoogleTokenQuery = graphql(`
  #graphql
  query verifyUserGoogleTokenQuery($token: String!) {
    verifyGoogleToken(token: $token) {
      jwtToken
      newUser
    }
  }
`);

export const getCurrentUser = graphql(`
  #graphql
  query getCurrentUser {
    getCurrentUser {
      id
      firstName
      lastName
      email
      profileImageURL
      userName
      following {
        userName
      }
    }
  }
`);

export const getAllUsername = graphql(`
  #graphql
  query getAllUsername {
    getAllUsername
  }
`);

export const getUserDetailsQuery = graphql(`
  #graphql
  query getUserDetails($payload: String!) {
    getUserDetails(payload: $payload) {
      firstName
      lastName
      posts {
        author {
          userName
          profileImageURL
        }
        content
        mediaURL
      }
      following {
        userName
        firstName
        lastName
        profileImageURL
      }
      follower {
        userName
        firstName
        lastName
        profileImageURL
      }
      profileImageURL
      userName
    }
  }
`);
