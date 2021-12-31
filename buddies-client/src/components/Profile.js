import React, { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

import { UserContext } from "../context/user-context";

function Profile() {
  const { user, isLoggedIn } = useContext(UserContext);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return (
    <div className="">
      <Navbar />
      <h1>Upload Image</h1>
    <form action="/uploadphoto" enctype="multipart/form-data" method="POST">
        <input type="file" name="myImage" accept="image/*"/>
        <input type="submit" value="Upload Photo"/>
    </form>
    </div>
  );
}

export default Profile;
