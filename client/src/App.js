import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import GuardedRoute from "./pages/guarded-route";
import Restrooms from "./pages/Home";
import Login from "./pages/Login";
import RestroomDetails from "./pages/RestroomDetails/RestroomDetails";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";

export const AuthContext = React.createContext();
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
