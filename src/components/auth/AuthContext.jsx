import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";

const UserContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    useEffect(() => {
       const unsub =  onAuthStateChanged(auth, (currentUser) => {
        console.log(currentUser)
            setUser(currentUser)
        })
        return () => {
            unsub()
        }
    })
  return (
    <UserContext.Provider value={{user}}>
        {children}
    </UserContext.Provider>
  )
}

export const UserAuth = () => {
    return useContext(UserContext)
}