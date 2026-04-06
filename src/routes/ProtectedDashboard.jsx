import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'
import { Auth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ProtectedDashboard = () => {

    let {loggedInUser} = useContext(Auth);

    if(loggedInUser === null || loggedInUser === undefined){
        toast.error("Unauthorized Access! Please login to continue.");
        return <Navigate to="/" />
    }
  return <Outlet />
}

export default ProtectedDashboard