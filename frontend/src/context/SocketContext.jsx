import React, { createContext } from "react"
import { useEffect } from "react";
import { io } from "socket.io-client";

export const SocketDataContext = createContext();
const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const SocketContext = ({ children }) => {
    
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Socket connected to server");
        })
    }, [])


    return (
        <SocketDataContext.Provider value={{Socket:socket }}>
            {children}
        </SocketDataContext.Provider>
    )
}

export default SocketContext