import React, { useContext, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../store/AuthContext'
import { toast } from 'react-toastify';

const SentMessage = () => {
  const { setExplosion } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const [msg , setMsg ] =useState()
  const { id } = useParams();
  const messageRef = useRef();

  const handleSent = async ()=>{
    console.log(msg);
    console.log(id);
    const messageSplit = msg.split(" ");
    if(!msg){
      toast.error("Please Enter Message");
      return;
    }else {
      for(let i = 0 ; i < messageSplit.length ; i++){
        if(messageSplit[i].length>10)
        {
          toast.error("Message is too long");
          return;
        }
      }
    }
    if(messageSplit.length>50){
      toast.error("Message is too long");
      return;
    }
    const res = await fetch(`${import.meta.env.VITE_HOST}/api/sendMessage/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: 'include',
      body: JSON.stringify({
        msg,
      }),

    })

    const data = await res.json();
    if (data.success) {
      setExplosion(true);
      toast.success("Message Sent");
      setMsg("");
      messageRef.current.value = "";
      setModalOpen(true);  
    } else {
      toast.error("Something Went Wrong");
    }
    
  }

  const handleTry = () => {
    setModalOpen(false);
    navigate(`/signup`);
  };
  
  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-slate-200 rounded-lg p-8 shadow-lg max-w-lg w-full relative">
            <div
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 cursor-pointer"
            >
              <i className="text-2xl text-pink-500 fa-solid fa-close"></i>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center">Want to try this? 😎</h2>
            <p className="mb-4 text-center">Register and share the link with friends.</p>
            <div className="flex justify-center">
            <button
              onClick={handleSent}
              className="cursor-pointer bg-gradient-to-b from-pink-500 to-yellow-400 text-white px-4 py-2 rounded-md hover:from-red-600 hover:to-slate-600 transition"
            >
              Try
            </button>
            </div>
            
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <div className="bg-white w-[500px] h-[500px] flex flex-col rounded-lg mt-24 shadow-lg">
          <div className="sticky top-0 bg-gradient-to-b from-pink-500 to-yellow-600 shadow-lg flex justify-center items-center h-[100px] rounded-t-lg z-10">
            <h1 className="lg:text-3xl sm:text-xl text-white">Sent message to Name</h1>
          </div>

          <textarea
            className="h-[400px] p-4 text-center border-t border-b border-gray-200"
            onChange={(e) => setMsg(e.target.value)}
            ref={messageRef}
            placeholder="Enter your message"
            value={msg}
          />
          <div
            onClick={handleSent}
            className="cursor-pointer bg-gradient-to-b from-blue-500 to-black shadow-lg flex justify-center items-center h-[100px] rounded-b-lg hover:from-blue-600 hover:to-gray-800 transition"
          >
            <h1 className="lg:text-3xl sm:text-xl text-white">Send</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default SentMessage
