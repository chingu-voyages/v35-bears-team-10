import { useContext, useRef } from "react";

import { loginCall } from "../context/apiCalls";
import { AuthContext } from "../context/AuthContext";

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
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Welcome to Buddies</h3>
          <span className="loginDesc">Find new activities everywhere!</span>
        </div>
        <div className="loginRight">
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
            <button
             
              className="loginButton"
              type="submit"
              disabled={isFetching}
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
