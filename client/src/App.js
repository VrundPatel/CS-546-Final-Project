import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import GuardedRoute from './pages/guarded-route';
import Restrooms from './pages/Home';
import Login from './pages/Login';
import RestroomDetails from './pages/RestroomDetails';
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile';

function App() {
  //TODO: introduce a custom hook for auth 
  const [isAuthenticated, setAutheticated] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={
          <GuardedRoute auth={isAuthenticated}>
            <Restrooms />
          </GuardedRoute>
        } />
        <Route path="/restroon/:id" element={
          <GuardedRoute auth={isAuthenticated}>
            <RestroomDetails />
          </GuardedRoute>
        } />
        <Route path="/user" element={
          <GuardedRoute auth={isAuthenticated}>
            <UserProfile />
          </GuardedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
