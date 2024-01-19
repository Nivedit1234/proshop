import React from 'react'
import { useSelector } from 'react-redux'
import {Navigate, Outlet} from 'react-router-dom'

//outlet is basically what we wanna  if we r logged in because it will put out whatever screen you are trying to load if we are not logged in then we are gonna use navigate compo to redirect us
///useSelector to find if userInfo piece of state is there or not
const PrivateRoute = () => {
  const {userInfo} =useSelector((state)=>state.auth)
    return userInfo ? <Outlet/> : <Navigate to='/login' replace/>
  
}

export default PrivateRoute