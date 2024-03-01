import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Inter, Open_Sans, Roboto, Lato } from "next/font/google";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { AutoSizeTextArea } from "./ui/AutoSizeTextArea";
import { IoIosImages } from "react-icons/io";
import Image from "next/image";
import { useCreatePost } from "@/hooks/post";
import { CreatePostData } from "@/gql/graphql";
import { gqlClient } from "@/client/api";
import { getSignedURLQuery } from "@/graphql/query/post";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { RiDeleteBin2Line } from "react-icons/ri";
import ReactGiphySearchbox from "react-giphy-searchbox";
import { HiOutlineGif } from "react-icons/hi2";
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
  const [uploadedFile, setUploadedFile] = useState<File | null>();
  const [loadingOnSubmit, setLoadingOnSubmit] = useState(false);
  const [openGIFSelector, setOpenGIFSelector] = useState(false);
  const [selectedGIF, setSelectedGIF] = useState<any | null>(null);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = "auto";
      textRef.current.style.height = textRef.current.scrollHeight + "px";
    }
  }, [textRef]);

  const handleMedia = useCallback(
    async (e: Event) => {
      e.preventDefault();
      if (e?.target?.files && e?.target?.files[0]) {
        const file: File | null | undefined = e.target.files[0];

        if (file?.type) {
          setUploadedFile(file);
        }
      }
      return;
    },
    [setUploadedFile]
  );

  const handleSelectImageUpload = () => {
    // here we are creating a input for media and then we are clicking that input so that it opens the upload modal
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.addEventListener("change", (e) => handleMedia(e));
    input.click();
  };

  const handleCreatePost = useCallback(async () => {
    setLoadingOnSubmit(true);
    const payload: CreatePostData = {
      content,
    };
    if (uploadedFile) {
      const { getSignedURL } = await gqlClient.request(getSignedURLQuery, {
        imageType: uploadedFile?.type,
      });
      if (getSignedURL) {
        await axios.put(getSignedURL, uploadedFile, {
          headers: {
            "Content-Type": uploadedFile?.type,
          },
        });
        const url = new URL(getSignedURL);
        const mediaURL = `${url.origin}${url.pathname}`;
        payload.mediaURL = mediaURL;
      }
    }
    mutate(payload as CreatePostData);
    setLoadingOnSubmit(false);
    closeCompose();
  }, [setLoadingOnSubmit, content, uploadedFile, mutate, closeCompose]);

  const handleGIFUpload = useCallback(() => {
    setOpenGIFSelector(true);
  }, []);

  useEffect(() => {
    if (content === "" && !uploadedFile) {
      setPostDisable(true);
    } else {
      setPostDisable(false);
    }
  }, [content, uploadedFile]);
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-35 backdrop-blur-[1.5px] flex justify-center items-center z-40"
      onClick={closeCompose}
    >
      {!openGIFSelector ? (
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
                {uploadedFile && (
                  <div className="py-2 flex items-end justify-start gap-2">
                    <Image
                      src={URL.createObjectURL(uploadedFile)}
                      alt="new"
                      width={350}
                      height={350}
                    />
                    <RiDeleteBin2Line
                      size={20}
                      onClick={() => setUploadedFile(null)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                )}
                {selectedGIF && (
                  <div className="py-2 flex items-end justify-start gap-2">
                    <img src={selectedGIF.url} alt="new" />
                    <RiDeleteBin2Line
                      size={20}
                      onClick={() => setSelectedGIF(null)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                )}
              </div>
              <div className="mb-[20px] flex justify-start items-center gap-3">
                <div
                  className="cursor-pointer"
                  onClick={handleSelectImageUpload}
                >
                  <IoIosImages />
                </div>
                <div className="cursor-pointer" onClick={handleGIFUpload}>
                  <HiOutlineGif size={20} />
                </div>
              </div>
            </div>
          </div>
          <button
            className={` rounded-md text-black font-extrabold ${
              postDisable ? " bg-[#aaabac] cursor-not-allowed" : "bg-[#e2e4e5]"
            } px-3 py-1 absolute bottom-5 right-5`}
            onClick={handleCreatePost}
            disabled={postDisable || loadingOnSubmit}
          >
            {loadingOnSubmit ? <CircularProgress sx={{}} size={15} /> : "Post"}
          </button>
        </div>
      ) : (
        <div onClick={(e) => e.stopPropagation()}>
          <ReactGiphySearchbox
            apiKey="QsC27dafIldbzuCp4sN76XXzjjF4TXhE"
            onSelect={(item) => {
              setSelectedGIF(item);
              console.log(item);
              setOpenGIFSelector(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default memo(ComposeModal);
// bg - [#e2e4e5];
