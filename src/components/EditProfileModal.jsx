import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { editProfile } from "../api/request";
import { useCloudinary } from "../hooks/useCloudinary";
import { Spinner } from "./Spinner";

export const EditProfileModal = ({ close, user, fetchAgain,setOpenEditModal }) => {
  const [fullname, setFullname] = useState(user?.fullname);
  const [profession, setProfession] = useState(user?.profession);
  const [coverFile, setCoverFile] = useState();
  const [profilePicFile, setProfilePicFile] = useState();
  const { url: coverPic } = useCloudinary(coverFile);
  const { url: pic } = useCloudinary(profilePicFile);
  const[loading,setLoading]=useState(false);

  const handleEditProfile = async (e) => {
    e.preventDefault();
    setLoading(true)
    fetchAgain();
    try {
      const { data } = await editProfile(
        fullname,
        profession,
        coverPic,
        pic,
      );
      if (data) {
        setOpenEditModal(false);
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
    setFullname("");
    setProfession("");
  };

  return (
    <div
      className="w-[100vw]
    h-[100vh] fixed top-0
    grid place-content-center
     bg-modalOverlay z-50"
    >
      <div className="relative w-[40rem] h-[40rem] bg-white z-20 p-8 rounded-lg md:mr-[30rem]">
        <p className="text-2xl font-bold mb-5">Edit Profile</p>
        <form onSubmit={handleEditProfile}>
          <div className="mb-6">
            <label
              for="email"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
            >
              Fullname
            </label>
            <input
              type="text"
              id="email"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="text-xl bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              for="password"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
            >
              Profession
            </label>
            <input
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              type="text"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              for="cover"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
            >
              Cover Pic
            </label>
            <input
              onChange={(e) => setCoverFile(e.target.files[0])}
              type="file"
              id="cover"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // required
            />
          </div>
          <div className="mb-6">
            <label
              for="profilepic"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
            >
              Profile Pic
            </label>
            <input
              onChange={(e) => setProfilePicFile(e.target.files[0])}
              type="file"
              id="profilepic"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-lg"
          >
            {loading?<Spinner/>:"Save"}
          </button>
        </form>
        <XMarkIcon
          onClick={()=>setOpenEditModal(false)}
          className="w-11 h-11 absolute top-5 right-5 cursor-pointer"
        />
      </div>
    </div>
  );
};
