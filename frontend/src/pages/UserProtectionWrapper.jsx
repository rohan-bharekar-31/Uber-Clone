import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserProtectionWrapper = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { setUser } = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token]);

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        if (response.status == 200) {
            setUser(response.data.captain);
            setIsLoading(false);
        }

    }).catch(err => {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/login")
    })

    if (isLoading) {
        return (
            <>Loading</>
        )
    }
    return (
        <>
            {children}
        </>
    );
};

export default UserProtectionWrapper;
