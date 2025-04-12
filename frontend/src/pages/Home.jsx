import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import { useGSAP } from "@gsap/react"
import gsap from 'gsap';
import { IoIosArrowDown } from "react-icons/io";
import LocationSearchPanel from '../components/LocationSearcHpANEL.JSX';
import ConfirmRide from '../components/ConfirmRide';
import axios from "axios"
import VehiclePanel from '../components/VehiclePanel';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketDataContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from "react-router-dom"
import LiveTracking from "../components/LiveTracking"

const Home = () => {

  const [pickup, setPickup] = useState("");
  const [activeField, setActiveField] = useState(null)
  const [destination, setDestination] = useState("")
  const [vehiclePanelOpen, setvehiclePanelOpen] = useState(false)
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [WaitingForDriverPanel, setWaitingForDriverPanel] = useState(false)
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState("");
  const [ride, setRide] = useState(null)

  const navigate = useNavigate();

  const { Socket } = useContext(SocketDataContext);
  const { user } = useContext(UserDataContext);


  useEffect(() => {
    if (!user) {
      return;
    }

    Socket.emit("join", { userId: user._id, userType: "user" })
  }, [user])


  const submitHandler = async (e) => {
    e.preventDefault();

  }

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not available, skipping suggestions request.');
      return;
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setDestinationSuggestions(response.data)
    } catch (error) {
      // console.log(error);
      setDestinationSuggestions([]);
    }
  }


  const handlePickUpChange = async (e) => {
    setPickup(e.target.value)
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not available, skipping suggestions request.');
      return;
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      // console.log(response.data)
      setPickupSuggestions(response.data)
    } catch (error) {
      // console.log(error);
      setPickupSuggestions([]);
    }
  }

  const findTrip = async (e) => {
    e.preventDefault();
    setPanelOpen(false);
    setvehiclePanelOpen(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      setFare(res.data.fare);
      setDestinationSuggestions([]);
      setPickupSuggestions([])
    } catch (error) {
      console.log(error)
    }
  }

  const createRide = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      console.log(response.data.ride);
    } catch (error) {
      console.log(error);
    }
  }

  Socket.on("ride-confirmed", (ride) => {
    setWaitingForDriverPanel(true);
    setVehicleFound(false);
    setRide(ride);
  })

  Socket.on("ride-started", (ride) => {
    setWaitingForDriverPanel(false);
    navigate("/riding", {
      state: {
        rideData: ride
      }
    })
  })

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

  useGSAP(function () {
    if (WaitingForDriverPanel) {
      gsap.to(WaitingForDriverPanelRef.current, {
        transform: "translateY(0)"
      })
    }
    else {
      gsap.to(WaitingForDriverPanelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [WaitingForDriverPanel])

  return (
    <div className='h-screen  relative overflow-hidden'>
      <h2 className='text-2xl font-bold left-5 top-5 absolute '>Ride Buddy</h2>

      <div className='h-screen w-screen'>
        {/* image for temporary use */}
        {/* <img src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif" className='h-full w-full object-cover' /> */}
        <LiveTracking/>
      </div>

      <div className='flex flex-col justify-end h-screen top-0 absolute   w-full  '>


        <div className={`h-[${panelOpen ? "35" : "30"}%] p-5 bg-white`}>
          <IoIosArrowDown ref={arrowDownRef} className={`absolute opacity-0 top-6 right-6 text-4xl `} onClick={() => setPanelOpen(false)} />
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => { submitHandler(e) }} >
            <input onClick={() => { setPanelOpen(true), setActiveField("pickup") }} className='bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-5' type="text" placeholder='Add a pick up location' value={pickup} onChange={handlePickUpChange} />


            <input type="text" className='bg-[#eee] px-8 py-2 w-full mt-3 text-base rounded-lg ' onClick={() => { setPanelOpen(true), setActiveField("destination") }} placeholder='Enter your destination' value={destination} onChange={handleDestinationChange} />

            {panelOpen ? <button
              onClick={findTrip}
              type='submit'
              className="bg-black text-white font-medium px-4 py-2 rounded-lg shadow-md hover:bg-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-700 w-full  mt-3"
            >Look for Drivers</button> : <></>}
          </form>
        </div>

        <div ref={panelRef} className='h-0 bg-white overflow-hidden'>
          <LocationSearchPanel Suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions} setPanelOpen={setPanelOpen} setVehiclePanelOpen={setvehiclePanelOpen} setPickup={setPickup} setDestination={setDestination} activeField={activeField} />
        </div>

        <div ref={vehiclePanelOpenRef} className='fixed w-full z-10 bottom-0 translate-y-full  bg-white px-2 py-10 '>
          <VehiclePanel fare={fare} setvehiclePanelOpen={setvehiclePanelOpen} setConfirmRidePanelOpen={setConfirmRidePanelOpen} setVehicleType={setVehicleType} />
        </div>

        <div ref={confirmRidePanelOpenRef} className='fixed w-full bottom-0  z-10 translate-y-full  bg-white px-2 py-6 '>
          <ConfirmRide
            vehicleType={vehicleType}
            pickup={pickup} fare={fare}
            destination={destination}
            createRide={createRide}
            setConfirmRidePanelOpen={setConfirmRidePanelOpen}
            setVehicleFound={setVehicleFound}
          />
        </div>

        <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full  bg-white px-2 py-6 '>
          <LookingForDriver
            setVehicleFound={setVehicleFound}
            pickup={pickup}
            destination={destination}
            createRide={createRide}
            fare={fare}
            vehicleType={vehicleType}
          />
        </div>

        <div ref={WaitingForDriverPanelRef} className='fixed w-full z-10  translate-y-full   bg-white px-2 py-6 '>
          <WaitingForDriver
            ride={ride}
            setWaitingForDriverPanel={setWaitingForDriverPanel}
          />
        </div>

      </div>
    </div>
  )
}

export default Home