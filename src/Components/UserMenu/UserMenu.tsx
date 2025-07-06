import { useNavigate } from "react-router";
import { FaUser } from "react-icons/fa";
import { useAuthContext } from "../routes/auth/AuthContext";

export function UserMenu() {
  const navigate = useNavigate();
  const { user, accessToken } = useAuthContext();

  return accessToken ? (
    <div className="flex gap-4">
      Hello {user?.firstName}
      <span
        className="text-xl text-sky-400 hover:text-sky-600 hover:cursor-pointer transition-all duration-300"
        onClick={() => navigate("/account")}
      >
        <FaUser />
      </span>
    </div>
  ) : null;
}
