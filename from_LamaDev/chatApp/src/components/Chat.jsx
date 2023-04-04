import {
  AiOutlineEllipsis,
  AiOutlineUsergroupAdd,
  AiTwotoneVideoCamera,
} from "react-icons/ai";
import React, { useContext } from "react";

import { ChatContext } from "../context/ChatContext";
import Input from "./Input";
import Messages from "./Messages";

export const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <AiTwotoneVideoCamera />
          <AiOutlineUsergroupAdd />
          <AiOutlineEllipsis />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};
