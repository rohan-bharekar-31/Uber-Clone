import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';
import { toast } from 'react-toastify';

const CaptainLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const { setCaptain } = useContext(CaptainDataContext)

    const submitHandler = async (e) => {
        e.preventDefault();
        const newCaptain = {
            email,
            password,
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, newCaptain);
            const { data } = res; // Extract data from response

            if (res.status === 200) {
                localStorage.setItem("token", data.token);
                setCaptain(data.captain);
                toast.success("Registered Successfully!"); // Success message
                navigate("/captain-home"); // Redirect to Captain home
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    const errors = error.response.data.errors;
                    // Handle validation errors 
                    if (errors) {
                        errors.forEach((item) => {
                            toast.error(item.msg); // Show each error message from the backend
                        });
                    }
                    // Handle user already exists error
                    else {
                        toast.error(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    toast.error(error.response.data)
                }
                else if (error.response.status === 500) {
                    toast.error("Server error. Please try again later."); // Server error
                } else {
                    toast.error("An unexpected error occurred. Please try again."); // For any other error codes
                }
            } else {
                console.log(error)
            }
        } finally {
            setEmail("");
            setPassword("");

        }
    }

    return (
        <div className='p-7 flex h-screen flex-col justify-between '>
            <div>
                <h2 className='text-2xl font-bold mb-10 w-f'>Ride Buddy</h2>
                <form onSubmit={submitHandler}>
                    <h3 className='text-xl mb-2'>What's your email</h3>
                    <input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        type="email"
                        className='bg-[#E4EFE7] font-medium rounded mb-7 px-4 py-2 border w-full text-lg placeholder: text-base'
                        required
                        placeholder='email@example.com'
                    />

                    <h3 className='text-xl mb-2'>Enter Password</h3>
                    <input
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        className='bg-[#E4EFE7] font-medium rounded mb-7 px-4 py-2 border w-full text-lg placeholder: text-base'
                        type="password"
                        placeholder='password'
                    />
                    <button type="submit" className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg mb-3 placeholder:text-base'>Login</button>
                </form>
                <p className='text-center'>Join a fleet? <Link to={"/captain-signup"} className='text-blue-600'>Register as a Captain</Link></p>
            </div>

            <div>
                <Link to={"/login"}>
                    <button className='bg-[#EF9651] text-white font-semibold mb-6 rounded px-4 py-2 w-full  text-lg placeholder:text-base'>Sign In as User</button></Link>
            </div>
        </div>
    )
}

export default CaptainLogin