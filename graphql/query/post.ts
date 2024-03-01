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

export const getSignedURLQuery = graphql(`
  #graphql
  query Query($imageType: String!) {
    getSignedURL(imageType: $imageType)
  }
`);
