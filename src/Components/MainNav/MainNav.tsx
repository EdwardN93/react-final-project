import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { getAccessToken, getCurrentUser } from "../routes/auth/Login/utils";
import { Button } from "../Button/Button";

type User = {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  role: number;
};

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const segments = location.pathname.split("/");
  const [getUser, setGetUser] = useState<null | User>(null);
  const id = segments[1] === "vehicles" ? segments[2] : null;

  const [isLoggedIn, setIsLoggedIn] = useState<string | boolean | null>();

  async function deleteCar() {
    fetch(`http://localhost:3000/vehicles/${segments[2]}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    alert("Car successfully deleted !");
    navigate("/");
  }

  useEffect(() => {
    setIsLoggedIn(getAccessToken());
    setGetUser(getCurrentUser());
  }, [location]);

  return isLoggedIn ? (
    <nav className="text-center">
      <ul className="flex justify-start items-center text-gray-800 gap-2">
        {location.pathname === "/" && getUser?.role === 1 && (
          <li>
            <Button
              text="Înregistrează mașină nouă"
              onClick={() => navigate("/register-car")}
            />
          </li>
        )}

        {id && getUser?.role === 1 && (
          <li>
            <Button
              text="Modifică mașină"
              color="green"
              onClick={() => navigate(`/modify-car/${id}`)}
            />
          </li>
        )}
        {id && getUser?.role === 1 && (
          <li>
            <Button
              text="Sterge mașină"
              color="red"
              onClick={() => {
                confirm("Sigur vrei sa ștergi mașina?") ? deleteCar() : "";
              }}
            />
          </li>
        )}
      </ul>
    </nav>
  ) : null;
}

export default Navbar;
