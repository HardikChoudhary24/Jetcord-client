import React, { useCallback, useEffect, useState } from "react";
import ComposeModal from "./ComposeModal";

const ComposePost = () => {
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
          <div className="rounded-full bg-purple-300 w-10 h-10"></div>
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
      {composeState && <ComposeModal closeCompose={closeCompose} />}
    </>
  );
};

export default ComposePost;
