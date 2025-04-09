import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import Avatar from "../Avatar";
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft } from "react-icons/fa6";
const MessagePage = () => {
  const params = useParams();
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );

  const user = useSelector((state) => state?.user);
  const [dataUser, setDataUser] = useState({
    name: "Loading...",
    email: "Loading...",
    profile_pic: "",
    online: false,
    _id: "",
  });

  useEffect(() => {
    if (socketConnection && params?.userId) {
      // Emit an event to signal the current user page
      socketConnection.emit("message-page", params?.userId);

      const handleMessageUser = (data) => {
        setDataUser(data);
      };

      // Listen for incoming user data
      socketConnection.on("message-user", handleMessageUser);

      // Cleanup the listener on unmount or dependency change
      return () => {
        socketConnection.off("message-user", handleMessageUser);
      };
    }
  }, [socketConnection, params?.userId, user]);

  // console.log("user404040", user);

  return (
    <div className="page-container">
      <header className="sticky top-0 h-16 bg-white flex items-center justify-between px-4 border-b">
        <div className="flex items-center">
          <Link to={"/"} className="lg:hidden mr-4">
            <FaAngleLeft size={20} className="cursor-pointer text-gray-600" />
          </Link>
          <Avatar
            width={50}
            height={50}
            imageUrl={dataUser?.profile_pic}
            name={dataUser?.name}
            userId={dataUser?._id}
          />
          <div className="ml-4">
            <h1 className="text-lg font-semibold text-ellipsis line-clamp-1">
              {dataUser?.name}
            </h1>
            <p
              className={`text-sm ${
                dataUser?.online ? "text-green-500" : "text-red-500"
              }`}
            >
              {dataUser?.online ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <div>
          <button className="cursor-pointer hover:text-blue-600 ">
            <HiDotsVertical />
          </button>
        </div>
      </header>
      <main className="p-4">
        <p className="text-center text-gray-700">
          Start chatting or add additional components here...
        </p>
      </main>
    </div>
  );
};

export default MessagePage;
