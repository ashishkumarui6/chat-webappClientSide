import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { logout, setUser } from "../../redux/userSlice";
import SideBar from "../../components/SideBar";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("redux user", user);

  const fetchUserDetails = async () => {
    try {
      const URL = "http://localhost:8080/api/user-details";
      const response = await axios({
        url: URL,
        withCredentials: true,
      });

      dispatch(setUser(response?.data?.data));

      if (response?.data.logout) {
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

  return (
    <>
      <div className="grid lg:grid-cols-[300px_auto] h-screen max-h-screen">
        {/* Sidebar */}
        <section className="bg-white">
          <SideBar />
        </section>

        {/* Main Content */}
        <section>
          <Outlet />
        </section>
      </div>
    </>
  );
};

export default Home;
