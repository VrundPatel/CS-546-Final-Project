import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import Restrooms from './pages/Home';
import Login from './pages/Login';
import RestroomDetails from './pages/RestroomDetails';
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Restrooms />} />
        <Route path="/restroom/:id" element={<RestroomDetails />} />
        <Route path="/user" element={<UserProfile/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
