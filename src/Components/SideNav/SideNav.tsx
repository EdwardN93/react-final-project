import { NavLink } from "react-router";
import { FaChartBar, FaRegUser, FaUser } from "react-icons/fa";
import { LiElementProps } from "../Types/Types";
import { useAuthContext } from "../routes/auth/AuthContext";
import "./SideNav.css";

export function SideNav() {
  const { user, logout } = useAuthContext();

  function handleLogout() {
    logout();
  }

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
        <LiElement>
          <NavLink
            className="flex w-full hover:bg-gray-300 p-2 gap-4 justify-start items-center rounded"
            to="/sqlTest"
            viewTransition
          >
            <FaChartBar /> SQL TEST
          </NavLink>
        </LiElement>
        {user ? (
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

        {user ? (
          <LiElement
            className=" flex cursor-pointer hover:bg-gray-300 p-2 gap-4 justify-start items-center rounded"
            onClick={handleLogout}
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
