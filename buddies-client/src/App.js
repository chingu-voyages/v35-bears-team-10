import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import Map from "./components/Map";

function App() {
  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/register" element={<Register />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </div>
  );
}

export default App;
