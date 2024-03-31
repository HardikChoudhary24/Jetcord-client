import React, { useEffect, useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { gqlClient } from "@/client/api";
import { getAllUsername } from "@/graphql/query/user";
import { editUser } from "@/graphql/mutation/user";
import { useRouter } from "next/router";
const SingleSignOn = () => {
  const [active, setActive] = useState(true);
  const [username, setUsername] = useState("");
  const [usernameExist, setUsernameExist] = useState<boolean | null>(true);

  const router = useRouter();
  const checkUsername = async (username: string) => {
    const { getAllUsername: userNameList } = await gqlClient.request(
      getAllUsername
    );
    if (
      userNameList?.find((availableUserName) => availableUserName === username)
    ) {
      setUsernameExist(true);
    } else {
      setUsernameExist(false);
    }
  };
  useEffect(() => {
    checkUsername(username);
  }, [username]);

  const editUsername = async ()=>{
    await gqlClient.request(editUser,{payload:username});
    router.push("/")
  }; 
  return (
    <div>
      <div
        className="fixed inset-0 bg-black bg-opacity-35 backdrop-blur-[1.5px] flex justify-center items-center z-40"
        onClick={(e) => {
          setActive(false);
        }}
      >
        <div className="bg-[#141515] min-h-[25%] w-[30%] rounded-lg custom-drop-shadow px-10 pb-10 pt-5 flex flex-col justify-start items-center relative">
          <div className="flex justify-center items-center w-full">
            <FaRegPaperPlane size={45} />
          </div>
          <div className="w-full flex flex-col justify-center items-start my-5 ">
            <p className="text-3xl font-semibold">What should we call you?</p>
            <p className="text-base text-[#b0b1b2] font-medium my-2">
              Your @username is unique. You can always change it later.
            </p>
            <div
              className={`flex flex-col justify-start items-start bg-transparent border rounded-sm  w-full p-2 my-4 ${
                active ? "border-blue-300" : "border-[#696969]"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setActive(true);
              }}
            >
              <p className="text-sm text-blue-300 font-semibold">Username</p>
              <div className=" flex justify-start items-center w-full">
                <p className="text-blue-300 font-semibold">@</p>
                <input
                  type="text"
                  className="outline-none border-none bg-transparent ml-2 w-full"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {!usernameExist && username ? (
                  <div className="w-fit rounded-full bg-green-500 p-0 mx-2">
                    <CiCircleCheck fill="black" size={20} />
                  </div>
                ) : (
                  username && (
                    <div className="w-fit rounded-full bg-red-500 p-0 mx-2">
                      <MdOutlineCancel fill="black" size={20} />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full">
            <button
              className={`rounded-md  px-5 py-2 bg-white text-black font-semibold w-[70%] ${
                (usernameExist || !username) &&
                "cursor-not-allowed bg-[#b0b1b2]"
              }`}
              disabled={usernameExist || !username}
              onClick={editUsername}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSignOn;
