import { useNavigate, useLocation } from "react-router";
import { Button } from "../Button/Button";
import { useAuthContext } from "../routes/auth/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const segments = location.pathname.split("/");
  const id = segments[1] === "vehicles" ? segments[2] : null;
  const { user, accessToken } = useAuthContext();

  async function deleteCar() {
    fetch(`http://localhost:3000/vehicles/${segments[2]}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    alert("Car successfully deleted !");
    navigate("/");
  }

  return accessToken ? (
    <nav className="text-center">
      <ul className="flex justify-start items-center text-gray-800 gap-2">
        {location.pathname === "/" && user?.role === 1 && (
          <li>
            <Button
              text="Înregistrează mașină nouă"
              onClick={() => navigate("/register-car")}
            />
          </li>
        )}

        {id && user?.role === 1 && (
          <li>
            <Button
              text="Modifică mașină"
              color="green"
              onClick={() => navigate(`/modify-car/${id}`)}
            />
          </li>
        )}
        {id && user?.role === 1 && (
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
