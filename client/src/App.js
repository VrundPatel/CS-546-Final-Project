import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
