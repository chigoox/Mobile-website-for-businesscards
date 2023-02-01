import React from "react";
import {Outlet} from "react-router-dom";
import Header from "../Componets/Header";

const Layout = () => {
  
  return (
    <div className="bg-[color:var(--BGColor)]">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;