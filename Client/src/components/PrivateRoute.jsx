
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../store/AuthContext';
import { Outlet ,Navigate} from 'react-router-dom'

const PrivateRoute = () => {

    const { user, loading } = useContext(AuthContext);


    console.log("from private",user);

  return ( user ? <Outlet/> : <Navigate to="/signin"/>)
  
}

export default PrivateRoute
