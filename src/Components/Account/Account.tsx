// User Roles:
// 1 - admin;
// 2 - user

import { useEffect, useState } from "react";
import { getCurrentUser, getAccessToken } from "../routes/auth/Login/utils";
import { Button } from "../Button/Button";

type User = {
  email: string;
  firstName: string;
  lastName: string;
  role: number;
  id: number;
};

export function Account() {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    async function getAccountDetails() {
      const token = getAccessToken();
      const userDetails = getCurrentUser();
      if (!token || !userDetails) return alert("You have to be logged in !");

      const getUser = await fetch(
        `http://192.168.1.137:3000/users/${userDetails.id}`,
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

  function getLog() {
    console.log("clickd");
  }

  return (
    <div className="flex flex-col justify-center mt-6">
      <h1 className="text-lg">User Details</h1>
      <span>
        Name: {user?.firstName} {user?.lastName}
      </span>
      <i className="fas fa-heart"></i>
      <span>Email: {user?.email}</span>

      {user?.role === 1 ? (
        <span>User type: Admin</span>
      ) : (
        <span>User type: User</span>
      )}
      <div className="flex mt-6">
        <Button text="Change Details" onClick={getLog} color="green" />
      </div>
    </div>
  );
}
