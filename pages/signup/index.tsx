import React, { useCallback, useEffect } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import { useCurrentUser } from "@/hooks/user";
import LinearProgress from "@mui/material/LinearProgress";
import Authentication from "@/components/Authentication";

const poppins = Poppins({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
});

const Signup = () => {
  const router = useRouter();
  const {user,isLoading} = useCurrentUser();

  useEffect(()=>{
    if(user){
      router.push('/')
    }
  },[user])

  if (isLoading) {
    return (
      <div className="w-screen">
        <LinearProgress />
      </div>
    );
  }
  if(!user){
    return (
      <div className="flex justify-around items-center h-screen px-36">
        <div>
          <FaRegPaperPlane size={350} />
        </div>
        <div>
          <div className="pl-5 flex flex-col justify-center items-center mb-10">
            <p className={`text-[4rem] font-extrabold ${poppins.className}`}>
              Go social now
            </p>
            <p className={`text-[2rem] mt-5 font-[500] ${poppins.className}`}>
              Join today.
            </p>
          </div>
          <div className="flex justify-center mb-4">
            <Authentication/>
          </div>
          <div className="flex justify-between items-center px-20">
            <hr className="w-full" />
            <span className="mx-4 font-semibold">or</span>
            <hr className="w-full" />
          </div>
          <div className="flex justify-center items-center mt-6">
            <button className="bg-blue-400 px-10 py-4 rounded-[50px] font-extrabold w-[50%]">
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Signup;
