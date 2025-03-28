import React, { useEffect, useRef, useState } from "react";
import Avatar from "../Avatar";
import uploadFile from "../../helpers/uploadFile";
import Divider from "../Divider.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice.js";

const EditUserDeatails = ({ onClose, user }) => {
  const [data, setData] = useState({
    _id: user?.user,
    name: user?.user,
    profile_pic: user?.profile_pic,
  });

  const uploadPhotoRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    setData((preve) => {
      return {
        ...preve,
        ...user,
      };
    });
  }, [user]);

  const handleonChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleOpenUploadPhoto = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadPhotoRef.current.click();
  };
  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);
    console.log("uploadPhoto", uploadPhoto);

    setData((preve) => {
      return {
        ...preve,
        profile_pic: uploadPhoto?.url,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = "http://localhost:8080/api/update-user";

    try {
      const response = await axios.post(URL, data, { withCredentials: true });

      console.log("response", response);

      toast.success(response?.data?.message || "Successfully updated!");

      if (response?.data?.success) {
        const user = response?.data?.da || {};

        if (user._id) {
          dispatch(setUser(user));
        } else {
          console.error("Invalid user data:", user);
        }
      }
      onClose();
    } catch (error) {
      console.error("Error occurred:", error);

      // Safely handling errors
      toast.error(
        error?.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 opacity-40  flex justify-center items-center ">
      <div className="bg-white p-4 py-6 m-1 rounded w-full max-w-sm text-black">
        <h4 className="font-semibold">Profile Deatails</h4>
        <p className="text-sm">Edit user details</p>
        <form
          className="grid gap-5 p-4 rounded-lg shadow-lg bg-gradient-to-r from-blue-50 to-blue-100"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2 text-blue-800">
            <label htmlFor="name" className="font-semibold tracking-wide">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleonChange}
              className="w-full py-2 px-3 border border-blue-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name..."
            />
          </div>
          <div className="my-4">
            <div className="flex items-center gap-4">
              <Avatar
                width={50}
                height={50}
                imageUrl={data?.profile_pic}
                name={data?.name}
              />
              <label
                htmlFor="profile_pic"
                className="flex flex-col items-start"
              >
                <div className="font-medium text-blue-700">Photo:</div>
                <button
                  type="button"
                  onClick={handleOpenUploadPhoto}
                  className="py-1 px-3 rounded-lg bg-blue-500 text-white hover:bg-blue-700"
                >
                  Change Photo
                </button>
                <input
                  type="file"
                  className="hidden"
                  id="profile_pic"
                  onChange={handleUploadPhoto}
                  ref={uploadPhotoRef}
                />
              </label>
            </div>
          </div>
          <Divider className="border-t border-blue-300" />
          <div className="flex gap-4 mt-4 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 rounded-lg bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg transition-all"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(EditUserDeatails);
