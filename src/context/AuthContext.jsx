import { useEffect, useState } from "react";
import { createContext } from "react";
import jwtDecode from 'jwt-decode'

export const AuthContext=createContext({})


export const AuthContextProvider=({children})=>{
    const[currentUser,setCurrentUser]=useState(null);
    const[fetchOtherUsersAgain,setFetchOtherUsersAgain]=useState(false)

useEffect(()=>{
    const token=localStorage.getItem('token');
    if(token){
        const decoded=jwtDecode(token)
        setCurrentUser(decoded)
    }
},[])


    return (
        <AuthContext.Provider value={{currentUser,setCurrentUser,fetchOtherUsersAgain,setFetchOtherUsersAgain}}>
            {children}
        </AuthContext.Provider>
    )
}