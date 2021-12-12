import React, { useState, useEffect } from "react";

const UserContext = React.createContext(null);

function UserContextProvider(props) {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [user]);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        handleSignOut,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
