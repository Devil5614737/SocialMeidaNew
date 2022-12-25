import React, { useContext, useEffect } from 'react'
import { fetchAllPosts} from '../api/request'
import { Feed } from '../components/Feed'
import { Friends } from '../components/Friends'
import { Navbar } from '../components/Navbar'
import { News } from '../components/News'
import { PostContext } from '../context/PostContext'
import { ThemeContext } from '../context/ThemeContext'


function Home() {
  const{allPosts,setAllPosts,fetchPostsAgain,setFetchPostsAgain}=useContext(PostContext)
  const{darkMode}=useContext(ThemeContext)
  

  const fetchPosts=async()=>{
    try {
        const {data}=await fetchAllPosts();
        setAllPosts(data)
    } catch (error) {
        console.log(error)
    }
}



useEffect(()=>{
fetchPosts();
return ()=>setFetchPostsAgain(false)
},[fetchPostsAgain])
  return (
    <>
    <Navbar/>
    
    <div className={`grid md:grid-cols-4 grid-cols-1  bg-[${darkMode?'#101010':"fff"}] p-5`}>
      
      <Feed allPosts={allPosts}/>
      <News/>
      <Friends/>
    </div>
    
    </>
  )
}

export default Home