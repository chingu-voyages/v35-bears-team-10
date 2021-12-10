import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
