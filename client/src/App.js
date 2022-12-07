import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import GuardedRoute from './pages/guarded-route';
import Restrooms from './pages/Home';
import Login from './pages/Login';
import RestroomDetails from './pages/RestroomDetails';
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile';

export const AuthContext = React.createContext();

function App() {
  //TODO: introduce a custom hook for auth 
  const [isAuthenticated, setAutheticated] = useState(true);

  // useEffect(() => {
  //   axios.get('http://localhost:9000/users/auth-check').then((res) => {
  //     console.log('response for auth check ', res.data);
  //     setAutheticated(true);
  //   })
  // })
  return (
    <AuthContext.Provider value={isAuthenticated}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={
            <GuardedRoute isAuthenticated>
              <Restrooms />
            </GuardedRoute>
          } />
          <Route path="/restroon/:id" element={
            <GuardedRoute isAuthenticated>
              <RestroomDetails />
            </GuardedRoute>
          } />
          <Route path="/user" element={
            <GuardedRoute isAuthenticated>
              <UserProfile />
            </GuardedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
