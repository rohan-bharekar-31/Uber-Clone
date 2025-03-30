import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { UserDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';



const UserSignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("");
    const { user, setUser } = useContext(UserDataContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email,
            password,
        };

        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
            const { data } = res; // Extract data from response

            if (res.status === 201) {
                localStorage.setItem("token", data.token);
                setUser(data.user); // Update user state
                toast.success("Registered Successfully!"); // Success message
                navigate("/home"); // Redirect to home
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    // Handle validation errors (e.g., user already exists, invalid input)
                    const errors = error.response.data.errors;
                    if (errors) {
                        errors.forEach((item) => {
                            toast.error(item.msg); // Show each error message from the backend
                        });
                    } else {
                        toast.error("There was an error processing your request"); // Generic message
                    }
                } else if (error.response.status === 500) {
                    toast.error("Server error. Please try again later."); // Server error
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
            setFirstName("");
            setLastName("");
        }
    };


    return (

        <div className='p-7 flex h-screen flex-col justify-between '>
            <div>
                <h2 className='text-2xl font-bold mb-10 w-f'>Ride Buddy</h2>
                <form onSubmit={submitHandler}>
                    <h3 className='text-xl mb-2'>What's your name</h3>
                    <div className='flex gap-3 mb-5'>
                        <input
                            onChange={(e) => {
                                setFirstName(e.target.value)
                            }}
                            value={firstName}
                            type="text"
                            className='bg-[#E4EFE7] font-medium rounded w-1/2  px-4 py-2 border w-full text-lg placeholder: text-base'
                            required
                            placeholder='First name'
                        />

                        <input
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                            value={lastName}
                            type="text"
                            className='bg-[#E4EFE7] font-medium rounded w-1/2 px-4 py-2 border w-full text-lg placeholder: text-base'
                            required
                            placeholder='Last name'
                        />
                    </div>

                    <h3 className='text-xl mb-2'>What's your email</h3>
                    <input
                        value={email}
                        onChange={(e) => {
                            console.log(e)
                            setEmail(e.target.value)
                        }}
                        type="email"
                        className='bg-[#E4EFE7] font-medium rounded mb-5 px-4 py-2 border w-full text-lg placeholder: text-base'
                        required
                        placeholder='email@example.com'
                    />

                    <h3 className='text-xl mb-2'>Enter Password</h3>
                    <input
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        className='bg-[#E4EFE7] font-medium rounded mb-5 px-4 py-2 border w-full text-lg placeholder: text-base'
                        type="password"
                        placeholder='password'
                    />
                    <button type="submit" className='bg-[#111] text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg mb-3 placeholder:text-base'>Create Account</button>
                </form>
                <p className='text-center'>Already have a account? <Link to={"/login"} className='text-blue-600'>Login here</Link></p>
            </div>

            <div className='text-[10px]'>
                <h1>Terms & Privacy Policy</h1>
                By logging in, you agree to our Terms of Service and Privacy Policy. We value your privacy and ensure that your data is securely stored and used only for account-related purposes.
            </div>
        </div>
    )
}

export default UserSignUp