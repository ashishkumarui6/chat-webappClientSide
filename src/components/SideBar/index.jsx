import React, { useState } from "react";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from "react-router";
import { BiLogOut } from "react-icons/bi";
import Avatar from "../Avatar";
import { useSelector } from "react-redux";
import EditUserDeatails from "../EditUserDeatails.jsx";
import Divider from "../Divider.jsx/index.jsx";
const SideBar = () => {
  const user = useSelector((state) => state?.user);

  const [editUserOpen, setEditUserOpen] = useState(false);
  return (
    <div className="w-full h-full flex bg-white">
      <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between">
        <div>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 cursor-pointer flex justify-center items-center hover:bg-slate-200 rounded ${
                isActive && "bg-slate-200"
              }`
            }
            title="chat"
          >
            <IoChatbubbleEllipsesSharp size={20} />
          </NavLink>
          <div
            title="add friend"
            className="w-12 h-12 cursor-pointer flex justify-center items-center hover:bg-slate-200 rounded"
          >
            <FaUserPlus size={20} />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="mx-auto"
            title={user?.name}
            onClick={() => setEditUserOpen(true)}
          >
            {" "}
            <Avatar
              width={40}
              height={40}
              name={user?.name}
              imageUrl={user?.profile_pic}
            />
          </button>
          <button
            title="logout"
            className="w-12 h-12 cursor-pointer flex justify-center items-center hover:bg-slate-200 rounded"
          >
            <span className="-ml-2">
              <BiLogOut size={20} />
            </span>
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="h-16 flex items-center">
          <h2 className="text-2xl font-bold p-4 text-slate-800">Mesage</h2>
        </div>
        <div className="bg-slate-200 p-[0.5px]"></div>
        <div className="bg-red-500 h-[calc(100vh-65px)] overflow-x-hidden overflow-y-scroll scrollbar"></div>
      </div>
      {/* Edite user deatal  */}
      {editUserOpen && (
        <EditUserDeatails onClose={() => setEditUserOpen(false)} user={user} />
      )}
    </div>
  );
};

export default SideBar;
