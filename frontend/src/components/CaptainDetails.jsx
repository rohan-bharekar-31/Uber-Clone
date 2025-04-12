import React, { useContext } from 'react'
import { FaRegCircleUser, FaRegNoteSticky } from 'react-icons/fa6'
import { MdAccessTime } from 'react-icons/md'
import { GiPathDistance } from 'react-icons/gi'
import {CaptainDataContext} from "../context/CaptainContext";


const CaptainDetails = () => {

    const {captain} = useContext(CaptainDataContext);
    

    return (
        <div>
            <div className='flex w-full justify-between border-b-2 rounded-lg   p-3 items-center'>
                <div className='flex items-center gap-3'>
                    <h1 className='text-6xl font-thin'>
                        <FaRegCircleUser />
                    </h1>
                    <h1 className='text-lg font-semibold'>
                    {captain?.fullname?.firstname+" "+captain?.fullname?.lastname}
                    </h1>
                </div>
                <div >
                    <h3 className='text-2xl font-semibold'>100</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Earned</p>
                </div>
            </div>

            <div className='flex items-center w-full rounded-lg  gap-4 p-3 border-b-2 justify-around bg-gray-100'>

                <div className='flex flex-col items-center' ><MdAccessTime className='text-4xl ' />
                    <h3 className='text-lg font-medium'>500</h3>
                    <h5 className='text-xs text-gray-600'>Total Time</h5>
                </div>
                <div className='flex flex-col items-center'><GiPathDistance className='text-4xl' />
                    <h3 className='text-lg font-medium'>500</h3>
                    <h5 className='text-xs text-gray-600'>Total Distance</h5>

                </div>
                <div className='flex flex-col items-center'><FaRegNoteSticky className='text-4xl' />
                    <h3 className='text-lg font-medium'>500</h3>
                    <h5 className='text-xs text-gray-600'>Status</h5>

                </div>

            </div>
        </div>
    )
}

export default CaptainDetails