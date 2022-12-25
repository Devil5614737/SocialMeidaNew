import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { addFriend, removeFriend } from "../api/request";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { addFriendClass2, viewProfileBtnClass } from "../helpers/tailwindClasses";
import { isFriend } from "../helpers/userLogics";

export const User = ({ user }) => {
  const { darkMode } = useContext(ThemeContext);
  const { setFetchOtherUsersAgain, currentUser } = useContext(AuthContext);

  const addAFriend = async () => {
    setFetchOtherUsersAgain(true);
    await addFriend(user?._id);
  };
  const removeAFriend = async () => {
    setFetchOtherUsersAgain(true);
    await removeFriend(user?._id);
  };

  return (
    <div 
    style={{
      background:darkMode?"#1a1a1a":'white',
      border:darkMode&&'none',
      color:darkMode&&'white'
    }}
    className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mb-8">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={user?.pic}
          alt={user?.fullname}
        />
        <h5
        style={{
          color:darkMode&&'white'
        }}
        className="mb-1 text-xl  md:text-2xl font-medium text-gray-900 dark:text-white">
          {user?.fullname}
        </h5>
        <span className="text-sm md:text-lg text-gray-500 dark:text-gray-400">
          {user?.profession}
        </span>
        <div className="flex mt-4 space-x-3 md:mt-6">
          {isFriend(user,currentUser?._id) === -1 ? (
            <a
              onClick={addAFriend}
              href="#"
              className={addFriendClass2()}
            >
              Add friend
            </a>
          ) : (
            <a
              href="#"
              className={addFriendClass2()}
              onClick={removeAFriend}
            >
              Remove friend
            </a>
          )}
          <Link
            to={`/${user?._id}`}
            href="#"
            className={viewProfileBtnClass()}
          >
            View profile
          </Link>
        </div>
      </div>
    </div>
  );
};
