import React, { useReducer, useRef, useState } from 'react'
import { useGSAP } from "@gsap/react"
import gsap from 'gsap';
import { IoIosArrowDown } from "react-icons/io";
import LocationSearchPanel from '../components/LocationSearcHpANEL.JSX';
import ConfirmRide from '../components/ConfirmRide';
import VehiclePanel from '../components/VehiclePanel';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

const Home = () => {

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("")
  const [vehiclePanelOpen, setvehiclePanelOpen] = useState(false)
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [WaitingForDriverPanel, setWaitingForDriverPanel] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault();

  }


  const panelRef = useRef(null);
  const arrowDownRef = useRef(null);
  const vehiclePanelOpenRef = useRef(null);
  const confirmRidePanelOpenRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const WaitingForDriverPanelRef = useRef(null);

  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 15
      })
      gsap.to(arrowDownRef.current, {
        opacity: 1
      })
    }
    else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: 0
      })
      gsap.to(arrowDownRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])

  useGSAP(function () {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelOpenRef.current, {
        transform: "translateY(0)"
      })
    }
    else {
      gsap.to(vehiclePanelOpenRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [vehiclePanelOpen])

  useGSAP(function () {
    if (confirmRidePanelOpen) {
      gsap.to(confirmRidePanelOpenRef.current, {
        transform: "translateY(0)"
      })
    }
    else {
      gsap.to(confirmRidePanelOpenRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [confirmRidePanelOpen])

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)"
      })
    }
    else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [vehicleFound])

  // useGSAP(function () {
  //   if (WaitingForDriverPanel) {
  //     gsap.to(WaitingForDriverPanelRef.current, {
  //       transform: "translateY(0)"
  //     })
  //   }
  //   else {
  //     gsap.to(WaitingForDriverPanelRef.current, {
  //       transform: "translateY(100%)"
  //     })
  //   }
  // }, [WaitingForDriverPanel])

  return (
    <div className='h-screen  relative overflow-hidden'>
      <h2 className='text-2xl font-bold left-5 top-5 absolute'>Ride Buddy</h2>

      <div className='h-screen w-screen'>
        {/* image for temporary use */}
        <img src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif" className='h-full w-full object-cover' />
      </div>

      <div className='flex flex-col justify-end h-screen top-0 absolute   w-full  '>


        <div className='h-[30%] p-5 bg-white'>
          <IoIosArrowDown ref={arrowDownRef} className={`absolute opacity-0 top-6 right-6 text-4xl `} onClick={() => setPanelOpen(false)} />
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => { submitHandler(e) }} >
            <input onClick={() => setPanelOpen(true)} className='bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-5' type="text" placeholder='Add a pick up location' value={pickup} onChange={(e) => { setPickup(e.target.value) }} />
            <input type="text" className='bg-[#eee] px-8 py-2 w-full mt-3 text-base rounded-lg ' onClick={() => setPanelOpen(true)} placeholder='Enter your destination' value={destination} onChange={(e) => { setDestination(e.target.value) }} />
          </form>
        </div>

        <div ref={panelRef} className='h-[0%] bg-white '>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanelOpen={setvehiclePanelOpen} />
        </div>

        <div ref={vehiclePanelOpenRef} className='fixed w-full z-10 translate-y-full  bg-white px-2 py-2 '>
          <VehiclePanel setvehiclePanelOpen={setvehiclePanelOpen} setConfirmRidePanelOpen={setConfirmRidePanelOpen}/>
        </div>

        <div ref={confirmRidePanelOpenRef} className='fixed w-full z-10 translate-y-full  bg-white px-2 py-2'>
          <ConfirmRide setConfirmRidePanelOpen={setConfirmRidePanelOpen} setVehicleFound={setVehicleFound} />
        </div>

        <div ref={vehicleFoundRef} className='fixed w-full z-10 translate-y-full  bg-white px-2 py-2'>
          <LookingForDriver setVehicle={setVehicleFound}  />
        </div>

        <div ref={WaitingForDriverPanelRef} className='fixed w-full z-10 translate-y-full   bg-white px-2 py-2'>
          <WaitingForDriver setWaitingForDriverPanel={setWaitingForDriverPanel}  />
        </div>

      </div>
    </div>
  )
}

export default Home