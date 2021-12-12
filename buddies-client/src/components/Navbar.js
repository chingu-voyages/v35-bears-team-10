import React, { useContext } from "react";
import { UserContext } from "../context/user-context";

function Navbar() {
  const { isLoggedIn, handleSignOut } = useContext(UserContext);
  return (
    <header>
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container px-6 py-3 mx-auto">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex items-center justify-between">
              <div className="text-xl font-semibold text-gray-700">
                <a
                  className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
                  href="/"
                >
                  {/* <img
                    src={logo}
                    alt="logo"
                    className="rounded-lg shadow-lg"
                    width={120}
                  /> */}
                  <h1>Buddies</h1>
                </a>
              </div>
              <div className="flex md:hidden">
                <button
                  type="button"
                  className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                  aria-label="toggle menu"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-1 md:flex md:items-center md:justify-between hidden">
              <div className="flex flex-col -mx-4 md:flex-row md:items-center md:mx-8">
                <a
                  href="/"
                  className="px-2 mx-2  text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                >
                  About
                </a>
              </div>
              <div className="flex items-center mt-1 md:mt-0">
                {isLoggedIn ? (
                  <button
                    onClick={handleSignOut}
                    className="bg-red-400 text-white px-4 py-2 rounded mx-4 uppercase shadow-xl hover:bg-red-300"
                  >
                    Sign out
                  </button>
                ) : (
                  <a href="/login">
                    <button className="bg-yellow-400 text-white px-4 py-2 rounded mx-4 uppercase shadow-xl hover:bg-yellow-500 font-bold">
                      Sign in
                    </button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
