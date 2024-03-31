import { graphql } from "@/gql";

export const editUser = `#graphql
    mutation editUser($payload:String!){
        editUsername(payload:$payload)
    }
`;

export const followUser = `#graphql
    mutation follow($userName:String!){
        follow(userToFollow:$userName)
    }
`;
export const unFollowUser = `#graphql
    mutation follow($userName:String!){
        unfollow(userToUnfollow:$userName)
    }
`;
