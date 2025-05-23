import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar className="z-50 fixed left-0 top-0" />
      <main className="flex-1 overflow-auto ml-60 transition-all duration-300">
        <div className="w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
