import { useEffect, useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router";

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
          <NavLink className="block w-full hover:bg-gray-300 p-2" to="/">
            Home
          </NavLink>
        </li>
        {isLoggedIn ? (
          ""
        ) : (
          <li>
            <NavLink
              className="block w-full hover:bg-gray-300 p-2 rounded"
              to="/register"
            >
              Register
            </NavLink>
          </li>
        )}

        {isLoggedIn ? (
          <li
            className="cursor-pointer hover:bg-gray-300 p-2 rounded"
            onClick={logOut}
          >
            Log Out
          </li>
        ) : (
          <li
          // onClick={() => navigate("/login")}
          >
            <NavLink
              className="block w-full hover:bg-gray-300 p-2 rounded "
              to="/login"
            >
              Log In
            </NavLink>
          </li>
        )}

        <li className="cursor-pointer hover:bg-gray-300 p-2 rounded">Stuff</li>
      </menu>
    </nav>
  );
}

export default Navbar;
