import { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router";
function Navbar() {
  const [activation, setactivation] = useState(Boolean);

  function logOut() {
    console.log("Logged out :(");
    setactivation(false);
  }

  function logIn() {
    setactivation(true);
    console.log("Logged in! :)");
  }

  const navigate = useNavigate();
  return (
    <nav className="h-full text-center md:text-left">
      <ul className="flex flex-col space-y-4 text-gray-800">
        <li
          className="cursor-pointer hover:bg-gray-300 p-2 rounded"
          onClick={() => navigate("/")}
        >
          Home
        </li>

        <li
          className="cursor-pointer hover:bg-gray-300 p-2 rounded"
          onClick={() => navigate("/register")}
        >
          Register
        </li>

        {activation ? (
          <li
            className="cursor-pointer hover:bg-gray-300 p-2 rounded"
            onClick={logOut}
          >
            LogOut
          </li>
        ) : (
          <li
            className="cursor-pointer hover:bg-gray-300 p-2 rounded"
            onClick={logIn}
          >
            LogIn
          </li>
        )}
        <li className="cursor-pointer hover:bg-gray-300 p-2 rounded">Stuff</li>
      </ul>
    </nav>
  );
}

export default Navbar;
