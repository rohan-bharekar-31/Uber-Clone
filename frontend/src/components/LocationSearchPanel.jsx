import React from 'react'
import { GiPositionMarker } from "react-icons/gi";
import { FaUser } from "react-icons/fa";

const LocationSearchPanel = ({setVehiclePanelOpen,setPanelOpen}) => {

  const locations = [
    "loc10", "loc10",
    "loc10",
    "loc10",
    "loc10sss",
    "loc10"
  ]



  return (
    <>

      {locations.map((item, index) => < div onClick={()=>{setPanelOpen(false),setVehiclePanelOpen(true)}} key={index} className='flex justify-start border-2 rounded-xl  border-gray-100 mb-4 active:border-black  p-2  border shadow-lg items-center gap-4 overflow-scroll'>
        <h1><GiPositionMarker /></h1>
        <h4 className='font-medium'>{item}</h4>
      </div>)}
      
    </>
  )
}

export default LocationSearchPanel