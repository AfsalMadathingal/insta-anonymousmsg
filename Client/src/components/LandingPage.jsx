import React, { useContext, useEffect, useState } from 'react'
import ConfettiExplosion from 'react-confetti-explosion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';

const LandingPage = () => {

    const { setExplosion } = useContext(AuthContext);
    const navigate = useNavigate()
    const [total, setTotal] = useState(0);

    const handleClick = () => {
      setExplosion(true);
      navigate('/signup')
      setTimeout(() => {
        setExplosion(false);
      }, 2000);
      
    };

    useEffect(() => {
      
      const host = import.meta.env.VITE_HOST;
      fetch(`${host}/api/count`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        credentials: 'include',

      }).then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);
          setTotal(data.totalUsers)
        }
      })

    }, []);

  return (
    <>
    
    <div className='flex flex-col justify-center items-center h-screen'>
    <div className='flex flex-col justify-center items-center h-[300px] p-12 bg-white rounded-lg '>
      <h1 className='text-3xl mb-5'>Welcome </h1>
      <p className='text-center lg:text-lg text-sm'>📨 Send/Receive  an anonymous message <br /> to your friends anonymously <br />  and your favorite influencer 💕 </p>
      <button
      onClick={handleClick} 
      className='bg-black hover:bg-red-700 mt-8 text-white  py-2 px-4 rounded-full'>Get Started</button>
      
    </div>
    <button
      className='bg-white mt-8 text-black  py-2 px-24 rounded-full'>Total Users <span className='text-blue-500 text-xl'>{total} </span>  </button>
    </div>
   
    </>
  )
}

export default LandingPage
