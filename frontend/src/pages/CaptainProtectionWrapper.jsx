import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainProtectionWrapper = ({ children }) => {

    const token = localStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { setCaptain } = useContext(CaptainDataContext);

    useEffect(() => {
        if (!token) {
            navigate("/captain-login");
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status == 200) {
                setCaptain(response.data.captain);
                setIsLoading(false);
            }
    
        }).catch(err => {
            console.log(err);
            localStorage.removeItem("token");
            navigate("/captain-login")
        })
    }, [token])

   

    if (isLoading) {
        return (
            <>Loading</>
        )
    }


    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectionWrapper