import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const quit = () => {
    signOut(auth);
    dispatch({ type: "INITIAL_USER", payload: null });
  };
  return (
    <div className="navbar">
      <span className="logo">Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={quit}>logout</button>
      </div>
    </div>
  );
};
