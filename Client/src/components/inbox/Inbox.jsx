import React, { useState } from 'react'

const Inbox = () => {

  const [viewMsg,setViewMsg]= useState(false)
  const [selectedMsg,setSelectedMsg] = useState(null)
  const messages = "No Message Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam qui dolore laborum veritatis officiis est facilis maxime fuga perferendis adipisci esse accusamus, voluptate voluptatum nesciunt harum doloribus iste optio commodi!"

  const handleViewMessage = ()=>{

    setSelectedMsg(messages)
    setViewMsg(true)

  }
  return (
    <>

    <div className='flex flex-col justify-center items-center  mb-10'>
      <div className='bg-blue-200 w-[400px] lg:w-[800px] shadow-xl h-[80vh] rounded-lg'>
        <div className='h-[100px]  bg-white shadow-lg flex justify-center items-center rounded-lg '> 
          <h1 className='text-3xl '>Inbox</h1>
        </div>
        <div className='flex  flex-col bg-blue-100 m-2 justify-center items-center h-[200px] rounded-lg'>
          <div className='overflow-y-scroll h-[70%]'>
          <p className='p-2'>{messages}</p>
          </div>
          <div className='gap-2 flex pt-2'>
          <button
          onClick={handleViewMessage} 
          className='bg-red-500 bottom-0 hover:bg-blue-700 text-white text-[12px] h-10  py- px-1  w-[80px] rounded-lg'> <i className="fa-solid fa-eye"></i> view</button>
          
          </div>
          
        </div>
      </div>
    </div>
    {viewMsg && (
      <div className="fixed inset-0 flex items-center justify-center  bg-gray-900 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-[600px]">
          <p className="text-xl font-bold mb-4">{selectedMsg}</p>
          <div className='gap-2 flex justify-center'>
          <button
            onClick={() => setViewMsg(null)}
            className="bg-red-500 text-white py-2 px-4 rounded-lg"
          >
            Close
          </button>
          <button className='bg-blue-500 bottom-0 hover:bg-red-700 text-white text-[12px] h-10  py-2 px-4  w-[180px] rounded-lg'> <i className="fa-solid fa-share"></i> share with reply</button>
          </div>
         
        </div>
      </div>
    )}
    </>
  )
}

export default Inbox
