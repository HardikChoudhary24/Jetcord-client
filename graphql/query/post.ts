import { graphql } from "../../gql";

// using condegen to manage types for data recieved from backend

export const getAllPosts = graphql(`
  #graphql
  query getAllPosts {
    getAllPosts {
      author {
        firstName
        profileImageURL
      }
      content
      id
      mediaURL
    }
  }
`);
