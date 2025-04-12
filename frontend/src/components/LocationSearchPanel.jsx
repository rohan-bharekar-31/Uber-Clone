import React from 'react'
import { GiPositionMarker } from "react-icons/gi";
import { FaUser } from "react-icons/fa";

const LocationSearchPanel = ({setVehiclePanelOpen,setPanelOpen,Suggestions,setPickup,setDestination,activeField}) => {

  return (
    <>
      {Suggestions?.map((item, index) => < div onClick={()=>{activeField=="pickup"?setPickup(item):setDestination(item),console.log(activeField)}} key={index} className='flex justify-start border-2 rounded-xl  border-gray-100 mb-4 active:border-black  p-2  border shadow-lg items-center gap-4 overflow-scroll'>
        <h1><GiPositionMarker /></h1>
        <h4 className='font-medium'>{item}</h4>
      </div>)}
      
    </>
  )
}

export default LocationSearchPanel