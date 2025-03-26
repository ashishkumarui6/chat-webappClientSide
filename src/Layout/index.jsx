import React from "react";
import logo from "../assets/logo.png";

const AuthLayout = ({ children }) => {
  return (
    <>
      <header className="flex justify-center items-center h-20 py-3  shadow-md bg-white">
        <img src={logo} alt="" height={120} width={100} />
      </header>
      {children}
    </>
  );
};

export default AuthLayout;
