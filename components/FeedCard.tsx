/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { IoChatbubbleOutline, IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { Post, User } from "@/gql/graphql";
import Image from "next/image";
import { Ubuntu } from "next/font/google";
import { inter } from "../pages/_app";
import { FiShare } from "react-icons/fi";
import { useRouter } from "next/router";
import { gqlClient } from "@/client/api";
import { followUser, unFollowUser } from "@/graphql/mutation/user";
import { FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import Tooltip from "@mui/material/Tooltip";
interface FeedOptions {
  name: String;
  icon: React.ReactNode;
}
const feedOptions = [
  {
    name: "like",
    icon: <FaRegHeart size={22} />,
    hoverIcon: <FaRegHeart size={22} color="#e33458" />,
  },
  {
    name: "chat",
    icon: <IoChatbubbleOutline size={22} />,
    hoverIcon: <IoChatbubbleOutline size={22} color="#15e66f" />,
  },
  {
    name: "rePost",
    icon: <AiOutlineRetweet size={22} />,
    hoverIcon: <AiOutlineRetweet size={22} color="#5d89f0" />,
  },
  {
    name: "share",
    icon: <FiShare size={22} />,
    hoverIcon: <FiShare size={22} color="#5d89f0" />,
  },
];

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["greek"],
});
interface FeedCardProps {
  data: Post;
  px: string;
  followBtn: boolean;
  currentUserFollowing: [User];
  invalidateUser: () => Promise<void>;
}
const FeedCard: React.FC<FeedCardProps> = ({
  data,
  px,
  followBtn,
  currentUserFollowing,
  invalidateUser,
}) => {
  const [feedOptionHover, setFeedOptionHover] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const router = useRouter();

  const startFollowing = async () => {
    if (data?.author?.userName) {
      const res = await gqlClient.request(followUser, {
        userName: data?.author?.userName,
      });
      if (res) {
        invalidateUser();
        toast.success(`Following ${data?.author?.userName}`);
        setIsFollowing(true);
      } else {
        toast.error(`Unable to follow at the moment!`);
      }
    } else {
      toast.error("Something went wrong!");
    }
  };
  const unFollow = async () => {
    if (data?.author?.userName) {
      const res = await gqlClient.request(unFollowUser, {
        userName: data?.author?.userName,
      });
      if (res) {
        invalidateUser();
        toast.success(`Unfollowed ${data?.author?.userName}`);
        setIsFollowing(false);
      } else {
        toast.error(`Unable to unfollow at the moment!`);
      }
    } else {
      toast.error("Something went wrong!");
    }
  };
  useEffect(() => {
    // here we have the list of all the users that the current user is following and we find whether the user who is author of this post is in the following list
    const inFollowing = currentUserFollowing?.find(
      (user) => user?.userName === data?.author?.userName
    );
    if (inFollowing) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [data?.author?.userName, currentUserFollowing]);
  return (
    <div className={`flex py-2 px-[${px}] w-full`}>
      <div className=" flex flex-col justify-start items-center px-6">
        <div
          className="rounded-full flex justify-center items-center overflow-hidden w-[40px] h-[40px] hover:cursor-pointer"
          onClick={() => {
            router.push(`/${data?.author?.userName}`);
          }}
        >
          {/* user image */}
          <Image
            src={
              data?.author?.profileImageURL ||
              "https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179865.jpg"
            }
            width={40}
            alt=""
            height={40}
          />
        </div>
        <div className="w-[2px] rounded-lg flex-grow bg-[#292a2b] mt-1"></div>
        {followBtn && (
          <Tooltip
            title={isFollowing ? "Unfollow" : "Follow"}
            placement="left-start"
            arrow
          >
            <div className="flex justify-center items-center mt-1 cursor-pointer">
              {!isFollowing ? (
                <IoIosAddCircle size={30} onClick={startFollowing} />
              ) : (
                <FaCheckCircle color="#368ff5" size={25} onClick={unFollow} />
              )}
            </div>
          </Tooltip>
        )}
      </div>
      <div className="flex flex-col justify-start w-full">
        {/* postheader */}
        <div className="flex justify-between items-center">
          <span
            className="font-extrabold hover:underline cursor-pointer"
            onClick={() => {
              router.push(`/${data?.author?.userName}`);
            }}
          >
            {data?.author.userName}
          </span>
          <div className="flex space-x-4">
            <span className="font-extralight">1 d</span>
            <div className="flex items-center cursor-pointer rounded-full p-2 hover:bg-[#1d1e1f]">
              <div className="rounded-full w-[5px] h-[5px] bg-white mx-[1px]"></div>
              <div className="rounded-full w-[5px] h-[5px] bg-white mx-[1px]"></div>
              <div className="rounded-full w-[5px] h-[5px] bg-white mx-[1px]"></div>
            </div>
          </div>
        </div>
        {/* post-desc */}
        <div
          className={`flex flex-col justify-start w-full mt-4 ${inter.className}`}
        >
          <p className="font-[300] whitespace-pre-line">{data?.content}</p>
        </div>
        {/* media-content */}
        {data?.mediaURL && (
          <div className="max-h-[35rem] w-fit border border-[#292a2b] border-[1.5px] my-4 rounded-md overflow-hidden ml-2 relative cursor-pointer flex items-center justify-center">
            <img src={data?.mediaURL} alt="" />
          </div>
        )}
        {/* feed options */}
        <div className="flex w-[25%] justify-between mt-2">
          {feedOptions.map((option) => {
            return (
              <div
                key={option.name}
                className={`flex justify-center items-center cursor-pointer rounded-full p-2 hover:bg-[#1d1e1f]`}
                onMouseOver={() => setFeedOptionHover(option.name)}
                onMouseOut={() => setFeedOptionHover("")}
              >
                {feedOptionHover === option.name
                  ? option.hoverIcon
                  : option.icon}
              </div>
            );
          })}
        </div>
        <div className="flex mt-3 pl-3 items-center">
          <span className="font-[10px] text-sm">257 replies</span>
          <span className="rounded-full w-[4px] h-[4px] bg-white ml-2"></span>
          <span className="font-[10px] text-sm ml-2">1 Like</span>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
