import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import React, { useContext } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { lists } from "../helpers/data";
import { listClassName } from "../helpers/tailwindClasses";

export const SidebarMenu = () => {
  const { darkMode } = useContext(ThemeContext);
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;



  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  return (
    <div
    
    className=" w-fit md:w-[250px] p-3 py-6 sticky h-fit top-0 delay-100 ">
      <Link className="hidden md:block font-semibold text-3xl mb-10 " to="/home">
        TheSocialScene
      </Link>
      <ul>
        {lists.map((item) => (
          <li
          id="link"
            onClick={() => navigate(item.href)}
            key={item.id}
            className={listClassName(item.href,currentPath,darkMode)}
          >
            <item.icon className="w-8 h-8" />
            <Link
              to={item.href}
              className="hidden md:block text-3xl m-0 "
            >
              {item.title}
            </Link>
          </li>
        ))}
        <li
          onClick={handleLogout}
          className={`flex items-center space-x-5 mb-4 hover:bg-gray-200 p-3 py-6 rounded-lg cursor-pointer
            font-medium  text-sm px-5  text-center mr-2`}
        >
          <ArrowLeftOnRectangleIcon className="w-8 h-8" />
          <p className="hidden md:block text-3xl m-0 transition-all">Signout</p>
        </li>
      </ul>
    </div>
  );
};
