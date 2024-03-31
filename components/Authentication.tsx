import { gqlClient } from "@/client/api";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import React, { useCallback } from "react";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";

const Authentication = () => {
  const router = useRouter();

  const verifyGoogleToken = useCallback(
    async (userCred: CredentialResponse) => {
      const cookies = new Cookies();
      const googleToken = userCred.credential;
      console.log(googleToken);
      if (!googleToken) return toast.error("Login failed");

      const { verifyGoogleToken } = await gqlClient.request(
        verifyUserGoogleTokenQuery,
        {
          token: googleToken,
        }
      );
      if (verifyGoogleToken) {
        const { jwtToken, newUser } = verifyGoogleToken;
        if (jwtToken) cookies.set("auth_token", jwtToken);
        if (newUser) router.replace("/flow/single_sign_on");
        router.push(`/flow/sign-on`);

        return toast.success("Logged In");
      }
      return toast.error("Login failed");
      
    },
    [router]
  );
  return (
    <div className="p-5">
      <GoogleLogin onSuccess={verifyGoogleToken} />
    </div>
  );
};

export default Authentication;
