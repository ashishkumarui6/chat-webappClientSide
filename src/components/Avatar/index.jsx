import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";

const Avatar = ({ userId, name, imageUrl, width, height }) => {
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

  console.log(randomNumber);

  return (
    <div
      style={{ width: width + "px", height: height + "px" }}
      className="text-slate-800 overflow-hidden rounded-full  text-xl font-bold"
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
    </div>
  );
};

export default Avatar;
