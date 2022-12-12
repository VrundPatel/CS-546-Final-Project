import React from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from "react-router-dom";

//TODO: decode jwt to verify further
export default function GuardedRoute(props) {
  const [cookies, setCookie] = useCookies(["auth"]);
  console.log('cookies ', cookies);
  if (Object.keys(cookies).length !== 0) {
    return <> {props.children} </>;
  }
  else {
    return <Navigate to='/login' />;
  }
}