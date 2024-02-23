/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { IoChatbubbleOutline, IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
interface FeedOptions {
  name: String;
  icon: React.ReactNode;
}
const feedOptions = [
  {
    name: "like",
    icon: <FaRegHeart size={22} />,
  },
  {
    name: "chat",
    icon: <IoChatbubbleOutline size={22} />,
  },
  {
    name: "rePost",
    icon: <AiOutlineRetweet size={22} />,
  },
  {
    name: "share",
    icon: <IoPaperPlaneOutline size={22} />,
  },
];

const FeedCard = () => {
  return (
    <div className="flex py-2 px-[10%] w-full">
      <div className=" flex flex-col justify-start items-center px-6">
        <div className="rounded-full bg-cyan-400 w-[40px] h-[40px]">
          {/* user image */}
        </div>
        <div className="w-[2px] rounded-lg flex-grow bg-[#292a2b] mt-1"></div>
        <div className="flex justify-center items-center mt-1 cursor-pointer">
          <IoIosAddCircle size={30} />
        </div>
      </div>
      <div className="flex flex-col justify-start w-full">
        {/* postheader */}
        <div className="flex justify-between items-center">
          <span className="font-extrabold">Gymshark</span>
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
        <div className="flex flex-col justify-start w-full mt-4">
          <p>
            "walks out the gym" <br />
            me: I can’t wait to go workout again
          </p>
        </div>
        {/* media-content */}
        <div className="h-[25rem] my-4 rounded-md hw-full bg-purple-300 ml-2"></div>
        {/* feed options */}
        <div className="flex w-[25%] justify-between mt-2">
          {feedOptions.map((option) => {
            return (
              <div
                key={option.name}
                className="flex justify-center items-center cursor-pointer rounded-full p-2 hover:bg-[#1d1e1f]"
              >
                {option.icon}
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
