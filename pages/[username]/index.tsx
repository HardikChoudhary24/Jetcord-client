import { User } from "@/gql/graphql";
import { useRouter } from "next/router";
import React, { useCallback, useDebugValue, useEffect, useState } from "react";
import { inter } from "../_app";
import Image from "next/image";
import { CircularProgress } from "@mui/material";
import { gqlClient } from "@/client/api";
import { getUserDetailsQuery } from "@/graphql/query/user";
import FeedCard from "@/components/FeedCard";
import Seperator from "@/components/Seperator";
import { tree } from "next/dist/build/templates/app-page";
import { useAppSelector } from "@/store/hooks";
import { useCurrentUser } from "@/hooks/user";
import { followUser, unFollowUser } from "@/graphql/mutation/user";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("Feed");
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<User>();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  // const currentUser = useAppSelector(state=>state.currentUser);
  const { user } = useCurrentUser();
  const router = useRouter();

  const fetchUserDetails = useCallback(async (username: string) => {
    const { getUserDetails } = await gqlClient.request(getUserDetailsQuery, {
      payload: username,
    });
    setUserDetails(getUserDetails as User);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (router.query.username) {
      fetchUserDetails(router.query.username as string);
    }
  }, [router.query.username, fetchUserDetails]);

  useEffect(() => {
    if (user?.userName === router.query.username) {
      console.log(true);
      setIsAdmin(true);
    } else {
      console.log(false);
      setIsAdmin(false);
    }
  }, [router.query.username, user?.userName]);

  const startFollowing = async () => {
    if (userDetails?.userName) {
      const res = await gqlClient.request(followUser, {
        userName: userDetails?.userName,
      });
      if (res) {
        fetchUserDetails(userDetails?.userName);
        toast.success(`Following ${userDetails?.userName}`);
        setIsFollowing(true);
      } else {
        toast.error(`Unable to follow at the moment!`);
      }
    } else {
      toast.error("Something went wrong!");
    }
  };
  const unFollow = async () => {
    if (userDetails?.userName) {
      const res = await gqlClient.request(unFollowUser, {
        userName: userDetails?.userName,
      });
      if (res) {
        fetchUserDetails(userDetails?.userName);
        toast.success(`Unfollowed ${userDetails?.userName}`);
        setIsFollowing(false);
      } else {
        toast.error(`Unable to unfollow at the moment!`);
      }
    } else {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (
      userDetails?.follower?.find((users) => users?.userName === user?.userName)
    ) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [userDetails]);

  if (isLoading) {
    return (
      <>
        <div className={`grid grid-cols-12 ${inter.className}`}>
          <div className="col-span-3"></div>
          <div className="col-span-6">
            <div className="flex py-2 px-[10%] w-full">
              <div className=" flex flex-col justify-center items-center pl-10 pr-8 w-full">
                <div className="flex justify-center items-center w-full h-full mt-10">
                  <CircularProgress />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={`grid grid-cols-12 ${inter.className}`}>
        <div className="col-span-3"></div>
        <div className="col-span-6">
          <div className="flex py-2 px-[10%] w-full">
            <div className=" flex flex-col justify-start items-start pl-10 pr-8 w-full">
              <div className="flex justify-between items-start w-full mt-6">
                <div className="flex flex-col justify-start items-start mt-5">
                  <span className="text-[1.5rem] font-semibold mb-1">
                    {userDetails?.firstName +
                      " " +
                      userDetails?.lastName?.substring(0, 1).toUpperCase() +
                      userDetails?.lastName?.substring(1)}
                  </span>
                  <span className="text-lg font-light">
                    {userDetails?.userName}
                  </span>
                </div>
                <div className="rounded-full flex justify-center items-center overflow-hidden w-[110px] h-[110px]">
                  {/* user image */}
                  <Image
                    src={
                      userDetails?.profileImageURL ||
                      "https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179865.jpg"
                    }
                    width={110}
                    alt=""
                    height={110}
                  />
                </div>
              </div>
              <span className="text-[#c5c6c7]">
                I might not be where I want to be yet, but I get closer
                everyday.
              </span>
              <div className=" flex justify-start items-center mt-4 gap-x-5">
                <p className="font-normal text-[#777879]">
                  <span className="font-bold  text-[#e7e8e8]">
                    {userDetails?.following?.length}{" "}
                  </span>
                  following
                </p>
                <p className="font-normal text-[#777879]">
                  <span className="font-bold  text-[#e7e8e8]">
                    {userDetails?.follower?.length}{" "}
                  </span>
                  followers
                </p>
              </div>
              <div className="w-full flex justify-center items-center mt-7">
                {isAdmin ? (
                  <button className="rounded-md bg-transparent outline outline-1 outline-[#777879] w-full py-1 active:scale-[0.95] transition-all ease-in-out">
                    Edit Profile
                  </button>
                ) : isFollowing ? (
                  <button
                    className="rounded-md text-white outline outline-1 outline-[#777879] w-full py-1 active:scale-[0.95] transition-all ease-in-out bg-transparent"
                    onClick={unFollow}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className="rounded-md text-black outline outline-1 outline-[#777879] w-full py-1 active:scale-[0.95] transition-all ease-in-out bg-white"
                    onClick={startFollowing}
                  >
                    Follow
                  </button>
                )}
              </div>
              <div className="flex justify-around items-center border-b border-[#777879] w-full mt-10 mb-5">
                <div
                  className={`flex justify-center items-center py-3 rounded-md w-full h-full transition-all ease-linear ${
                    activeTab === "Feed" && "bg-[#4040414e]"
                  } hover:${
                    activeTab !== "Feed" && "bg-[#2f2f302e]"
                  } cursor-pointer`}
                  onClick={() => setActiveTab("Feed")}
                >
                  <span className="text-lg ">Feed</span>
                </div>
                <div
                  className={`flex justify-center items-center py-3 rounded-md w-full h-full transition-all ease-linear ${
                    activeTab === "Reposts" && "bg-[#4040414e]"
                  } hover:${
                    activeTab !== "Reposts" && "bg-[#2f2f302e]"
                  } cursor-pointer`}
                  onClick={() => setActiveTab("Reposts")}
                >
                  <span className="text-lg">Reposts</span>
                </div>
              </div>
              {userDetails?.posts?.length === 0 ? (
                <div className="w-full min-h-32 flex justify-center items-center">
                  <button className="rounded-md bg-transparent outline outline-1 outline-[#777879] w-[35%] py-1 active:scale-[0.95] transition-all ease-in-out">
                    Create your first post
                  </button>
                </div>
              ) : (
                userDetails?.posts?.map((post) => {
                  return (
                    <>
                      <FeedCard
                        key={post?.id}
                        data={post}
                        px="0"
                        followBtn={false}
                      />
                      <Seperator px="0" />
                    </>
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className="col-span-3"></div>
      </div>
    </>
  );
};

export default UserProfile;
