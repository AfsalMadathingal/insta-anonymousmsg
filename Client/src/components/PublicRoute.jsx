
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../store/AuthContext';
import { Outlet ,Navigate} from 'react-router-dom'

const PublicRoute = () => {

    const { user, loading ,setLoading } = useContext(AuthContext);


  console.log("from public",user);

  return ( user ? <Navigate to="/inbox"/> : <Outlet/> )
  
}

export default PublicRoute
