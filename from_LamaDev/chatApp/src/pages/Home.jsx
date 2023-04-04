import { Chat } from "../components/Chat";
import React from "react";
import { Sidebar } from "../components/Sidebar";

export const Home = () => {
  return (
    <div className="homePage">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};
