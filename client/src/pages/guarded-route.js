import React, { useContext } from 'react';
import { Route, Redirect, Navigate } from "react-router-dom";
import { AuthContext } from '../App';

export default function GuardedRoute(props) {
  console.log('isAuth ', props.isAuthenticated);
  if (props.isAuthenticated) {
    return <> {props.children} </>;
  }
  else {
    return <Navigate to='/login' />;
  }
}