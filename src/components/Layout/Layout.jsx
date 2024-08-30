import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <>
      <div className=" container mx-auto px-5 max-w-screen-xl">
        <Navbar />
      </div>

      <div className=" container mx-auto py-10 px-5 max-w-screen-xl mt-10">
        <Outlet />
      </div>

      <Footer />
      <Toaster />
    </>
  );
}
