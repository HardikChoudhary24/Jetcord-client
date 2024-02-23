import React, { memo, useEffect, useRef } from "react";
import { Inter, Open_Sans, Roboto, Lato } from "next/font/google";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { AutoSizeTextArea } from "./ui/AutoSizeTextArea";
import { IoIosImages } from "react-icons/io";

const openSans = Open_Sans({
  weight: ["800", "300", "400", "400", "500", "700"],
  subsets: ["cyrillic"],
});
const roboto = Roboto({
  weight: ["300", "400", "400", "500", "700"],
  subsets: ["cyrillic"],
});
const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

const ComposeModal = ({ closeCompose }) => {
  const textRef = useRef(null);
  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = "auto";
      textRef.current.style.height = textRef.current.scrollHeight + "px";
    }
  }, [textRef]);

  const selectImageUpload = () => {
    // here we are creating a input for media and then we are clicking that input so that it opens the upload modal
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-5 backdrop-blur-[1px] flex justify-center items-center"
      onClick={closeCompose}
    >
      <div
        className="bg-[#1f2020] min-h-[25%] w-[30%] rounded-lg drop-shadow border-white border-[0.5px] p-10 flex flex-col justify-start items-start"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex justify-start items-start w-full">
          <div className="rounded-full bg-cyan-400 w-[40px] h-[40px] flex justify-center items-start">
            {/* user image */}
          </div>
          <div className="flex flex-col justify-start items-start ml-5 w-full">
            <p className={`font-[500] ${lato.className}`}>hardik_._choudhary</p>
            <div className="w-full mt-1">
              <AutoSizeTextArea placeholder="Start a thread....." />
            </div>
            <div
              className="mb-[20px] cursor-pointer"
              onClick={selectImageUpload}
            >
              <IoIosImages />
            </div>
          </div>
        </div>
        <button className=" rounded-md text-black font-extrabold bg-[#e2e4e5] px-3 py-1 absolute bottom-5 right-5">
          Post
        </button>
      </div>
    </div>
  );
};

export default memo(ComposeModal);
