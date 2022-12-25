import React, { useEffect, useState,useContext } from 'react'
import { otherUsers } from '../api/request';
import { User } from './User';
import {AuthContext} from '../context/AuthContext'

export const Friends = () => {
const[users,setUsers]=useState([]);
const {fetchOtherUsersAgain,setFetchOtherUsersAgain}=useContext(AuthContext)


  const fetchOtherUsers=async()=>{
    try {
      const {data}=await otherUsers();
      setUsers(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
fetchOtherUsers();
return ()=>setFetchOtherUsersAgain(false)
  },[fetchOtherUsersAgain])
  return (
    <div className= {`hidden lg:${users?.length>0?"block":"hidden"} p-5`}>
      <p className='text-2xl font-semibold'>People you may know</p>

      <div className="mt-8">
        {users?.map(user=>
        <User key={user._id} user={user}/>
          )}
      </div>
    </div>
  )
}
