import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import Avatar from "../../components/Avatar";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/userSlice";
const CheckPassword = () => {
  const [data, setData] = useState({
    password: "",
  });

  const navigate = useNavigate();
  const loaction = useLocation();
  const dispatch = useDispatch();

  console.log("loaction", loaction.state);

  useEffect(() => {
    if (!loaction?.state?.name) {
      navigate("/email");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = "http://localhost:8080/api/password";

    try {
      const response = await axios({
        method: "post",
        url: URL,
        data: {
          userId: loaction?.state?._id,
          password: data?.password,
        },
        withCredentials: true,
      });

      toast.success(response?.data?.message);

      if (response?.data?.success) {
      }

      if (response?.data?.success) {
        dispatch(setToken(response?.data?.token));
        localStorage.setItem("token", response?.data?.token);
        setData({
          password: "",
        });
        navigate("/");
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
          <div className="w-fit mx-auto mb-2 flex justify-center items-center flex-col">
            <Avatar
              width={70}
              height={70}
              name={loaction?.state?.name}
              imageUrl={loaction?.state?.profile_pic}
            />
            <h2 className="font-semibold text-lg mt-1">
              {loaction?.state?.name}
            </h2>
            {/* <FaRegCircleUser size={70} /> */}
          </div>
          <h3>Welcome to Chat app!</h3>
          <form onSubmit={handleSubmit} className="grid gap-4 mt-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="enter your password"
                className="bg-slate-100 px-2 py-2 focus:outline-blue-500"
                value={data.password}
                onChange={handleonChange}
                required
              />
            </div>
            <button className="bg-blue-500 text-white text-lg px-4 py-1 hover:bg-blue-700 hover:text-white rounded mt-2 font-bold leading-relaxed">
              Login
            </button>
          </form>
          <p className="my-3 text-center">
            <Link
              to="/forgot-password"
              className="hover:text-blue-500 hover:underline "
            >
              Forgot password ?
            </Link>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default CheckPassword;
