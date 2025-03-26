import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";

const App = () => {
  return (
    <>
      <Toaster />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
