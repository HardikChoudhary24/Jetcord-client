import { QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useCallback, useEffect } from "react";
import { useCurrentUser } from "@/hooks/user";

const SignON = () => {
  const queryClient = new QueryClient();
  const router = useRouter();
  const {user} = useCurrentUser();

  const invalidateUser = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: ["user-details"],
    });
  }, [queryClient]);

  useEffect(() => {
    invalidateUser();

  }, [invalidateUser]);

  useEffect(()=>{
    if(user){
      router.push(`/`);
    }
    else{
      router.push(`/signup`)
    }
  },[user])

  return (
    <div className="w-screen flex justify-center items-center h-screen">
      <CircularProgress />
    </div>
  );
};

export default SignON;
