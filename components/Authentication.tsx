import { gqlClient } from "@/client/api";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import React, { useCallback } from "react";
import Cookies from "universal-cookie";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import toast from "react-hot-toast";
import { useRouter } from "next/router";


const Authentication = () => {
  const cookies = new Cookies();
  const router = useRouter();


  const verifyGoogleToken = useCallback(
    async (userCred: CredentialResponse) => {
      const googleToken = userCred.credential;

      if (!googleToken) return toast.error("Login failed");

      const { verifyGoogleToken: jwtToken } = await gqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      if (jwtToken) cookies.set("auth_token", jwtToken);
      router.push(`/flow/sign-on`);

      toast.success("Logged In");
    },
    []
  );
  return (
    <div className="p-5">
      <GoogleLogin onSuccess={verifyGoogleToken} />
    </div>
  );
};

export default Authentication;
