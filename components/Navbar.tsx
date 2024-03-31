"use client";
import React, { useCallback, useEffect, useState } from "react";
import { FaRegPaperPlane, FaRegUser, FaRegHeart } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { FiSearch, FiEdit } from "react-icons/fi";
import { CgMenuLeft } from "react-icons/cg";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import ComposeModal from "./ComposeModal";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
interface NavItems {
  name: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
}
const navItems: NavItems[] = [
  {
    name: "Home",
    icon: <GoHomeFill size={32} style={{ color: "#545656" }} />,
    activeIcon: <GoHomeFill size={32} style={{ color: "white" }} />,
  },
  {
    name: "Search",
    icon: <FiSearch size={30} style={{ color: "#545656" }} />,
    activeIcon: <FiSearch size={32} style={{ color: "white" }} />,
  },
  {
    name: "Edit",
    icon: <FiEdit size={30} style={{ color: "#545656" }} />,
    activeIcon: <FiEdit size={32} style={{ color: "white" }} />,
  },
  {
    name: "Likes",
    icon: <FaRegHeart size={29} style={{ color: "#545656" }} />,
    activeIcon: <FaRegHeart size={32} style={{ color: "white" }} />,
  },
  {
    name: "User",
    icon: <FaRegUser size={28} style={{ color: "#545656" }} />,
    activeIcon: <FaRegUser size={32} style={{ color: "white" }} />,
  },
];
const Navbar = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState("Search");
  const [signOutModal, setSignOutModal] = useState(false);
  const currentUser = useAppSelector(state=>state.currentUser)

  
  const [openCompose, setOpenCompose] = useState(false);
  const redirectNavLink = (itemName: string) => {
    setIsActive(itemName);
    //push to new route
    switch (itemName) {
      case "User":
        router.push(`/${currentUser?.userName}`);
        break;
      case "Home":
        router.push(`/`);
        break;
      case "Edit":
        router.push(`/`);
        break;
      case "Search":
        router.push(`/`);
        break;
      case "Likes":
        router.push(`/`);
        break;
    }
  };

  const openSignOutModal = useCallback(() => {
    setSignOutModal(true);
  }, [setSignOutModal]);

  const signOut = useCallback(() => {
    const cookies = new Cookies();
    cookies.remove("auth_token");
    setSignOutModal(false);
    router.reload();
  }, [setSignOutModal]);
  return (
    <>
      <div className="grid grid-cols-12 pt-9 pb-3 sticky top-0 z-30 backdrop-blur-3xl backdrop-contrast-150 backdrop-brightness-50">
        <div className="col-span-3 flex justify-end pr-2 items-center">
          <FaRegPaperPlane size={30} />
        </div>
        <div className="col-span-6 grid grid-cols-5 px-[18%] ">
          {navItems.map((item, index) => {
            return (
              <span
                className="col-span-1 flex justify-center items-center cursor-pointer hover:bg-[#5a5b5b39] bg-opacity-5 py-3 px-3 rounded-md transition-all"
                key={index}
                onClick={() => redirectNavLink(item.name)}
              >
                {isActive === item.name ? item.activeIcon : item.icon}
              </span>
            );
          })}
        </div>
        <div className="col-span-3 relative">
          <span
            className="flex items-center justify-start cursor-pointer w-fit hover:bg-[#1d1e1f] bg-opacity-5 py-3 px-3 rounded-md transition-all"
            onClick={openSignOutModal}
          >
            <CgMenuLeft size={30} />
          </span>
          {signOutModal && (
            <div
              className="border-[1px] w-20 flex justify-center items-center rounded-md h-8 absolute top-12 left-10 cursor-pointer hover:bg-[#1d1e1f]"
              onClick={signOut}
            >
              <p>Sign Out </p>
            </div>
          )}
        </div>
      </div>
      {/* {openCompose && <ComposeModal />} */}
    </>
  );
};

export default Navbar;
