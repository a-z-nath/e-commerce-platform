import React from "react";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

function Layout() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen overflow-x-hidden dark:bg-gray-800">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
