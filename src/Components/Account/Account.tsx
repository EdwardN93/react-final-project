// User Roles:
// 1 - admin;
// 2 - user

import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useAuthContext } from "../routes/auth/AuthContext";
import { NotLoggedIn } from "../NotLoggedIn/NotLoggedIn";

const apiUrl = import.meta.env.VITE_API_URL;

export function Account() {
  const { user, accessToken } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function getAccountDetails() {
      if (!accessToken || !user) return alert("You have to be logged in !");

      await fetch(`${apiUrl}/users/${user.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
      }).then((res) => res.json());
    }
    getAccountDetails();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!accessToken ? (
        <NotLoggedIn />
      ) : (
        <div className="flex flex-col justify-center mt-6">
          <h1 className="text-lg">User Details</h1>
          <span>
            Nume: {user?.firstName} {user?.lastName}
          </span>
          <span>Email: {user?.email}</span>
          <span>Tip cont: {user?.role === 1 ? "Admin" : "User"}</span>
          <span>
            Doar tipul de cont <strong>ADMIN</strong> poate adăuga / modifica /
            șterge datele mașinilor<span className="text-red-600">*</span>
          </span>
          <div className="flex mt-6"></div>
        </div>
      )}
    </motion.div>
  );
}
