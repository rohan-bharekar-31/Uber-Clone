import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { FaLocationDot, FaDollarSign, FaRegCircleUser } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const FinishRide = ({ setOpenFinshRidePanel, rideData }) => {
    const navigate = useNavigate();

    const endRide = async () => {
        try {
            const response =await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
                rideId: rideData._id
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            if(response.status==200){
                navigate("/captain-home")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='mb-3'><IoIosArrowDown className={`text-2xl text-gray-400  w-full mb-5 `} onClick={() => setOpenFinshRidePanel(false)} />

            <h1 className='text-2xl font-semibold '>Finish the ride</h1>
            <div className='flex justify-between flex-col items-center '>

                <div className='flex w-full justify-between border-yellow-400 border-2 mt-2 rounded-lg   p-3 items-center'>
                    <div className='flex items-center gap-3'>
                        <h1 className='text-6xl font-thin'>
                            <FaRegCircleUser />
                        </h1>
                        <h1 className='text-lg font-semibold'>
                            {rideData?.user.fullname.firstname}
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
                            <p className='text-sm -mt-1 text-gray-600'>{rideData?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 p-2 border-b-2'>
                        <FaLocationDot />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{rideData?.destination}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-4 p-2 border-b-2'>
                        <FaDollarSign />
                        <div>
                            <h3 className='text-lg font-medium'>{rideData?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Amount</p>
                        </div>
                    </div>
                </div>

                <button onClick={endRide} className='w-full bg-green-600 text-white text-xl font-semibold p-2 rounded-lg mb-3 mt-3'>Finsh Ride</button>

            </div>
        </div>
    )
}

export default FinishRide