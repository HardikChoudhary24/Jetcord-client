"use client";
import React, { useState } from "react";
import { FaRegPaperPlane, FaRegUser, FaRegHeart } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { FiSearch, FiEdit } from "react-icons/fi";
import { CgMenuLeft } from "react-icons/cg";
interface NavItems {
  name: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
}
const navItems: NavItems[] = [
  {
    name: "Home",
    icon: <GoHomeFill size={32} style={{ color: "#2d2e2e" }} />,
    activeIcon: <GoHomeFill size={32} style={{ color: "white" }} />,
  },
  {
    name: "Search",
    icon: <FiSearch size={30} style={{ color: "#2d2e2e" }} />,
    activeIcon: <FiSearch size={32} style={{ color: "white" }} />,
  },
  {
    name: "Edit",
    icon: <FiEdit size={30} style={{ color: "#2d2e2e" }} />,
    activeIcon: <FiEdit size={32} style={{ color: "white" }} />,
  },
  {
    name: "Likes",
    icon: <FaRegHeart size={29} style={{ color: "#2d2e2e" }} />,
    activeIcon: <FaRegHeart size={32} style={{ color: "white" }} />,
  },
  {
    name: "User",
    icon: <FaRegUser size={28} style={{ color: "#2d2e2e" }} />,
    activeIcon: <FaRegUser size={32} style={{ color: "white" }} />,
  },
];
const Navbar = () => {
  const [isActive, setIsActive] = useState("Search");

  const redirectNavLink = (itemName: string) => {
    setIsActive(itemName);
    //push to new route
  };
  return (
    <div className="grid grid-cols-12 py-9">
      <div className="col-span-3 flex justify-end pr-2 items-center">
        <FaRegPaperPlane size={30} />
      </div>
      <div className="col-span-6 grid grid-cols-5 px-[18%] ">
        {navItems.map((item, index) => {
          return (
            <span
              className="col-span-1 flex justify-center items-center cursor-pointer hover:bg-[#1d1e1f] bg-opacity-5 py-3 px-3 rounded-md transition-all"
              key={index}
              onClick={() => redirectNavLink(item.name)}
            >
              {isActive === item.name ? item.activeIcon : item.icon}
            </span>
          );
        })}
      </div>
      <div className="col-span-3">
        <span className="flex items-center justify-start cursor-pointer w-fit hover:bg-[#1d1e1f] bg-opacity-5 py-3 px-3 rounded-md transition-all">
          <CgMenuLeft size={30} />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
