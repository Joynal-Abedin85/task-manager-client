import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Authcontext } from "./Authprovider";
import { FaMoon, FaSun } from "react-icons/fa";

const Header = () => {

  const {user,logout} = useContext(Authcontext)
  console.log(user);
  const [darkMode, setDarkMode] = useState(false);

  // Apply the theme to the body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  const item = (
    <>
      <li>
        <NavLink to='/'>home</NavLink>
      </li>
    
      <li>
        <NavLink to='/addtask'>add task</NavLink>
      </li>
      <li>
        <NavLink to='/mytask'>my task</NavLink>
      </li>
     
    </>
  );
  return (
    <div className="navbar sticky top-0 z-50 bg-black text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-cyan-600 text-black font-bold  rounded-box z-[10] mt-3 w-52 p-2 shadow backdrop-blur-sm bg-opacity-55"
          >
            {item}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl ">Task<span className="font-bold text-teal-500">store</span></a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{item}</ul>
      </div>

      <div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-4 ml-7 py-2 text-white font-bold rounded-md transition duration-300 bg-teal-500 hover:bg-teal-600 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        {darkMode ? <FaSun className="text-amber-500"></FaSun> : <FaMoon className="text-black "></FaMoon>}
      </button>
      </div>
      
      {
        user && user?.email ?  (<div className="dropdown dropdown-end  w-full flex justify-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={user?.photoURL
              }
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-teal-500 rounded-box z-[1] mt-28 w-52 p-2 shadow"
        >
          
          <li>
            <a>{user?.displayName}</a>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </div>) :(<div className="navbar-end">
        <NavLink to='/signin' className="btn font-bold text-teal-500 ">Sign In</NavLink>
      </div>) 
      }
      
      
    </div>
  );
};

export default Header;
