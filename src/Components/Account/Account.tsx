import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthContext } from "../routes/auth/AuthContext";
import { NotLoggedIn } from "../NotLoggedIn/NotLoggedIn";

const apiUrl = import.meta.env.VITE_API_URL;

export function Account() {
  const { user, accessToken } = useAuthContext();

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
        <div className="flex justify-center items-center px-4 mb-10 mt-10">
          <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Detalii Cont
            </h2>

            <div className="space-y-4 text-gray-700 text-base">
              <div>
                <span className="font-medium">Nume:</span> {user?.firstName}{" "}
                {user?.lastName}
              </div>
              <div>
                <span className="font-medium">Email:</span> {user?.email}
              </div>
              <div>
                <span className="font-medium">Tip cont:</span>{" "}
                <span
                  className={
                    user?.role === 1 ? "text-green-600 font-semibold" : ""
                  }
                >
                  {user?.role === 1 ? "Admin" : "User"}
                </span>
              </div>
              <div className="text-sm text-red-600">
                * Doar utilizatorii cu rol <strong>ADMIN</strong> pot adăuga,
                modifica sau șterge datele vehiculelor.
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
