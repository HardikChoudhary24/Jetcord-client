import Image from "next/image";
import { Inter } from "next/font/google";
import FeedCard from "../components/FeedCard";
import { useCurrentUser } from "@/hooks/user";
import CircularProgress from "@mui/material/CircularProgress";
import Authentication from "@/components/Authentication";
import ComposePost from "@/components/ComposePost";
import Paper from "@mui/material/Paper";
import ComposeModal from "@/components/ComposeModal";
import { useGetAllPosts } from "@/hooks/post";
import Seperator from "@/components/Seperator";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user, isLoading } = useCurrentUser();
  const { allPosts } = useGetAllPosts();
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-3"></div>
        <div className="col-span-6">
          <ComposePost user={user} />
          <Seperator />
          {allPosts?.map((post) => {
            return (
              <>
                <FeedCard key={post?.id} data={post} />
                <Seperator />
              </>
            );
          })}
        </div>
        <div className="col-span-3">
          {isLoading ? (
            <div className="flex justify-center items-center w-full">
              <CircularProgress />
            </div>
          ) : (
            !user && <Authentication />
          )}
        </div>
      </div>
    </>
  );
}
