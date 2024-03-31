import Image from "next/image";
import { Inter } from "next/font/google";
import FeedCard from "../components/FeedCard";
import { useCurrentUser } from "@/hooks/user";
import CircularProgress from "@mui/material/CircularProgress";
import Authentication from "@/components/Authentication";
import ComposePost from "@/components/ComposePost";
import ComposeModal from "@/components/ComposeModal";
import { useGetAllPosts } from "@/hooks/post";
import Seperator from "@/components/Seperator";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setCurrentUser } from "@/store/slices/currentUser";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useCurrentUser();
  const { allPosts } = useGetAllPosts();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (user && !isLoading) {
      dispatch(setCurrentUser(user));
    }
  }, [user, dispatch, isLoading]);
  const invalidateUser = async () => {
    await queryClient.invalidateQueries({ queryKey: ["user-details"] });
  };
  return (
    <>
      <div className="grid grid-cols-12 ">
        <div className="col-span-3"></div>
        <div className="col-span-6">
          {user?.id && <ComposePost user={user} />}
          <Seperator px="10%" />
          {allPosts?.map((post) => {
            return (
              <div key={post?.id}>
                <FeedCard
                  data={post}
                  px="10%"
                  followBtn={!(post?.author.userName === user?.userName)}
                  currentUserFollowing={user?.following}
                  invalidateUser={invalidateUser}
                />
                <Seperator px="10%" />
              </div>
            );
          })}
        </div>
        <div className="col-span-3">
          {isLoading ? (
            <div className="flex justify-center items-center w-full">
              <CircularProgress />
            </div>
          ) : (
            !user && <Authentication />
          )}
        </div>
      </div>
    </>
  );
}
