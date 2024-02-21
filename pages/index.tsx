import Image from "next/image";
import { Inter } from "next/font/google";
import FeedCard from "../components/FeedCard";
import { QueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/user";
import { useCallback, useEffect, useState } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { gqlClient } from "@/client/api";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user } = useCurrentUser();
  // const queryClient = new QueryClient();
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
    <div className="grid grid-cols-12">
      <div className="col-span-3"></div>
      <div className="col-span-6">
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
      </div>

      <div className="col-span-3">
        {!user && (
          <div className="p-5">
            <GoogleLogin onSuccess={verifyGoogleToken} />
          </div>
        )}
      </div>
    </div>
  );
}
