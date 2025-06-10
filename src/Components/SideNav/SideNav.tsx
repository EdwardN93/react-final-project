import { useEffect, useState } from "react";
import { useLocation, NavLink, useNavigate } from "react-router";
import { FaChartBar, FaRegUser, FaUser } from "react-icons/fa";
import { LiElementProps } from "../Types/Types";
import { logout } from "../routes/auth/Logout/Logout";
import "./SideNav.css";

export default function SideNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState<string | boolean | null>(
    localStorage.getItem("user")
  );

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("user"));
  }, [location]);

  function LiElement({ children, ...props }: LiElementProps) {
    return <li {...props}>{children}</li>;
  }

  return (
    <nav className="h-full text-center md:text-left">
      <menu className="flex flex-col space-y-4 text-gray-800 sideNav">
        <LiElement>
          <NavLink
            className="flex w-full hover:bg-gray-300 p-2 gap-4 justify-start items-center rounded"
            to="/"
            viewTransition
          >
            <FaChartBar /> Home
          </NavLink>
        </LiElement>
        {isLoggedIn ? (
          ""
        ) : (
          <LiElement>
            <NavLink
              className="flex w-full hover:bg-gray-300 p-2 gap-4 justify-start items-center rounded"
              to="/register"
              viewTransition
            >
              <FaRegUser /> Register
            </NavLink>
          </LiElement>
        )}

        {isLoggedIn ? (
          <LiElement
            className=" flex cursor-pointer hover:bg-gray-300 p-2 gap-4 justify-start items-center rounded"
            onClick={() => logout(setIsLoggedIn, navigate)}
          >
            <FaRegUser /> Log Out
          </LiElement>
        ) : (
          <LiElement>
            <NavLink
              className="flex w-full hover:bg-gray-300 p-2 gap-4 justify-start items-center rounded "
              to="/login"
              viewTransition
            >
              <FaUser /> Log In
            </NavLink>
          </LiElement>
        )}
      </menu>
    </nav>
  );
}
