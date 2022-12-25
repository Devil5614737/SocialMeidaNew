import React, { useContext } from 'react'
import { Toaster } from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'
import { Card } from './Card'
import { PostBox } from './PostBox'

export const Feed = ({allPosts}) => {
  const{darkMode}=useContext(ThemeContext)
  const params = useLocation();
const path=params.pathname




  return (
  <>
    <div className= {`col-span-4 lg:col-span-2 bg-[${darkMode?'#101010':"fff"}] px-5`}>
      {path==='/home'&&
      <PostBox/>
      }
      <div className="posts mt-10">
        {allPosts?.map(post=>
        <Card key={post._id} post={post}/>
          )}
      
      </div>
    </div>
    <Toaster
    position='top-right'
  toastOptions={{
    duration:2000,
    style:{
      fontSize:15
    }
  }}
    />
  </>
  )
}
