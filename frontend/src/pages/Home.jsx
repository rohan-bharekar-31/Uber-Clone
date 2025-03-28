import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='bg-cover bg-no-repeat bg-[url(https://iphoneswallpapers.com/wp-content/uploads/2023/04/Signal-Light-Morning-Mist-iPhone-Wallpaper-HD.jpg)] h-screen pt-5   w-full flex justify-between flex-col bg-red-400 '>
        
        <h2 className='text-2xl font-bold ml-8'>Ride Buddy</h2>
        <div className='bg-white py-5 px-10 pb-7'>
            <h2 className='text-2xl font-bold '>Get Started with Ride Buddy</h2>
            
            <Link to={"/login"} className='flex justify-center items-center w-full bg-black text-white py-3 rounded-md mt-5 '>Continue
            </Link>
        </div>
    </div>
  )
}

export default Home