import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { FaLocationDot, FaDollarSign, FaRegCircleUser } from 'react-icons/fa6'

const RidePopUp = ({ setNewRidePopUp,setConfirmRidePopUp,ride,confirmRide }) => {
  return (
    <div ><IoIosArrowDown className={`text-2xl text-gray-400  w-full mb-5 `} onClick={() => setNewRidePopUp(false)} />

      <h1 className='text-2xl font-semibold '>New Ride for you !</h1>
      <div className='flex justify-between flex-col items-center '>

        <div className='flex w-full justify-between  border-yellow-400 border-2 mt-2 rounded-lg   p-3 items-center'>
          <div className='flex items-center gap-3'>
            <h1 className='text-6xl font-thin'>
              <FaRegCircleUser />
            </h1>
            <h1 className='text-lg font-semibold'>
              {ride?.user?.fullname?.firstname+" "+ride?.user?.fullname?.lastname}
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

        <button onClick={
          () => {
            confirmRide();
          }
        } className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg mb-3 mt-3'>Confirm</button>
        <button onClick={
          () => {
            setNewRidePopUp(false)
          }
        } className='w-full bg-gray-200 text-gray-700 font-semibold p-2 rounded-lg mb-3'>Ignore</button>

      </div>
    </div>

  )
}

export default RidePopUp