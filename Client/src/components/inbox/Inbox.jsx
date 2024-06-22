import React, { useState } from "react";

const Inbox = () => {
  const [viewMsg, setViewMsg] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState(null);

  const messages = [
    "Hello, how are you?",
    "I am fine. Thank you.",
    "What about you?",
  ]; 
  const handleViewMessage = () => {
    setSelectedMsg(messages);
    setViewMsg(true);
  };

  const handleLogout = async () => {
   
    const data = await fetch(`${import.meta.env.VITE_HOST}/api/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

  };
  return (
<>
  <div className="flex flex-col items-center justify-center mt-12 ">
    <div className="bg-slate-300 w-[90%] max-w-[800px] shadow-xl h-[80vh] rounded-lg overflow-hidden relative">
      <div className="sticky top-0 bg-gradient-to-b from-blue-300 to-black shadow-lg flex justify-center items-center h-[100px] rounded-t-lg z-10">
        <h1 className="text-3xl text-white">Inbox</h1>
      </div>
      <div className="overflow-y-scroll h-[calc(80vh-100px)] p-4">
        <div className="min-h-[500px] flex flex-col items-center justify-start">
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col w-full max-w-[90%] bg-slate-100 m-2 p-4 rounded-lg shadow-lg">
              <div className="max-w-full overflow-hidden text-wrap">
                <p className="p-2">{msg}</p>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  onClick={handleViewMessage}
                  className="bg-gray-900 hover:bg-slate-500 text-white text-[12px] h-10 py-2 px-4 rounded-lg"
                >
                  <i className="fa-solid fa-eye"></i> View
                </button>
              </div>
            </div>
          ))}
          
          <button
          onClick={handleLogout}
           className="fixed bottom-0 shadow-lg mt-14 mb-14 bg-white hover:text-white hover:bg-blue-700 text-black text-[12px] h-10 py-2 px-4 w-[80px] rounded-lg m-4">
        Logout
      </button>
        </div>
        
      </div>
     
    </div>
  </div>
  {viewMsg && (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] overflow-x-scroll">
        <p className="text-sm font-thin mb-4">{selectedMsg}</p>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setViewMsg(null)}
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
          >
            Close
          </button>
          <button className="bg-slate-600 hover:bg-slate-300 text-white text-[12px] h-10 py-2 px-4 rounded-lg">
            <i className="fa-solid fa-share"></i> Share with reply
          </button>
        </div>
      </div>
    </div>
  )}
</>


  );
};

export default Inbox;
