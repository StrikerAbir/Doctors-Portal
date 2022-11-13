import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {

      let activeStyle = {
        backgroundColor: "#4ADE80",
        color: "black",
      };

  const menuItems = (
    <React.Fragment>
      <li className='font-semibold'>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="hover:bg-green-400 lg:mr-2"
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/appointment"
        >
          Appointment
        </NavLink>

        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/About"
        >
          About
        </NavLink>

        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/Reviews"
        >
          Reviews
        </NavLink>

        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/login"
        >
          Login
        </NavLink>
      </li>
    </React.Fragment>
  );

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems}
            </ul>
          </div>
          <Link to='/' className="btn btn-ghost normal-case text-xl">Doctors Portal</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            {menuItems}
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Get started</a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
