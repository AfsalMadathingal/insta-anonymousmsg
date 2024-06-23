import React, { useContext, useState } from 'react'
import ConfettiExplosion from 'react-confetti-explosion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';

const LandingPage = () => {

    const { setExplosion } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleClick = () => {
      setExplosion(true);
      navigate('/signup')
      setTimeout(() => {
        setExplosion(false);
      }, 2000);
      
    };

  return (
    <>
    
    <div className='flex justify-center items-center h-screen'>
    <div className='flex flex-col justify-center items-center h-[300px] p-12 bg-white rounded-lg '>
      <h1 className='text-3xl mb-5'>Welcome </h1>
      <p className='text-center lg:text-lg text-sm'>📨 Sent anonymous message to your friends <br />  and your favorite influencer 💕 </p>
      <button
      onClick={handleClick} 
      className='bg-black hover:bg-red-700 mt-8 text-white  py-2 px-4 rounded'>Get Started</button>
    </div>
    </div>
    </>
  )
}

export default LandingPage
