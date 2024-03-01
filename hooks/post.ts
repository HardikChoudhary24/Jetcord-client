import { createPost } from "@/graphql/mutation/post";
import { gqlClient } from "../client/api";
import { getAllPosts } from "../graphql/query/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreatePostData } from "@/gql/graphql";
import toast from "react-hot-toast";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: CreatePostData) =>
      gqlClient.request(createPost, {
        payload,
      }),
    onMutate: () => toast.loading("Creating Post", { id: "create-post" }),
    onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["all-posts"],
        });
        toast.success("Post Created", { id: "create-post" });
    },
  });
  return mutation;
};
export const useGetAllPosts = () => {
  const query = useQuery({
    queryKey: ["all-posts"],
    queryFn: () => gqlClient.request(getAllPosts),
  });
  return { ...query, allPosts: query.data?.getAllPosts };
};

