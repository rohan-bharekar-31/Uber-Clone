import React from 'react'
import { createContext,useState } from 'react'

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
    const [user, setUser] = useState({
        fullname:{
            firstname:"",
            lastname:"",
        }
    });

    return (
        <UserDataContext.Provider value={user}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserContext