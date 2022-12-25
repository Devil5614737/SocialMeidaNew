import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addFriend,
  otherUserPosts,
  otherUserProfile,
  removeFriend,
} from "../api/request";
import { Feed } from "../components/Feed";
import { Friends } from "../components/Friends";
import { Navbar } from "../components/Navbar";
import { News } from "../components/News";
import { PostContext } from "../context/PostContext";




function OtherUserProfile() {
  const { setFetchPostsAgain, fetchPostsAgain } = useContext(PostContext);
  const [user, setUser] = useState();
  const [allPosts, setAllPosts] = useState([]);
  const params = useParams();
  const userId = params.id;

  const fetchUserProfile = async () => {
    try {
      const { data } = await otherUserProfile(userId);
      setUser(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const { data } = await otherUserPosts(userId);
      setAllPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchPosts();
    return () => setFetchPostsAgain(false);
  }, [userId, fetchPostsAgain]);


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
              <p className="text-xl ml-5 mt-2">UI/UX Designer</p>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-x-10 p-5 mt-36">
          <Feed allPosts={allPosts} />
          <News />
        </div>
      </div>
    </>
  );
}

export default OtherUserProfile;
