import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { loginCall } from "../context/apiCalls";
import { AuthContext } from "../context/AuthContext";
import RegisterImg from "./RegisterImg";


export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  console.log(user);
  return (
    <div className="registerImg">
      <RegisterImg />
      <div className="login">
        <h3 className="loginTitle">Hello Again!</h3>
        <p className="loginText">Welcome Back</p>
        <form className="loginBox" onSubmit={handleClick}>
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
          <button className="loginButton" type="submit" disabled={isFetching}>
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
