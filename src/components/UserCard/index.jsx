import React from "react";
import Avatar from "../Avatar";
import { Link } from "react-router";

const UserCard = ({ user, onClose }) => {
  return (
    <Link
      to={"/" + user?._id}
      onClick={onClose}
      className="flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-200 hover:border hover:border-blue-600 transition-all duration-300 rounded-md shadow-sm"
    >
      <div>
        <Avatar width={50} height={50} name={user?.name} />
      </div>
      <div className="flex flex-col">
        <div className="font-semibold  text-ellipsis line-clamp-1">
          {user?.name}
        </div>
        <p className="text-sm text-ellipsis line-clamp-1">{user?.email}</p>
      </div>
    </Link>
  );
};

export default UserCard;
