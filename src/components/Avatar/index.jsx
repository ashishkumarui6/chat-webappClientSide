import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Avatar = ({ userId, name, imageUrl, width, height }) => {
  const onlineUser = useSelector((state) => state?.user?.onlineUser);
  // Amit Prajapati

  let AvatarName = "";

  if (name) {
    const splitName = name?.split("");

    if (name) {
      const splitName = name?.split(" ");

      if (splitName.length > 1) {
        AvatarName = splitName[0][0] + splitName[1][0];
      } else {
        AvatarName = splitName[0][0];
      }
    }
  }

  const bgColor = [
    "bg-slate-200",
    "bg-teal-200",
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-gray-200",
    "bg-cyan-200",
    "bg-pink-200",
  ];

  const randomNumber = Math.floor(Math.random() * 8);

  const isOnline = onlineUser.includes(userId);

  console.log("onlineUser", onlineUser);

  console.log(randomNumber);

  return (
    <div
      style={{ width: width + "px", height: height + "px" }}
      className="text-slate-800 rounded-full  text-xl font-bold relative "
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          width={width}
          height={height}
          className="overflow-hidden rounded-full"
        />
      ) : name ? (
        <div
          style={{ width: width + "px", height: height + "px" }}
          className={`overflow-hidden rounded-full flex justify-center items-center shadow  border ${bgColor[randomNumber]}`}
        >
          {AvatarName}
        </div>
      ) : (
        <FaRegCircleUser size={width} />
      )}
      {isOnline && (
        <div className="bg-green-600 absolute p-1 bottom-2 -right-1 z-10 rounded-full hover:bg-green-700"></div>
      )}
    </div>
  );
};

export default Avatar;
