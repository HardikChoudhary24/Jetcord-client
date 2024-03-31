import { useQuery } from "@tanstack/react-query";
import { gqlClient } from "../client/api";
import { getCurrentUser, getUserDetails } from "../graphql/query/user";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["user-details"],
    queryFn: () => gqlClient.request(getCurrentUser),
  });
  return { ...query, user: query.data?.getCurrentUser };
};