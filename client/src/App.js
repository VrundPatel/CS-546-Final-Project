import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import Restrooms from './pages/restrooms';
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/restrooms" element={<Restrooms />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
