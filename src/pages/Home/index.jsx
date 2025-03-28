import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router";
import { logout, setUser } from "../../redux/userSlice";
import SideBar from "../../components/SideBar";
import logo from "../../assets/logo.png";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserDetails = async () => {
    try {
      const URL = "http://localhost:8080/api/user-details";
      const response = await axios({
        url: URL,
        withCredentials: true,
      });

      dispatch(setUser(response?.data?.data));
      if (response?.data?.data?.logout) {
        dispatch(logout());
        navigate("/email");
      }

      // console.log("cuurent user Deatails", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const basePath = location.pathname === "/";

  return (
    <>
      <div className="grid lg:grid-cols-[300px_auto] h-screen max-h-screen">
        {/* Sidebar */}
        <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
          <SideBar />
        </section>

        {/* Main Content */}
        <section className={`${basePath && "hidden"}`}>
          <Outlet />
        </section>
        <div className="lg:flex justify-center items-center flex-col gap-2 hidden ">
          <div>
            <img src={logo} alt="logo" width={250} />
          </div>
          <p className="text-lg mt-2 text-slate-500 ">
            Select User to send Message
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
