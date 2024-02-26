import { graphql } from "@/gql";

export const createPost = graphql(`
  #graphql
  mutation Example($payload: CreatePostData!) {
    createPost(payload: $payload) {
      id
    }
  }
`);