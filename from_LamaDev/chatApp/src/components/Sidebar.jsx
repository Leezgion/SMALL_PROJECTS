import Chats from "./Chats";
import { Navbar } from "./Navbar";
import React from "react";
import Search from "./Search";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};
