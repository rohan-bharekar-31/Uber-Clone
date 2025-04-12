import React from 'react'
import { FaUser } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { FaLocationDot } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";

const ConfirmRide = ({ setConfirmRidePanelOpen,setVehicleFound,pickup,destination,createRide,fare ,vehicleType}) => {
  return (
    <>
      <IoIosArrowDown className={`text-2xl text-gray-400  w-full mb-5 `} onClick={() =>  setConfirmRidePanelOpen(false)} />

      <h1 className='text-2xl font-semibold '>Confirm Your Ride</h1>
      <div className='flex justify-between flex-col items-center '>


        <img className='h-25' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" />

        <div className='w-full mt-5'>
          <div className='flex items-center gap-4 p-2  border-b-2'>
            <FaLocationDot />
            <div>
            <h3 className='text-lg font-medium'>Pickup</h3>
            <p className='text-sm -mt-1 text-gray-600 '>pickup</p>
            </div>
          </div>
          <div className='flex items-center gap-4 p-2 border-b-2'>
            <FaLocationDot />
            <div>
            <h3 className='text-lg font-medium'>Destination</h3>
            <p className='text-sm -mt-1 text-gray-600 '>destination</p>
            </div>
          </div>

          <div className='flex items-center gap-4 p-2 border-b-2'>
            <FaDollarSign />
            <div>
            <h3 className='text-lg font-medium'>fare[vehicleType]</h3>
            <p className='text-sm -mt-1 text-gray-600'>Amount</p>
            </div>
          </div>
        </div>

        <button onClick={
          ()=>{
            createRide();
            setConfirmRidePanelOpen(false),
            setVehicleFound(true)
          }
        } className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg mt-5 mb-5'>Confirm</button>
      </div>

    </>
  )
}

export default ConfirmRide