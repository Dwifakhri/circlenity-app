import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsFilePost } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";

const SideBar = () => {
  const navColor = ({ isActive }) => {
    return {
      color: isActive ? "#38AAEA" : "#514E4E",
    };
  };

  return (
    <div className="flex flex-col space-y-5 w-[50px] md:w-[180px] lg:w-[260px] h-screen bg-secondary left-0 fixed px-3 md:px-8 lg:px-auto py-5 md:pt-[3rem] z-10">
      <NavLink to="/" style={navColor}>
        <div
          id="home"
          className="flex flex-row space-x-0 md:space-x-8 items-center hover:text-primary cursor-pointer "
        >
          <AiFillHome size={25} />
          <h3 className="hidden md:block">Home</h3>
        </div>
      </NavLink>
      <NavLink to="/user" style={navColor}>
        <div
          id="user"
          className="flex flex-row space-x-0 md:space-x-8 items-center hover:text-primary cursor-pointer "
        >
          <IoIosPeople size={25} />
          <h3 className="hidden md:block">User</h3>
        </div>
      </NavLink>
      <NavLink to="/post" style={navColor}>
        <div
          id="post"
          className="flex flex-row space-x-0 md:space-x-8 items-center hover:text-primary cursor-pointer "
        >
          <BsFilePost size={25} />
          <h3 className="hidden md:block">Post</h3>
        </div>
      </NavLink>
    </div>
  );
};

export default SideBar;
