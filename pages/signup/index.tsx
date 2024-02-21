import React, { useCallback } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { Poppins } from "next/font/google";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import Cookies from "universal-cookie";
import { gqlClient } from "@/client/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const poppins = Poppins({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
});

const Signup = () => {
  const router = useRouter();

  const verifyGoogleToken = useCallback(
    async (userCred: CredentialResponse) => {
      const cookies = new Cookies();

      const googleToken = userCred.credential;

      if (!googleToken) return toast.error("Login failed");

      const { verifyGoogleToken: jwtToken } = await gqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      if (jwtToken) cookies.set("auth_token", jwtToken);
      router.push(`/flow/sign-on`);
    },
    []
  );
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
          <div className="p-5">
            <GoogleLogin onSuccess={verifyGoogleToken} />
          </div>
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
};

export default Signup;
