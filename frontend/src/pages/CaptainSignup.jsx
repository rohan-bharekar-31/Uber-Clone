import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const CaptainSignup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("");
    const [vehicleColor, setVehicleColor] = useState("");
    const [vehiclePlate, setVehiclePlate] = useState("");
    const [vehicleCapacity, setVehicleCapacity] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const { setCaptain } = useContext(CaptainDataContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const newCaptain = {
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email,
            password,
            vehicle: {
                color: vehicleColor,
                capacity: vehicleCapacity,
                vehicleType,
                plate: vehiclePlate,
            }
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain);
            const { data } = res; // Extract data from response

            if (res.status === 201) {
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
                } else if (error.response.status === 500) {
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
            setFirstName("");
            setLastName("");
            setVehicleColor("");
            setVehiclePlate("");
            setVehicleCapacity("");
            setVehicleType("");
        }
    }

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

                    <h3 className='text-xl mb-2'>Vehicle Details</h3>
                    <input
                        value={vehicleColor}
                        onChange={(e) => setVehicleColor(e.target.value)}
                        className='bg-[#E4EFE7] font-medium rounded mb-5 px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="text"
                        placeholder='Vehicle Color'
                        required
                    />

                    <input
                        value={vehiclePlate}
                        onChange={(e) => setVehiclePlate(e.target.value)}
                        className='bg-[#E4EFE7] font-medium rounded mb-5 px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="text"
                        placeholder='Vehicle Plate Number'
                        required
                    />

                    <input
                        value={vehicleCapacity}
                        onChange={(e) => setVehicleCapacity(e.target.value)}
                        className='bg-[#E4EFE7] font-medium rounded mb-5 px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="number"
                        placeholder='Vehicle Capacity'
                        required
                    />

                    <select
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        className='bg-[#E4EFE7] font-medium rounded mb-5 px-4 py-2 border w-full text-lg'
                        required
                    >
                        <option value="">Select Vehicle Type</option>
                        <option value="car">Car</option>
                        <option value="motorcycle">Motorcycle</option>
                        <option value="auto">Auto</option>
                    </select>
                    <button type="submit" className='bg-[#111] text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg mb-3 placeholder:text-base'>Login</button>
                </form>
                <p className='text-center'>Already registered? <Link to={"/captain-login"} className='text-blue-600'>Login here</Link></p>
            </div>

            <div className='text-[10px]'>
                <h1>Terms & Privacy Policy</h1>
                By logging in, you agree to our Terms of Service and Privacy Policy. We value your privacy and ensure that your data is securely stored and used only for account-related purposes.
            </div>
        </div>
    )
}

export default CaptainSignup