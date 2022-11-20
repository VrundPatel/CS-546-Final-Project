import React from 'react';
import { Route, Redirect, Navigate } from "react-router-dom";

export default function GuardedRoute(props) {
  if (props.auth) {
    return <> {props.children} </>;
  }
  else {
    return <Navigate to='/login' />;
  }
}