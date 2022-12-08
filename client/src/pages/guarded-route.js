import React, { useContext } from 'react';
import { Route, Redirect, Navigate } from "react-router-dom";
import { AuthContext } from '../App';

export default function GuardedRoute(props) {
  const isAuthenticated = useContext(AuthContext);
console.log('isAuth ', isAuthenticated);
  if (isAuthenticated) {
    return <> {props.children} </>;
  }
  else {
    return <Navigate to='/login' />;
  }
}