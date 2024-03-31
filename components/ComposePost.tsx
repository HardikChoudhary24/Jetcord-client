import React, { useCallback, useEffect, useState } from "react";
import ComposeModal from "./ComposeModal";
import { User } from "@/gql/graphql";
import Image from "next/image";
interface ComposePostProps {
  user: {
    id: string;
    firstName: string;
    email: string;
    profileImageURL?: string | null | undefined;
  };
}
const ComposePost:React.FC<ComposePostProps> = ({user}) => {
  const [composeState, setComposeState] = useState(false);
  const openCompose = () => {
    setComposeState(true);
  };
  const closeCompose = useCallback(() => {
    console.log("sdsf");
    setComposeState(false);
  }, [setComposeState]);
  useEffect(() => {
    console.log(composeState);
  }, [composeState]);
  return (
    <>
      <div className="flex py-2 px-[10%] w-full">
        <div className=" flex flex-col justify-start items-center px-6">
          <div className="rounded-full flex justify-center items-center overflow-hidden w-[40px] h-[40px]">
            {/* user image */}
            <Image
              src={
                user?.profileImageURL ||
                "https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179865.jpg"
              }
              width={40}
              alt=""
              height={40}
            />
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <div
            className="text-[#909293] cursor-text w-full"
            onClick={openCompose}
          >
            Start a thread.....
          </div>
          <button
            className=" rounded-md text-black font-extrabold bg-[#b0b1b2] px-3 py-1 cursor-not-allowed"
            disabled
          >
            Post
          </button>
        </div>
      </div>
      {composeState && <ComposeModal closeCompose={closeCompose} user={user} />}
    </>
  );
};

export default ComposePost;
