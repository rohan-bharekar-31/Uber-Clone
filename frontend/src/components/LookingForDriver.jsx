import React from 'react'
import { FaDollarSign } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { IoIosArrowDown } from 'react-icons/io'

const LookingForDriver = ({setVehicle}) => {
    return (
        <>
            <IoIosArrowDown className={`text-2xl text-gray-400  w-full mb-5 `} onClick={() => setVehicle(false)} />

            <h1 className='text-2xl font-semibold '>Looking for a Driver</h1>
            <div className='flex justify-between flex-col items-center '>


                <img className='h-25' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" />

                <div className='w-full mt-5'>
                    <div className='flex items-center gap-4 p-2  border-b-2'>
                        <FaLocationDot />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Gagan Galxy Pune</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 p-2 border-b-2'>
                        <FaLocationDot />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Gagan Galxy Pune</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-4 p-2 border-b-2'>
                        <FaDollarSign />
                        <div>
                            <h3 className='text-lg font-medium'>500</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Amount</p>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default LookingForDriver