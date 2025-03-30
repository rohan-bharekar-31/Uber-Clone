import React from 'react'
import { IoHomeSharp } from "react-icons/io5";
import { FaLocationDot, FaDollarSign } from 'react-icons/fa6'
import { Link } from 'react-router-dom';

const Riding = () => {
    return (
        <>
            <div className='fixed top-5 right-5'>
                <h1 className='text-3xl bg-black text-white p-3 rounded-full'>
                    <Link to={"/home"}>
                        <IoHomeSharp />
                    </Link>
                </h1>

            </div>
            <div className='h-full w-full'>
                <div className='h-1/2'>
                    <img src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif" className='h-full w-full object-cover' />
                </div>

                <div className='h-1/2 flex flex-col justify-center p-4'>
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
                    <button onClick={
                        () => {
                        }
                    } className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg mt-5 mb-5'>Pay</button>
                </div>



            </div>
        </>
    )
}

export default Riding