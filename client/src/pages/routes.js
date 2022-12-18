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
import axios from "axios";

export default function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["auth"]);

  axios.interceptors.response.use(
    function (successfulReq) {
      return successfulReq;
    },
    function (error) {
      if (error.response.status == 401) {
        alert('Expired token, please login');
        navigate('/login')
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (!!cookies && ['/', '/login', '/sign-up'].includes(location.pathname)) {
      navigate('/home');
    }
  }, []);

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/home" />} />
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
      <Route path="/restroom/:id" element={
        <GuardedRoute>
          <RestroomDetails />
        </GuardedRoute>
      } />
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