/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { IoChatbubbleOutline, IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { Post } from "@/gql/graphql";
import Image from "next/image";
import { Ubuntu } from "next/font/google";
import { inter } from "../pages/_app";
import { FiShare } from "react-icons/fi";
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
}
const FeedCard: React.FC<FeedCardProps> = ({ data }) => {
  const [feedOptionHover, setFeedOptionHover] = useState("");
  return (
    <div className="flex py-2 px-[10%] w-full">
      <div className=" flex flex-col justify-start items-center px-6">
        <div className="rounded-full flex justify-center items-center overflow-hidden w-[40px] h-[40px]">
          {/* user image */}
          <Image
            src={data?.author?.profileImageURL}
            width={40}
            alt=""
            height={40}
          />
        </div>
        <div className="w-[2px] rounded-lg flex-grow bg-[#292a2b] mt-1"></div>
        <div className="flex justify-center items-center mt-1 cursor-pointer">
          <IoIosAddCircle size={30} />
        </div>
      </div>
      <div className="flex flex-col justify-start w-full">
        {/* postheader */}
        <div className="flex justify-between items-center">
          <span className="font-extrabold">
            {data?.author.firstName} {data?.author.lastName}
          </span>
          <div className="flex space-x-4">
            <span className="font-extralight">1 d</span>
            <div className="flex items-center cursor-pointer rounded-full p-2 hover:bg-[hsl(180,1%,77%)]">
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
          <div className="w-fit border border-[#292a2b] border-[1.5px] my-4 rounded-md overflow-hidden ml-2 relative ">
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
