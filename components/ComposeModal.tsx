import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Inter, Open_Sans, Roboto, Lato } from "next/font/google";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { AutoSizeTextArea } from "./ui/AutoSizeTextArea";
import { IoIosImages } from "react-icons/io";
import Image from "next/image";
import { useCreatePost } from "@/hooks/post";
import { CreatePostData } from "@/gql/graphql";

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

interface ComposeModalProps {
  user: {
    id: string;
    firstName: string;
    email: string;
    profileImageURL?: string | null | undefined;
  };
  closeCompose: () => void;
}

const ComposeModal: React.FC<ComposeModalProps> = ({ closeCompose, user }) => {
  const [content, setContent] = useState("");
  const textRef = useRef(null);
  const [postDisable, setPostDisable] = useState(true);
  const { mutate } = useCreatePost();
  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = "auto";
      textRef.current.style.height = textRef.current.scrollHeight + "px";
    }
  }, [textRef]);

  const handleSelectImageUpload = () => {
    // here we are creating a input for media and then we are clicking that input so that it opens the upload modal
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  };

  const handleCreatePost = useCallback(() => {
    const payload = {
      content,
    };
    mutate(payload as CreatePostData);
    closeCompose();
  }, [content, mutate, closeCompose]);

  useEffect(() => {
    if (content === "") {
      setPostDisable(true);
    } else {
      setPostDisable(false);
    }
  }, [content]);
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-35 backdrop-blur-[1.5px] flex justify-center items-center z-40"
      onClick={closeCompose}
    >
      <div
        className="bg-[#141515] min-h-[25%] w-[30%] rounded-lg custom-drop-shadow px-10 pb-10 pt-5 flex flex-col justify-start items-start relative"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex w-full items-start justify-start">
          <div className="flex flex-col justify-start items-start h-full">
            <div className="rounded-full overflow-hidden w-[40px] h-[40px] flex justify-center items-start">
              {/* user image */}
              <Image
                src={user?.profileImageURL}
                width={40}
                alt=""
                height={40}
              />
            </div>
          </div>
          <div className="flex flex-col justify-start items-start ml-3 w-full">
            <p className={`font-[500] text-[1rem] ${roboto.className}`}>
              {user?.firstName}
            </p>
            <div className={`w-full mt-1 ${lato.className}`}>
              <AutoSizeTextArea
                placeholder="Start a thread....."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                autoFocus
              />
            </div>
            <div
              className="mb-[20px] cursor-pointer"
              onClick={handleSelectImageUpload}
            >
              <IoIosImages />
            </div>
          </div>
        </div>
        <button
          className={` rounded-md text-black font-extrabold ${
            postDisable ? " bg-[#aaabac] cursor-not-allowed" : "bg-[#e2e4e5]"
          } px-3 py-1 absolute bottom-5 right-5`}
          onClick={handleCreatePost}
          disabled={postDisable}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default memo(ComposeModal);
// bg - [#e2e4e5];
