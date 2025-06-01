// User Roles:
// 1 - admin;
// 2 - user

import { useEffect, useState } from "react";
import { getCurrentUser, getAccessToken } from "../routes/auth/Login/utils";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router";

type User = {
  email: string;
  firstName: string;
  lastName: string;
  role: number;
  id: number;
};

export function Account() {
  const [user, setUser] = useState<User | null>();
  const navigate = useNavigate();

  useEffect(() => {
    async function getAccountDetails() {
      const token = getAccessToken();
      const userDetails = getCurrentUser();
      if (!token || !userDetails) return alert("You have to be logged in !");

      const getUser = await fetch(
        `http://localhost:3000/users/${userDetails.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        }
      );
      const userData = await getUser.json();
      setUser(userData);
    }
    getAccountDetails();
  }, []);

  function getToModifyAccountDetailsPage() {
    console.log("clickd");
    navigate("/change-account-details");
  }

  return (
    <div className="flex flex-col justify-center mt-6">
      <h1 className="text-lg">User Details</h1>
      <span>
        Nume: {user?.firstName} {user?.lastName}
      </span>
      <i className="fas fa-heart"></i>
      <span>Email: {user?.email}</span>
      <span>Tip cont: {user?.role === 1 ? "Admin" : "User"}</span>
      <span>
        Doar tipul de cont <strong>ADMIN</strong> poate adăuga / modifica /
        șterge datele mașinilor<span className="text-red-600">*</span>
      </span>
      <div className="flex mt-6">
        <Button
          text="Modifică date cont"
          onClick={getToModifyAccountDetailsPage}
          color="green"
        />
      </div>
    </div>
  );
}
