import "./Loading.css";

import React from "react";

export const Loading = () => {
  return (
    <>
      <svg width="100px" height="100px" className="loading-svg">
        <circle cx="50" cy="50" r="20" className="loading" />
        <text x="22" y="88">
          Loading...
        </text>
      </svg>
    </>
  );
};
