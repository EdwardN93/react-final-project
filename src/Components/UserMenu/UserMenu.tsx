import { useNavigate } from "react-router";
import { FaUser } from "react-icons/fa";
import { useAuthContext } from "../routes/auth/AuthContext";

export function UserMenu() {
  const navigate = useNavigate();
  const { accessToken } = useAuthContext();

  return accessToken ? (
    <div>
      <span
        className="text-xl text-sky-400 hover:text-sky-600 hover:cursor-pointer"
        onClick={() => navigate("/account")}
      >
        <FaUser />
      </span>
    </div>
  ) : null;
}
