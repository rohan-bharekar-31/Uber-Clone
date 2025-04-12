import React, { useRef, useState } from 'react'
import { Link, useLocation } from "react-router-dom"
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from "react-icons/io";
import FinishRide from '../components/FinishRide';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking';


const CaptainRiding = () => {

  const [openFinshRidePanel, setopenFinshRidePanel] = useState(false);
  const openFinshRidePanelRef = useRef(null);
  const location=useLocation();

  const rideData=location.state?.ride;

  useGSAP(function () {
    if (openFinshRidePanel) {
      gsap.to(openFinshRidePanelRef.current, {
        transform: "translateY(0)"
      })
    }
    else {
      gsap.to(openFinshRidePanelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [openFinshRidePanel])

  return (
    <>
      <div className='h-screen w-full flex flex-col justify-center'>
        <div className=' h-4/5'>
          <LiveTracking  className="h-full"/>
        </div>


        <div onClick={()=>setopenFinshRidePanel(true)} className='bg-yellow-400 flex flex-col h-1/5 justify-center w-full'>
          <IoIosArrowUp className={` text-xl text-black  w-full mb-5 `}  />
          <div className='flex justify-around'>
            <div  >
              <h3 className='text-2xl font-semibold'>3.2 Km</h3>
              <p className='text-sm mt-1 text-gray-600'>Distance</p>
            </div>

            <button onClick={() => { }
            } className=' bg-green-500 text-white font-semibold p-3 rounded-lg '>Complete Ride</button>
          </div>
        </div>

        <div>
          <div ref={openFinshRidePanelRef} className='fixed w-full z-10  bottom-0 translate-y-full bg-white px-2 py-2'>
            <FinishRide rideData={rideData} setopenFinshRidePanel={setopenFinshRidePanel}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default CaptainRiding