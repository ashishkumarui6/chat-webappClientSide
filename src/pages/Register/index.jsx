import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import uploadFile from "../../helpers/uploadFile";
import axios from "axios";
import toast from "react-hot-toast";
const Register = () => {
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const [uploadPhoto, setUploadPhoto] = useState("");

  const navigate = useNavigate("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = "http://localhost:8080/api/register";

    try {
      const response = await axios.post(URL, data);
      console.log("response", response);
      toast.success(response?.data?.message);

      if (response?.data?.success) {
        setData({
          name: "",
          phone: "",
          email: "",
          password: "",
          profile_pic: "",
        });
        navigate("/email");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleonChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);
    console.log("uploadPhoto", uploadPhoto);
    setUploadPhoto(file);
    setData((preve) => {
      return {
        ...preve,
        profile_pic: uploadPhoto?.url,
      };
    });
  };

  const handleClearUploadPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadPhoto(null);
  };

  return (
    <>
      <div className="mt-5">
        <div className="bg-white w-full max-w-md mx:2 rounded overflow-hidden p-4 md:mx-auto">
          <h3>Welcome to Chat app!</h3>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="enter your name"
                className="bg-slate-100 px-2 py-2 focus:outline-blue-500"
                value={data.name}
                onChange={handleonChange}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="phoen">Phone:</label>
              <input
                type="number"
                id="phone"
                name="phone"
                placeholder="enter your phone"
                className="bg-slate-100 px-2 py-2 focus:outline-blue-500"
                value={data.phone}
                onChange={handleonChange}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="enter your email"
                className="bg-slate-100 px-2 py-2 focus:outline-blue-500"
                value={data.email}
                onChange={handleonChange}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password:</label>
              <input
                type="text"
                id="password"
                name="password"
                placeholder="enter your Password"
                className="bg-slate-100 px-2 py-2 focus:outline-blue-500"
                value={data.password}
                onChange={handleonChange}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="profile_pic">
                Photo:
                <div className="h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-blue-500 cursor-pointer">
                  <p className="text-sm max-w-[200]">
                    {uploadPhoto?.name || "Upload profile photo"}
                  </p>
                  {uploadPhoto?.name && (
                    <button
                      onClick={handleClearUploadPhoto}
                      className="text-lg ml-2 hover:text-red-600"
                    >
                      <IoMdClose />
                    </button>
                  )}
                </div>
              </label>
              <input
                type="file"
                id="profile_pic"
                name="profile_pic"
                className="bg-slate-100 px-2 py-2 focus:outline-blue-500 hidden"
                onChange={handleUploadPhoto}
              />
              {uploadPhoto && (
                <div className="mt-2">
                  <p className="text-sm">Selected file: {uploadPhoto.name}</p>
                </div>
              )}
            </div>
            <button className="bg-blue-500 text-white text-lg px-4 py-1 hover:bg-blue-700 hover:text-white rounded mt-2 font-bold leading-relaxed">
              Register
            </button>
          </form>
          <p className="my-3 text-center">
            Already have acount ?{" "}
            <Link to="/email" className="hover:text-blue-500 hover:underline ">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
