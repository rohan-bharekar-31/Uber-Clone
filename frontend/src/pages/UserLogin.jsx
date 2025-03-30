import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';
import axios from "axios"
import { toast } from 'react-toastify';

const UserLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const { setUser } = useContext(UserDataContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const newUser = {
            email,
            password,
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, newUser);
            const { data } = res; // Extract data from response

            if (res.status === 200) {
                localStorage.setItem("token", data.token);
                setUser(data.user); // Update user state
                toast.success("Logged In Successfully!"); // Success message
                navigate("/home"); // Redirect to home
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    // Handle validation errors (e.g., invalid input)
                    const errors = error.response.data.errors;
                    if (errors) {
                        errors.forEach((item) => {
                            toast.error(item.msg); // Show each error message from the backend
                        });
                    } else {
                        toast.error("There was an error processing your request"); // Generic message
                    }
                } else if (error.response.status === 401) {
                    toast.error(error.response.data);
                } else {
                    toast.error("An unexpected error occurred. Please try again."); // For any other error codes
                }
            } else {
                // If no response, likely a network issue
                toast.error("Network error. Please check your internet connection.");
            }
        } finally {
            // Reset the form fields
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
                            console.log(e)
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
                <p className='text-center'>New here? <Link to={"/signup"} className='text-blue-600'>Create new Account</Link></p>
            </div>

            <div>
                <Link to={"/captain-login"}>
                    <button className='bg-[#255F38] text-white font-semibold mb-6 rounded px-4 py-2 w-full  text-lg placeholder:text-base'>Sign In as Captain</button></Link>
            </div>
        </div>
    )
}

export default UserLogin