import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";


function App() {
  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/register" element={<Register />} />
       
      </Routes>
    </div>
  );
}

export default App;
