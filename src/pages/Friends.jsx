import React, { useContext, useEffect, useState } from 'react'
import { User } from '../components/User'
import {friends as friend} from '../api/request';
import { AuthContext } from '../context/AuthContext';

function Friends() {
const{fetchOtherUsersAgain,setFetchOtherUsersAgain}=useContext(AuthContext)
const [friends,setFriends]=useState([]);

const fetchFriends=async()=>{
    try {
        const {data}=await friend()
        setFriends(data);
    } catch (error) {
        console.log(error)
    }
}


useEffect(()=>{
    fetchFriends();
    return ()=>setFetchOtherUsersAgain(false)
},[fetchOtherUsersAgain])



  return (
    <>
    <div className="p-5 ">
        <h3 className='text-5xl'>Friends</h3>
        <div className="flex flex-wrap mt-20 gap-x-10">
        {friends?.map(user=>
            <User key={user?._id} user={user}/>
            )}
        
        </div>
    </div>
    </>
  )
}

export default Friends