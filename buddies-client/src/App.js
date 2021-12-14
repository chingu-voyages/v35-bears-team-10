import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./components/NotFound";
import Map from "./components/Map";

function App() {
  return (
    <div>
      <ToastContainer limit={2} position="top-center" />

      <Routes>
        <Route path="*" element={<NotFound />} />

        <Route path="/" element={<Home />} exact />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </div>
  );
}

export default App;
