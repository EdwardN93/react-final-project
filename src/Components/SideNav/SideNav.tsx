import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";

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
      <ul className="flex flex-col space-y-4 text-gray-800">
        <li
          className="cursor-pointer hover:bg-gray-300 p-2 rounded"
          onClick={() => navigate("/")}
        >
          Home
        </li>
        {isLoggedIn ? (
          ""
        ) : (
          <li
            className="cursor-pointer hover:bg-gray-300 p-2 rounded"
            onClick={() => navigate("/register")}
          >
            Register
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
            className="cursor-pointer hover:bg-gray-300 p-2 rounded"
            onClick={() => navigate("/login")}
          >
            Log In
          </li>
        )}

        <li className="cursor-pointer hover:bg-gray-300 p-2 rounded">Stuff</li>
      </ul>
    </nav>
  );
}

export default Navbar;
