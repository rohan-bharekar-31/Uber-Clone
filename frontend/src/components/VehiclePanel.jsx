import React from 'react'
import { FaUser } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

const VehiclePanel = ({ setvehiclePanelOpen,setConfirmRidePanelOpen }) => {
    return (
        <>
            <IoIosArrowDown className={`text-2xl text-gray-400  w-full mb-1`} onClick={() => setvehiclePanelOpen(false)} />

            <h1 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h1>
            <div onClick={()=>{setConfirmRidePanelOpen(true),setvehiclePanelOpen(false)}} className='flex items-center justify-between mb-2  border-2 active:border-black rounded-lg p-3  bg-white w-full gap-x-1'>
                <img className='h-12 w-1/3' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" />
                <div className='w-1/2'>
                    <h4 className='font-medium text-base flex items-center gap-x-2'><p>Uber Go </p><span><FaUser /></span>4</h4>
                    <h5 className='font-medium text-sm'>2 minutes away</h5>
                    <p className='text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-xl w-1/2 font-semibold text-center'>$ 24</h2>
            </div>


            <div onClick={()=>{setConfirmRidePanelOpen(true),setvehiclePanelOpen(false)}} className='flex items-center bg-gray-100 active:border-black justify-between mb-2  border-2 rounded-lg p-3  bg-white w-full gap-x-1'>
                <img className='h-12 w-1/3' src="https://th.bing.com/th/id/R.bd69e7defb78173bb52171f8b2899ac7?rik=IfU%2fOzGpozeZEA&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f5%2fAuto-Rickshaw-PNG-Photo.png&ehk=hSlkyCnQ44oMOFQbhJIfNpUCai%2bjhfiBAM%2fJgii5BMo%3d&risl=&pid=ImgRaw&r=0" />
                <div className='w-1/2'>
                    <h4 className='font-medium text-base flex items-center gap-x-2'><p>Uber Go </p><span><FaUser /></span>4</h4>
                    <h5 className='font-medium text-sm'>2 minutes away</h5>
                    <p className='text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-xl w-1/2 font-semibold text-center'>$ 24</h2>
            </div>


            <div onClick={()=>{setConfirmRidePanelOpen(true),setvehiclePanelOpen(false)}}  className='flex items-center justify-between mb-2  border-2 active:border-black rounded-lg p-3  bg-white w-full gap-x-1'>
                <img className='h-12 w-1/3' src="https://www.bing.com/th/id/OIP.hehnexk1WV61LxLPJ0fJpwHaGF?w=134&h=106&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" />
                <div className='w-1/2'>
                    <h4 className='font-medium text-base flex items-center gap-x-2'><p>Uber Go </p><span><FaUser /></span>4</h4>
                    <h5 className='font-medium text-sm'>2 minutes away</h5>
                    <p className='text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-xl w-1/2 font-semibold text-center'>$ 24</h2>
            </div>
        </>
    )
}

export default VehiclePanel