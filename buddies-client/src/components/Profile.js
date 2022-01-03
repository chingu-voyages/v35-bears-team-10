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
      
    </div>
  );
}

export default Profile;
