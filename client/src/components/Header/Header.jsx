import React, { useState } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import Theme from "../utills/Theme";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, CartIcon } from "../utills/Icons";
import { signOut } from "../../redux/features/userSlice";

function Header() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
    <Navigate to="/" />;
  };

  return (
    <div className="drop-shadow">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xxl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Saree & Panjabi
            </span>
          </Link>
          <div className="flex lg:order-2">
            {/* Search bar */}
            {/* <div className="relative hidden md:block">
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 pe-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
              <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
            </div> */}
            <div className="flex items-center">
              <Theme />
              <div className="flex relative items-center justify-between p-2 ml-2">
                <CartIcon className="w-4 h-4 md:w-6 md:h-6 dark:text-white mr-4" />
                <span className="font-semibold absolute w-4 h-4 text-xs md:text-base md:w-5 md:h-5 text-center dark:text-white rounded-full bg-red-500 dark:bg-red-600 right-1">
                  5
                </span>
              </div>
              <div className="hidden lg:flex border-2 ml-2 px-4 py-2 rounded-full lg:justify-between lg:items-center">
                {!currentUser ? (
                  <>
                    <Link to="/sign-in">
                      <span className="font-semibold text-lg dark:text-white">
                        Sign In
                      </span>
                    </Link>
                  </>
                ) : (
                  <button
                    className="flex justify-between"
                    onClick={handleSignOut}
                  >
                    <Avatar className="w-8 h-8 mr-4 dark:text-white" />
                    <span className="font-semibold text-lg dark:text-white">
                      Sign Out
                    </span>
                  </button>
                )}
              </div>
            </div>
            {/* Hamberg Menu */}
            <button
              type="button"
              className="inline-flex items-center p-2 mr-4 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-search"
              aria-expanded="false"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          {/* Nav Link */}
          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } items-center justify-between w-full lg:flex lg:w-auto lg:order-1`}
            id="navbar-search"
          >
            <div className="relative mt-3 lg:hidden">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
            <ul className="flex flex-col p-4 lg:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 px-3  rounded ${
                      isActive
                        ? "text-blue-500 dark:text-blue-700"
                        : "dark:text-white"
                    } hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products/men"
                  className={({ isActive }) =>
                    `block py-2 px-3  rounded ${
                      isActive
                        ? "text-blue-500 dark:text-blue-700"
                        : "dark:text-white"
                    } hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`
                  }
                >
                  Men's Dress
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products/women"
                  className={({ isActive }) =>
                    `block py-2 px-3  rounded ${
                      isActive
                        ? "text-blue-500 dark:text-blue-700"
                        : "dark:text-white"
                    } hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`
                  }
                >
                  Women's Dress
                </NavLink>
              </li>
              <li>
                <div className="flex lg:hidden px-2 md:px-0 py-2  items-center">
                  {!currentUser ? (
                    <>
                      <Link to="/sign-in">
                        <span className="font-semibold text-lg dark:text-white">
                          Sign In
                        </span>
                      </Link>
                    </>
                  ) : (
                    <button
                      className="flex justify-between"
                      onClick={handleSignOut}
                    >
                      <Avatar className="w-6 h-6 mr-4 dark:text-white" />
                      <span className="font-semibold text-lg dark:text-white">
                        Sign Out
                      </span>
                    </button>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
