import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import GuardedRoute from "./guarded-route";
import Restrooms from "./Home";
import Login from "./Login";
import RestroomDetails from "./RestroomDetails/RestroomDetails";
import SignUp from "./SignUp";
import UserProfile from "./UserProfile";

export default function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["auth"]);

  useEffect(() => {
    if (!!cookies && ['/login', '/sign-up'].includes(location.pathname)) {
      navigate('/home');
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={
          <GuardedRoute>
            <Restrooms />
          </GuardedRoute>
        }
      />
      <Route path="/restroom/:id" element={<RestroomDetails />} />
      <Route
        path="/user"
        element={
          <GuardedRoute>
            <UserProfile />
          </GuardedRoute>
        }
      />
    </Routes>
  )
}