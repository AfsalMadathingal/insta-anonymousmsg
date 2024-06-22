import { useEffect, useState } from "react";
import "./App.css";
import SignIn from "./components/Signin/SignIn";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import ReactLoading from "react-loading";
import Inbox from "./components/inbox/Inbox";

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
          navigate("/");
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
        <div className="bg-gradient-to-r from-yellow-500 via-pink-600 to-purple-800 h-screen w-screen p-2">
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Inbox />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
