import "./App.css";
import { Route, Routes, Navigate, } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {
   const { user } = useContext(AuthContext);
  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
