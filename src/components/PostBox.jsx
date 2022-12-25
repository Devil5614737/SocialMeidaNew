import React, { useContext, useState } from "react";
import { FaceSmileIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FileUploader } from "react-drag-drop-files";
import { newPost } from "../api/request";
import { PostContext } from "../context/PostContext";
import { useCloudinary } from "../hooks/useCloudinary";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { toast } from "react-hot-toast";
import { Spinner } from "./Spinner";



  const fileTypes = ["JPG", "PNG", "GIF"];

export const PostBox = () => {
  const{currentUser}=useContext(AuthContext)
  const{darkMode}=useContext(ThemeContext)
  const {setAllPosts}=useContext(PostContext)
  const [openDropBox, setOpenDropBox] = useState(false);
  const [file, setFile] = useState(null);
  const [caption,setCaption]=useState("");
  const {url}=useCloudinary(file)
  const[loading,setLoading]=useState(false)


  const handleChange = (file) => {
    setFile(file);
  }


  const handleUpload=async()=>{
    setLoading(true)
    if(!url) return ;
    try {
      const {data}=await newPost(caption,url);
      toast.success('posted successfully 🚀🚀')
      setAllPosts(prev=>[data,...prev]);
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
    setCaption("");
    setFile(null);
    setOpenDropBox(false)
  }

  return (
    <div
    style={{
      background:darkMode?"#1a1a1a":"white"
    }}
    className='p-4  rounded-lg'>
      <header>
        <div className="flex gap-x-3">
          <img
            className="w-14 h-14 rounded-full object-cover"
            src={currentUser?.pic}
            alt="Rounded avatar"
          />
          <input
          style={{
            background:darkMode?"#303030":"#F6F7F8",
            color:darkMode?"#fff":"#111",
          }}
            className="w-full bg-[] p-3 py-4 text-2xl focus:outline-none rounded-lg"
            type="text"
            placeholder="What's happening?"
            value={caption}
            onChange={(e)=>setCaption(e.target.value)}
          />
        </div>
      </header>
      <div className=" mt-6">
        {openDropBox && (
          <div className="border-2 border-gray-300 border-dotted w-full h-[20rem] mb-8 grid place-content-center">
            <FileUploader hoverTitle='drop here' id='input' handleChange={handleChange} name="file" types={fileTypes} />
            {file&&
            <p className="text-center text-2xl mt-4">{file?.name}</p>
            }
          </div>
        )}
        <div className="flex">
          <ul className="flex items-center gap-x-7 flex-1">
            <li className="text-2xl flex items-center gap-x-1  text-[#6c6c6c] cursor-pointer">
              <span>
                <FaceSmileIcon className="w-9 h-9" />
              </span>
              Feeling
            </li>
            {openDropBox?<XMarkIcon 
            onClick={()=>setOpenDropBox(false)}
            className="w-10 h-10 cursor-pointer"/>:
            
            <li
              onClick={() => setOpenDropBox((prev) => prev != true)}
              className="text-2xl flex items-center gap-x-1 text-[#6c6c6c] cursor-pointer"
            >
              <span>
                <PhotoIcon className="w-9 h-9" />
              </span>
              Photo/Video
            </li>
            }
          </ul>
          <button
          disabled={!url ||!caption}
          onClick={handleUpload}
            className=" rounded-lg cursor-pointer
      text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium  text-2xl px-10  text-center mr-2 py-3"
          >
            {loading?<Spinner/>:"Post"}
          
          </button>

          
        </div>
      </div>
    </div>
  );
};
