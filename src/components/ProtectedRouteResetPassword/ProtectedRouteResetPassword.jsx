import React from 'react'
import style from './ProtectedRouteResetPassword.module.css'
import { Navigate } from 'react-router-dom'

export default function ProtectedRouteResetPassword(props) {
  if(localStorage.getItem("Success")){
    return props.children}
    else {
    return <Navigate to={"/login"}/>}}

