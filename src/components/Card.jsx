import React, { useContext, useRef, useState } from "react";
import {
  HeartIcon,
  ShareIcon,
  ChatBubbleLeftIcon,
  PaperAirplaneIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconFilled,

} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { isLiked, isMyPost, loggedUser } from "../helpers/userLogics";
import { AuthContext } from "../context/AuthContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { comment, like, removePost, sharePost, unLike } from "../api/request";
import { PostContext } from "../context/PostContext";
import { motion } from "framer-motion";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { ThemeContext } from "../context/ThemeContext";
import { toast } from "react-hot-toast";
import { Spinner } from "./Spinner";



export const Card = ({ post }) => {
  const { darkMode } = useContext(ThemeContext);
  const { currentUser } = useContext(AuthContext);
  const { setFetchPostsAgain,setAllPosts } = useContext(PostContext);
  const ref = useRef();
  const[commentText,setCommentText]=useState("")
const navigate=useNavigate()
const[loading,setLoading]=useState(false);

const handleComment=async(e)=>{
  e.preventDefault();
  setLoading(true)
  setFetchPostsAgain(true)
  try {
  const {data}=await comment(commentText,post?._id)
  if(data) setLoading(false);
  } catch (error) {
    setLoading(false);
  };
setCommentText("")
};

const likePost=async()=>{
  await like(post?._id)
}
const unLikePost=async()=>{
  await unLike(post?._id)
}

const handleLike=()=>{
  setFetchPostsAgain(true)
isLiked(post,currentUser)==-1?likePost():unLikePost()
}


const removeMyPost=async()=>{
  setFetchPostsAgain(true);
  await removePost(post?._id)
}


const handleShare=async()=>{
  setFetchPostsAgain(true);
try {
  const {data}=await sharePost(post?._id)
  toast.success(`shared ${post?.postedBy?.fullname}'s post`)
  setAllPosts(prev=>[data,...prev])
} catch (error) {
  console.log(error)
  
}
}

  return (
    <motion.div
    initial={{ scale: 0.8,opacity:0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20
    }}
    // #1a1a1a
    style={{
      background:darkMode?"#1a1a1a":'white',
      border:darkMode&&'none',
      color:darkMode&&'white'
    }}
    className={`p-6  border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-70 mb-6`}>
      <header>
        <div className="flex items-center ">
          <div className="flex items-center gap-x-4 flex-1">
          <img
            className="w-14 h-14 rounded-full object-cover"
            src={post?.postedBy?.pic}
            alt="Rounded avatar"
          />
          <Link
            to={
              loggedUser(currentUser, post?.postedBy)
                ? "/profile"
                : `/${post?.postedBy?._id}`
            }
            className="text-2xl"
          >
            {post?.postedBy?.fullname}
          </Link>
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <p className="text-lg ">{formatDistanceToNow(new Date(post?.createdAt),{addSuffix:true})}</p>
          </div>
          {isMyPost(post?.postedBy?._id,currentUser) &&
          <div onClick={removeMyPost} className="flex items-center gap-x-2 cursor-pointer">
          <TrashIcon className="w-8  h-8 cursor-pointer"/>
          <p className="text-xl">remove</p>
        </div>
          }
        </div>
      </header>
      <div className="body">
        <p className="mt-4 text-2xl">{post?.caption}</p>
        <LazyLoadImage

          width={"100%"}
          height={'100%'}
          className="mt-6 object-center rounded-2xl "
          src={post?.image}
          alt="user post"
          effect="opacity"
        />
        <div className="flex items-center">
          {post?.likes?.length>0&&
          <div className="flex -space-x-4 mt-4 flex-1">
          {post?.likes?.slice(0,4).map(like=>
          <img
          key={like._id}
            className="w-11 h-11 rounded-full border-2 border-white dark:border-gray-800"
            src={like?.pic}
            alt={like?.fullname}
          />
            )}
        
          <a
            className="flex justify-center items-center w-11 h-11 text-xs font-medium text-white bg-gray-700 rounded-full border-2 border-white hover:bg-gray-600 dark:border-gray-800"
            href="#"
          >
            {post?.likes?.length}+
          </a>
        </div>}
          <div className="flex items-center gap-x-3">
            <p className="text-2xl">{post?.likes?.length} Likes</p>
            <p className="text-2xl">{post?.comments?.length} comments</p>
            <p className="text-2xl">{post?.shares?.length} share</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-5 border-y-2 py-4">
          <motion.div
          //  whileHover={{ scale: 1.1 }}
           whileTap={{
             scale: 0.8,

           }}
          
          onClick={handleLike} className="cursor-pointer flex items-center gap-x-2">
            {isLiked(post,currentUser)==-1?
            <>
            <HeartIcon className="w-8 h-8" />
            <p className="text-2xl ">Like</p>
            </>
            :  
            <>
            <HeartIconFilled color="red" className="w-8 h-8" />
            <p className="text-2xl ">Like</p>
            </>
            
            }
          </motion.div>
          <div
            onClick={() => ref.current.focus()}
            className="cursor-pointer flex items-center gap-x-2"
          >
            <ChatBubbleLeftIcon className="w-8 h-8" />
            <p className="text-2xl">Comment</p>
          </div>
          <div className="cursor-pointer flex items-center gap-x-2" onClick={handleShare}>
            <ShareIcon className="w-8 h-8" />
            <p className="text-2xl">Share</p>
          </div>
        </div>
        <div className="">
          <p className="mt-2 text-gray-400 text-xl underline">comments</p>
{post?.comments?.map(comment=>
          <motion.p
          initial={{ opacity:0 }}
          animate={{ opacity: 1 }}
          onClick={()=>navigate(`/${comment?.postedBy?._id}`)}
          title={`go to ${comment?.postedBy?.fullname} profile` }
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          
          key={comment._id} className="font-bold text-2xl mt-3 cursor-pointer">
            {comment?.postedBy?.fullname}<span className="font-medium ml-3">{comment?.text}</span>
          </motion.p>
  )}

        </div>
        <form onSubmit={handleComment} className="mt-4 flex items-center gap-x-3">
          <img
            className="w-11 h-11 rounded-full object-cover"
            src={currentUser?.pic}
            alt="Rounded avatar"
          />
          <input
            style={{
              background:darkMode?"#303030":"#F6F7F8",
              color:darkMode?"#fff":"#111",
            }}
          value={commentText}
          onChange={e=>setCommentText(e.target.value)}
            ref={ref}
            className="flex-1 bg-[#F6F7F8] py-5 px-2 text-xl rounded-lg focus:outline-none"
            type="text"
            placeholder="Write a comment..."
          />
          <button
          style={{
            background:darkMode?"#303030":"#F6F7F8",
            color:darkMode?"#fff":"#111",
          }}
            disabled={!commentText}
            className="bg-[#EBF2FF] p-4 rounded-lg cursor-pointer"
          >
            {loading?<Spinner/>:
            <PaperAirplaneIcon className="w-8 h-8" color="#649AFF" />
            }
          </button>
        </form>
      </div>
    </motion.div>
  );
};
