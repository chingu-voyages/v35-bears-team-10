import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProfileBgImg from "../images/profile-bg.png";
import { UserContext } from "../context/user-context";

function Profile() {
  const { user, isLoggedIn } = useContext(UserContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return (
    <div className="">
      <Navbar />
      <div className="profile">
        <div className="flex flex-col md:flex-row w-full">
          <img
            src={ProfileBgImg}
            alt="profile-bg"
            className="hidden md:flex md:w-1/3 md:h-full md:object-cover"
          />
          <div className="flex flex-col justify-center items-center w-full">
            <h3 className="font-bold text-lg">Edit Profile</h3>
            {user && (
              <form className="loginBox m-6">
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  id="loginInput"
                  value={user.username}
                />

                <input
                  placeholder="Email"
                  type="email"
                  required
                  className="loginInput"
                  value={user.email}
                />

                <input
                  placeholder="Password"
                  type="password"
                  required
                  minLength="6"
                  className="loginInput"
                />
                <button className="loginButton" type="submit">
                  Save
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
