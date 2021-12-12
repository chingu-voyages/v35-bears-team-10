import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/user-context";
import HikingImg from "../images/hikingImg.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const {user, setUser } = useContext(UserContext);

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/api/auth/login", {
        email: email.current.value,
        password: password.current.value,
      })
      .then((response) => {
        setUser(response.data);
        localStorage.setItem("user", response.data);
        navigate("/profile");
      })
      .catch((error) => {
        toast.error("Wrong credentials");
      });
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen">
      <img
        src={HikingImg}
        alt="hiking"
        className="w-1/2 h-screen hidden md:block"
      />
      <div className="flex flex-col justify-center items-center w-2/3 h-2/3">
        <h3 className="loginTitle">Hello Again!</h3>
        <p className="loginText">Welcome Back</p>
        <form className="loginBox" onSubmit={handleLogin}>
          <input
            placeholder="Email"
            type="email"
            required
            className="loginInput"
            ref={email}
          />
          <input
            placeholder="Password"
            type="password"
            required
            minLength="6"
            className="loginInput"
            ref={password}
          />
          <button className="loginButton" type="submit">
            Log in
          </button>
        </form>

        <span className="span-0">Don't have an account?</span>
        <Link style={{ textDecoration: "none" }} to="/register">
          <span className="span-1">Register</span>
        </Link>
      </div>
    </div>
  );
}
