import axios from "axios";
import "bootswatch/dist/zephyr/bootstrap.min.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./pages/routes";

export const AuthContext = React.createContext();
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
