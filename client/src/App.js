import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
// import AuthContext from './context/auth-context';
import GuardedRoute from "./pages/guarded-route";
import Restrooms from "./pages/Home";
import RestroomDetails from "./pages/RestroomDetails/RestroomDetails";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";

export const AuthContext = React.createContext();
axios.defaults.withCredentials = true;

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:9000/users/auth-check")
      .then((res) => {
        console.log("response for auth check ", res.data);
        setAuthenticated(!!res.data.user);
      })
      .catch((error) => {
        console.error("error: ", error);
        setAuthenticated(false);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <GuardedRoute isAuthenticated>
              <Restrooms />
            </GuardedRoute>
          }
        />
        <Route path="/restroom/:id" element={<RestroomDetails />} />
        <Route
          path="/user"
          element={
            <UserProfile />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
