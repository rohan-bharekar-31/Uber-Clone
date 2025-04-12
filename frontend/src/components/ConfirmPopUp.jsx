import React, { useContext } from 'react'
import { useState } from 'react'
import { FaRegCircleUser, FaLocationDot, FaDollarSign } from 'react-icons/fa6'
import { IoIosArrowDown } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { CaptainDataContext } from '../context/CaptainContext'

const ConfirmPopUp = ({ setConfirmRidePopUp, setNewRidePopUp, ride }) => {
    const [otp, setOtp] = useState("");
    const [finish, setFinish] = useState("")
    
    const captain = useContext(CaptainDataContext)

    const navigate=useNavigate();

    const submitHandler =async (e) => {
        e.preventDefault();
        try {
            const response =await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                params:{ rideId: ride._id,
                captainId: captain._id,
                otp:otp
            },
            })

            if(response.status==200){
                setConfirmRidePopUp(false);
                navigate("/captain-riding",{
                    state:{
                        ride:ride
                    }
                })
            }

        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div  >
            <IoIosArrowDown className={`text-2xl text-gray-400  w-full mb-5 `} onClick={() => setConfirmRidePopUp(false)} />

            <h1 className='text-2xl font-semibold '>Confirm Ride to start</h1>
            <div className='flex justify-between flex-col items-center '>

                <div className='flex w-full justify-between border-b-2 bg-yellow-400 mt-2 rounded-lg   p-3 items-center'>
                    <div className='flex items-center gap-3'>
                        <h1 className='text-6xl font-thin'>
                            <FaRegCircleUser />
                        </h1>
                        <h1 className='text-lg font-semibold'>
                            {ride?.user?.fullname.firstname}
                        </h1>
                    </div>
                    <div >
                        <h3 className='text-2xl font-semibold'>3.2 Km</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Distance</p>
                    </div>
                </div>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-4 p-2  border-b-2'>
                        <FaLocationDot />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 p-2 border-b-2'>
                        <FaLocationDot />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-4 p-2 border-b-2'>
                        <FaDollarSign />
                        <div>
                            <h3 className='text-lg font-medium'>{ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Amount</p>
                        </div>
                    </div>
                </div>
                <form className=' w-full flex flex-col gap-2 mt-3' onSubmit={submitHandler}>
                    <input
                        value={otp}
                        onChange={(e) => {
                            setOtp(e.target.value)
                        }}
                        type="text"
                        className='bg-[#E4EFE7] font-medium font-mono rounded  px-4 py-2 border w-full text-lg placeholder: text-base'
                        required
                        placeholder='Enter Otp'
                    />

                    <button type='submit' className='w-full bg-green-600 text-white text-center font-semibold p-2 rounded-lg mb-3 mt-3'>Start</button>

                    <button onClick={
                        () => {
                            setConfirmRidePopUp(false),
                                setNewRidePopUp(false)
                        }
                    } className='w-full bg-red-600 text-white font-semibold p-2 rounded-lg mb-3'>Ignore</button>
                </form>
            </div>
        </div>
    )
}

export default ConfirmPopUp