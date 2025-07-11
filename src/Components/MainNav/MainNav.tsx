import { useNavigate, useLocation } from "react-router";
import { Button } from "../Button/Button";
import { useAuthContext } from "../routes/auth/AuthContext";
import { useState } from "react";
import { CustomModal } from "../Modal/Modal";

const apiUrl = import.meta.env.VITE_API_URL;

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const segments = location.pathname.split("/");
  const id = segments[1] === "vehicles" ? segments[2] : null;
  const { user, accessToken } = useAuthContext();

  const [showModal, setShowModal] = useState(false);

  async function handleDeleteCar() {
    fetch(`${apiUrl}/vehicles/${segments[2]}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  function handleCancel() {
    setShowModal(false);
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
        {location.pathname === "/account" && (
          <Button
            text="Modifică date cont"
            onClick={() => navigate("/change-account-details")}
            color="green"
          />
        )}

        {id && user?.role === 1 && (
          <li>
            <Button
              text="Modifică date tehnice"
              color="green"
              onClick={() => navigate(`/modify-car/${id}`)}
            />
          </li>
        )}
        {id && user?.role === 1 && (
          <li>
            <Button
              text="Adaugă reparații"
              color="green"
              onClick={() => navigate(`/repairs/${id}`)}
            />
          </li>
        )}
        {id && user?.role === 1 && (
          <li>
            <Button
              text="Sterge mașină"
              color="red"
              onClick={() => setShowModal(true)}
            />
          </li>
        )}
      </ul>
      {showModal && (
        <CustomModal
          title="Șterge mașină"
          message="Ești sigur că vrei să ștergi mașina?"
          onConfirm={() => {
            handleDeleteCar();
            handleCancel();
            navigate("/");
          }}
          confirmBtnMessage="DA"
          showCancelBtn
          declineBtnMessage="NU"
          onCancel={handleCancel}
        />
      )}
    </nav>
  ) : null;
}

export default Navbar;
