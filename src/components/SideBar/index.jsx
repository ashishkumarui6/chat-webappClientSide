import React from "react";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

const SideBar = () => {
  return (
    <div className="w-full h-full">
      <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5">
        <div>
          <IoChatbubbleEllipsesSharp />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
