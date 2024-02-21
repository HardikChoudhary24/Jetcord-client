import { QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";

const SignON = () => {
  const queryClient = new QueryClient();
  const router = useRouter();


  const invalidateUser = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: ["user-details"],
    });
  },[queryClient]);

  useEffect(() => {
    invalidateUser();
    router.push(`/`)
  }, [invalidateUser]);

  return <div>Loading...</div>
};

export default SignON;
