import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
        toast.error("Wrong credentials");
      });
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
      <div className="">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl font-bold">Welcome to Buddies</h1>
          <h3 className="text-lg mt-4">Find new activities everywhere!</h3>
        </div>
        <div className="flex flex-col mt-3">
          <form className="flex flex-col" onSubmit={handleLogin}>
            <input
              placeholder="Email"
              type="email"
              required
              className="w-full bg-white px-4 py-2 rounded mt-2"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="w-full bg-white px-4 py-2 rounded mt-2"
              ref={password}
            />
            <button
              className="font-bold hover:bg-yellow-300 bg-yellow-400 w-full mt-4 text-white rounded py-2"
              type="submit"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
