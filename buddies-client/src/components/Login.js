import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/api/auth/login", {
        email: email.current.value,
        password: password.current.value,
      })
      .then((response) => {
        localStorage.setItem("user", response.data._id);
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-gray-200">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Welcome to Buddies</h3>
          <span className="loginDesc">Find new activities everywhere!</span>
        </div>
        <div className="loginRight">
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
        </div>
      </div>
    </div>
  );
}
