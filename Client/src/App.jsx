import { useEffect, useState } from "react";
import "./App.css";
import SignIn from "./components/Signin/SignIn";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import ReactLoading from "react-loading";
import Inbox from "./components/inbox/Inbox";
import Footer from "./components/Footer/Footer";
import bg from '../src/assets/images/bg.jpg'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const host = import.meta.env.VITE_HOST;
    fetch(`${host}/api/auth/verify`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: 'include',
      
    })


      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.success) {
          setLoading(false);
          navigate("/signin");
        }else{
          setLoading(false);
          navigate("/inbox");
        }

      });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      {loading && (
        <>
          <ReactLoading type="bars" color="black" />
        </>
      
      )}
      {!loading && (
        <div style={{ backgroundImage: `url(${bg})` }} className="  h-screen w-screen p-2">
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/inbox" element={<Inbox />} />
          </Routes>
        </div>
      )}
      <Footer/>
      <ToastContainer />
      
    </div>
  );
}

export default App;
