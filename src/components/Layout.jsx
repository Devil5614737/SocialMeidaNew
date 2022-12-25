import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import Login from "../pages/Login";
import { SidebarMenu } from "./SidebarMenu";

export const Layout = ({ children }) => {
  const{darkMode}=useContext(ThemeContext)
  const{currentUser}=useContext(AuthContext)


  
    if (currentUser) {
      return (
        <>
          <div className="flex max-w-[1200px] m-auto">
            <SidebarMenu />
            <main  className="flex-1">{children}</main>
          </div>
        </>
      );
    }else{
      return <Login/>
    }


};
