import { useEffect, useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router";
import { FaChartBar, FaRegUser, FaUser } from "react-icons/fa";

import "./SideNav.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState<string | boolean | null>(
    localStorage.getItem("user")
  );

  useEffect(() => {
    // Check for changes in route and update login status
    setIsLoggedIn(!!localStorage.getItem("user"));
  }, [location]);

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="h-full text-center md:text-left">
      <menu className="flex flex-col space-y-4 text-gray-800 sideNav">
        <li
        // onClick={() => navigate("/")}
        >
          <NavLink
            className="flex w-full hover:bg-gray-300 p-2 gap-4 justify-start items-center rounded"
            to="/"
            viewTransition
          >
            <FaChartBar /> Home
          </NavLink>
        </li>
        {isLoggedIn ? (
          ""
        ) : (
          <li>
            <NavLink
              className="flex w-full hover:bg-gray-300 p-2 gap-4 justify-start items-center rounded"
              to="/register"
              viewTransition
            >
              <FaRegUser /> Register
            </NavLink>
          </li>
        )}

        {isLoggedIn ? (
          <li
            className=" flex cursor-pointer hover:bg-gray-300 p-2 gap-4 justify-start items-center rounded"
            onClick={logOut}
          >
            <FaRegUser /> Log Out
          </li>
        ) : (
          <li
          // onClick={() => navigate("/login")}
          >
            <NavLink
              className="flex w-full hover:bg-gray-300 p-2 gap-4 justify-start items-center rounded "
              to="/login"
              viewTransition
            >
              <FaUser /> Log In
            </NavLink>
          </li>
        )}

        <li className="cursor-pointer hover:bg-gray-300 p-2 rounded">Stuff</li>
      </menu>
    </nav>
  );
}

export default Navbar;
