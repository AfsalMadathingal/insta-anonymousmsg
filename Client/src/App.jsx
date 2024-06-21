import { useState } from 'react'
import './App.css'
import SignIn from './components/Signin/SignIn'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './components/SignUp/SignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className=' bg-gradient-to-r from-yellow-500 via-pink-600 to-purple-800 h-screen w-screen p-20'>
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </div>
      
    </>
  )
}

export default App
