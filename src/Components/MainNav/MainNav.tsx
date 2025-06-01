import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import { getAccessToken } from "../routes/auth/Login/utils";
import { Button } from "../Button/Button";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const segments = location.pathname.split("/");
  const id = segments[1] === "vehicles" ? segments[2] : null;

  const [isLoggedIn, setIsLoggedIn] = useState<string | boolean | null>();

  useEffect(() => {
    setIsLoggedIn(getAccessToken());
  }, [location]);

  return isLoggedIn ? (
    <nav className="text-center">
      <ul className="flex justify-start items-center text-gray-800 gap-2">
        {location.pathname === "/" && (
          <li>
            <Button
              text="Înregistrează mașină nouă"
              onClick={() => navigate("/register-car")}
            />
          </li>
        )}

        {id && (
          <li>
            <Button
              text="Modifică mașină"
              color="green"
              onClick={() => navigate(`/modify-car/${id}`)}
            />
          </li>
        )}
      </ul>
    </nav>
  ) : null;
}

export default Navbar;
