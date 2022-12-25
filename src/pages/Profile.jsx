import React, { useContext, useEffect, useState } from "react";
import { loggedUser, myPosts } from "../api/request";
import { EditProfileModal } from "../components/EditProfileModal";
import { Feed } from "../components/Feed";
import { Friends } from "../components/Friends";
import { Navbar } from "../components/Navbar";
import { News } from "../components/News";
import { PostContext } from "../context/PostContext";
import { editProfileBtn } from "../helpers/tailwindClasses";

function Profile() {
  const { setFetchPostsAgain, fetchPostsAgain } = useContext(PostContext);
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);

  const fetchLoggedUser = async () => {
    try {
      const { data } = await loggedUser();
      setUser(data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMyPosts = async () => {
    try {
      const { data } = await myPosts();
      setAllPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLoggedUser();
    fetchMyPosts();
    return () => {
      setFetchAgain(false), setFetchPostsAgain(false);
    };
  }, [fetchAgain, fetchPostsAgain]);

  return (
    <>
      <Navbar />
      <div className="w-full p-5">
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="relative">
            <img
              loading="lazy"
              className="rounded-t-lg object-cover bg-center w-full h-[40rem]"
              src={user?.coverPic}
              alt="user cover"
            />
            <button
              type="button"
              className={editProfileBtn()}
              onClick={() => setOpenEditModal(true)}
            >
              Edit Profile
            </button>
            <div className="absolute -bottom-28 left-10">
              <img
                loading="lazy"
                className="w-44 h-44 rounded-full object-cover  border-[5px] border-white"
                src={user?.pic}
                alt={user?.fullname}
              />
              <p className="text-4xl font-semibold mt-3 ml-5">
                {user?.fullname}
              </p>
              <p className="text-xl ml-5 mt-2">{user?.profession}</p>
            </div>
          </div>
        </div>
        <div className={`grid md:grid-cols-4 grid-cols-1 gap-x-10  p-5 mt-36`}>
          <Feed allPosts={allPosts} />
          <News />
          <Friends />
        </div>
      </div>
      {openEditModal && (
        <EditProfileModal
          user={user}
          setOpenEditModal={setOpenEditModal}
          fetchAgain={() => setFetchAgain(true)}
        />
      )}
    </>
  );
}

export default Profile;
