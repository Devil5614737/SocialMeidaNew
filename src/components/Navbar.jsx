import React, { useContext } from 'react'
import {AuthContext} from '../context/AuthContext'
import { ThemeContext } from '../context/ThemeContext'



export const Navbar = () => {
    const{darkMode}=useContext(ThemeContext)
    const{currentUser}=useContext(AuthContext)
  return (
    <nav
    style={{
      background:darkMode?"#101010":'white',
      border:darkMode&&'none',
      color:darkMode&&'white'
    }}
    className='flex justify-end p-3 py-6 items-center gap-4 top-0 sticky  bg-white w-full z-50'>
        <p className='text-2xl'>{currentUser?.fullname}</p>
        <img className="w-10 h-10 rounded object-cover" src={currentUser?.pic} alt="Default avatar"></img>
    </nav>
  )
}
