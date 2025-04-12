import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SlLogout } from "react-icons/sl";
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useState } from 'react'
import ConfirmPopUp from '../components/ConfirmPopUp';
import { CaptainDataContext } from '../context/CaptainContext';
import { SocketDataContext } from '../context/SocketContext';
import axios from "axios"
import LiveTracking from '../components/LiveTracking';

const CaptainHome = () => {

  const [newRidePopUp, setNewRidePopUp] = useState(false)
  const [ride, setRide] = useState("")
  const [confirmRidePopUp, setConfirmRidePopUp] = useState(false);


  const newRidePopUpRef = useRef(null);
  const confirmRidePopUpRef = useRef(null);

  const { Socket } = useContext(SocketDataContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
    if (!captain) return;

    // Join room or register user on socket
    Socket.emit("join", { userId: captain._id, userType: "Captain" });

    // Function to emit current location
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          Socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        });
      }
    };

    // Call once immediately
    updateLocation();

    // Set interval to call every 10 seconds (10000 ms)
    const locationInterval = setInterval(updateLocation, 10000);

    // Clear interval when component unmounts
    return () => {
      clearInterval(locationInterval);
    };
  }, [captain]);

  Socket.on("new-ride", (data) => {
    setRide(data);
    setNewRidePopUp(true)
    console.log(data);
  })

  async function confirmRide() {

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

      rideId: ride._id,
      captainId: captain._id,


    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    setNewRidePopUp(false)
    setConfirmRidePopUp(true)

  }

  useGSAP(function () {
    if (newRidePopUp) {
      gsap.to(newRidePopUpRef.current, {
        transform: "translateY(0)"
      })
    }
    else {
      gsap.to(newRidePopUpRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [newRidePopUp])

  useGSAP(function () {
    if (confirmRidePopUp) {
      gsap.to(confirmRidePopUpRef.current, {
        transform: "translateY(0)"
      })
    }
    else {
      gsap.to(confirmRidePopUpRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [confirmRidePopUp])

  return (
    <>
      <div className='fixed top-5 right-5 z-10'>
        <h1 className='text-3xl   bg-black text-white text-center p-3 rounded-full'>
          <Link to={"/captain-login"}>
            <SlLogout className='pr-1' />
          </Link>
        </h1>

      </div>
      <div className='h-full w-full'>
        <div className='h-3/5'>
          <LiveTracking className="h-full"/>
          {/* <img src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif" className='h-full w-full object-cover' /> */}
        </div>

        <div className='h-2/5 flex flex-col gap-2 justify-center p-4'>
          <CaptainDetails />

        </div>
        <div ref={newRidePopUpRef} className='fixed  w-full translate-y-full z-10 bottom-0 p-4 bg-white'>
          <RidePopUp ride={ride} setNewRidePopUp={setNewRidePopUp} setConfirmRidePopUp={setConfirmRidePopUp}
            confirmRide={confirmRide}
          />
        </div>

        <div ref={confirmRidePopUpRef} className='fixed h-screen w-full translate-y-full z-10 bottom-0 p-4 bg-white'>
          <ConfirmPopUp
            setConfirmRidePopUp={setConfirmRidePopUp}
            setNewRidePopUp={setNewRidePopUp}
            ride={ride}
          />
        </div>


      </div>
    </>
  )
}

export default CaptainHome