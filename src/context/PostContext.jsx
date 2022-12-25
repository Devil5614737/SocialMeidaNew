import { useState } from "react";
import { createContext } from "react";



export const PostContext=createContext({})


export const PostContextProvider=({children})=>{

    const[allPosts,setAllPosts]=useState([]);
    const[fetchPostsAgain,setFetchPostsAgain]=useState(false)



    return (
        <PostContext.Provider value={{allPosts,setAllPosts,fetchPostsAgain,setFetchPostsAgain}}>
            {children}
        </PostContext.Provider>
    )
}