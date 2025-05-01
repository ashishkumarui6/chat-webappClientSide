import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import Avatar from "../Avatar";
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { FaImage } from "react-icons/fa6";
import { IoIosVideocam } from "react-icons/io";
import uploadFile from "../../helpers/uploadFile";
import { IoClose, IoSend, IoSendOutline } from "react-icons/io5";
import CircularLoading from "../CircularLoading";
import backgroundImage from "../../assets/wallpaper.jpeg";
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

  const [openImageVideoupload, setOpenImageVideoupload] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });

  const [Loading, setLoading] = useState(false);

  const handleUploadImageVidioOpne = () => {
    setOpenImageVideoupload((prev) => !prev);
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const uploadPhoto = await uploadFile(file);
    setLoading(false);
    setOpenImageVideoupload(false);
    setMessage((preve) => {
      return {
        ...preve,
        imageUrl: uploadPhoto.url,
      };
    });
  };

  const handleClearUploadImage = () => {
    setMessage((preve) => {
      return {
        ...preve,
        imageUrl: "",
      };
    });
  };
  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const uploadPhoto = await uploadFile(file);
    setLoading(false);
    setOpenImageVideoupload(false);
    setMessage((preve) => {
      return {
        ...preve,
        videoUrl: uploadPhoto.url,
      };
    });
  };

  const handleClearUploadVideo = () => {
    setMessage((preve) => {
      return {
        ...preve,
        videoUrl: "",
      };
    });
  };

  const handleOchange = (e) => {
    const { name, value } = e.target;

    setMessage((preve) => {
      return {
        ...preve,
        text: value,
      };
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    // Ensure message content is not just whitespace
    const trimmedText = message.text?.trim();

    if (trimmedText || message.imageUrl || message.videoUrl) {
      if (socketConnection) {
        try {
          socketConnection.emit("new message", {
            sender: user?._id,
            receiver: params.userId,
            text: trimmedText,
            imageUrl: message.imageUrl,
            videoUrl: message.videoUrl,
          });
        } catch (error) {
          console.error("Error sending message:", error);
        }
      } else {
        console.warn("Socket connection is not available.");
      }
    } else {
      console.warn("Cannot send an empty message.");
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="page-container"
    >
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
      {/* Show all message  */}
      <section className="h-[calc(100vh-128px)] overflow-x-hidden  overflow-y-scroll scrollbar relative">
        {/* upload Image display */}
        {message?.imageUrl && (
          <div className="w-full h-full bg-slate-700 bg-opacity-30 flex items-center justify-center rounded overflow-hidden ">
            <div
              onClick={handleClearUploadImage}
              className="w-fit p-2 absolute  top-0 right-0 cursor-pointer hover:text-red-600 "
            >
              <IoClose size={30} />
            </div>
            <div className="bg-white p-3">
              <img
                src={message?.imageUrl}
                alt="uploadImage"
                className="aspect-video  w-full h-full max-w-sm m-2 object-scale-down"
              />
            </div>
          </div>
        )}

        {/* upload video display */}
        {message?.videoUrl && (
          <div className="w-full h-full bg-slate-700 bg-opacity-30 flex items-center justify-center rounded overflow-hidden ">
            <div
              onClick={handleClearUploadVideo}
              className="w-fit p-2 absolute  top-0 right-0 cursor-pointer hover:text-red-600 "
            >
              <IoClose size={30} />
            </div>
            <div className="bg-white p-3">
              <video
                src={message?.videoUrl}
                className="aspect-video  w-full h-full max-w-sm m-2 object-scale-down"
                controls
                muted
                autoPlay
              ></video>
            </div>
          </div>
        )}

        {Loading && (
          <div className=" w-full h-full flex justify-center items-center ">
            <CircularLoading />
          </div>
        )}

        <p className="text-center text-gray-700">
          Start chatting or add additional components here...
        </p>
      </section>
      {/* send message  */}
      <section className="h-16 bg-white flex items-center px-4">
        <div className=" relative">
          <button
            onClick={handleUploadImageVidioOpne}
            className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-blue-600 hover:text-white"
          >
            <FiPlus size={20} />
          </button>
          {/* vidio and image  */}

          {openImageVideoupload && (
            <div className="bg-white shadow rounded absolute bottom-14 w-36 p-2 ">
              <form>
                <label
                  htmlFor="uploadImage"
                  className="flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-blue-600">
                    <FaImage size={18} />
                  </div>
                  <p>Image</p>
                </label>
                <label
                  htmlFor="uploadvideo"
                  className="flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-purple-500 ">
                    <IoIosVideocam size={18} />
                  </div>
                  <p>Video</p>
                </label>
                <input
                  onChange={handleUploadImage}
                  type="file"
                  id="uploadImage"
                  className="hidden"
                />
                <input
                  onChange={handleUploadVideo}
                  type="file"
                  id="uploadvideo"
                  className="hidden"
                />
              </form>
            </div>
          )}
        </div>
        {/* input box  */}
        <form onSubmit={handleSendMessage} className="h-full w-full px-2 py-2">
          <div className="flex items-center h-full w-full bg-gray-100 rounded-full px-4 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
              value={message.text}
              onChange={handleOchange}
            />
            <button className="text-blue-600 hover:text-blue-800 transition ml-2">
              <IoSendOutline size={20} />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default MessagePage;
