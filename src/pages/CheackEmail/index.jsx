import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
const CheackEmail = () => {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = "http://localhost:8080/api/email";

    try {
      const response = await axios.post(URL, data);
      console.log("response", response);
      toast.success(response?.data?.message);

      if (response?.data?.success) {
        setData({
          email: "",
        });
        navigate("/password", {
          state: response?.data?.data,
        });
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

  return (
    <>
      <div className="mt-5">
        <div className="bg-white w-full max-w-md mx:2 rounded overflow-hidden p-4 md:mx-auto">
          <div className="w-fit mx-auto mb-2">
            <FaRegCircleUser size={80} />
          </div>
          <h3>Welcome to Chat app!</h3>
          <form onSubmit={handleSubmit} className="grid gap-4 mt-3">
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
            <button className="bg-blue-500 text-white text-lg px-4 py-1 hover:bg-blue-700 hover:text-white rounded mt-2 font-bold leading-relaxed">
              Let's Go
            </button>
          </form>
          <p className="my-3 text-center">
            New User ?{" "}
            <Link
              to="/register"
              className="hover:text-blue-500 hover:underline "
            >
              Register
            </Link>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default CheackEmail;
