import React, { Children } from "react";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="w-full h-screen bg-white overflow-auto">
      <Sidebar />
      <div className="h-screen ml-[50px] md:ml-[180px] lg:ml-[260px] relative p-4 md:px-12 md:py-5 ">
        {children}
      </div>
    </div>
  );
};

export default Layout;
