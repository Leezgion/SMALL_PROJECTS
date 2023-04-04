import "./hoverButton.css";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import React from "react";

interface Props {
  type?: "right" | "left" | null;
  className?: string;
  onClick?: any | null | undefined;
}
export const HoverButton = (props: Props) => {
  return (
    <div onClick={props.onClick} className={`${props.className} hoverButton`}>
      {props.type === "left" && (
        <AiOutlineArrowLeft className="hoverButton-icon" />
      )}
      {props.type === "right" && (
        <AiOutlineArrowRight className="hoverButton-icon" />
      )}
      {props.type === undefined && <></>}
    </div>
  );
};
