import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Inter, Quicksand } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter } from "next/router";
import Signup from "./signup";

const inter = Inter({ subsets: ["latin"] });
const quicksand = Quicksand({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <div className={quicksand.className}>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId="170631133733-5d2nltjpeebracsjn01irrsmgmqejk45.apps.googleusercontent.com">
          {!router.pathname.includes("signup") && <Navbar />}
          <Component {...pageProps} />
          <Toaster />
        </GoogleOAuthProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}
