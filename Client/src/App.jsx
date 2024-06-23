import { useContext, useEffect, useState } from "react";
import "./App.css";
import SignIn from "./components/Signin/SignIn";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import ReactLoading from "react-loading";
import Inbox from "./components/inbox/Inbox";
import Footer from "./components/Footer/Footer";
import bg from "../src/assets/images/bg.jpg";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SentMessage from "./components/sentMessage/SentMessage";
import PrivateRoute from "./components/PrivateRoute";
import { AuthContext } from "./store/AuthContext";
import LandingPage from "./components/LandingPage";
import ConfettiExplosion from "react-confetti-explosion";
import PublicRoute from "./components/PublicRoute";

function App() {


  const { user, loading, explosion } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-center h-screen">
      {explosion ? <ConfettiExplosion /> : null}
      {loading && (
        <>
          <ReactLoading type="bars" color="black" />
        </>
      )}
      {!loading && (
        <div
          style={{ backgroundImage: `url(${bg})`  }}
          className="  h-screen w-screen p-2 bg-cover bg-center"
        >
          <Routes>
          <Route path="/*" element={<LandingPage />} />
          <Route path="/sent/:id" element={<SentMessage />} />
            <Route element={<PublicRoute />}>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/inbox" element={<Inbox />} />
            </Route>
          </Routes>
        </div>
      )}
      {explosion ? <ConfettiExplosion /> : null}
      <Footer />

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false} 
      />
    </div>
  );
}

export default App;
