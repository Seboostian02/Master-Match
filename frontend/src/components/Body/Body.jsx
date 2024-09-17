import React from "react";
import "./Body.css";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="body-div">
      <Outlet />
    </div>
  );
};

export default Body;
