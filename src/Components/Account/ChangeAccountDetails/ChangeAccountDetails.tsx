import { FormEvent, useEffect, useState } from "react";
import { getCurrentUser, getAccessToken } from "../../routes/auth/Login/utils";
import { Button } from "../../Button/Button";
import { useNavigate } from "react-router";
export function ChangeAccountDetails() {
  type User = {
    email: string;
    firstName: string;
    lastName: string;
    id: number;
  };

  const [getUser, setGetUser] = useState<null | User>();
  const navigate = useNavigate();

  async function onEditChange(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = e.currentTarget;
    const { firstName, lastName, email, password, reTypePassword } = formData;

    if (
      (password as HTMLInputElement).value !==
      (reTypePassword as HTMLInputElement).value
    ) {
      alert("Passwords don't match");
      return;
    }

    const user = {
      firstName: (firstName as HTMLInputElement).value,
      lastName: (lastName as HTMLInputElement).value,
      email: (email as HTMLInputElement).value,
      password: (password as HTMLInputElement).value,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/users/${getUser?.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
          },
          body: JSON.stringify(user),
        }
      );

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(`Error: ${JSON.stringify(payload)}`);
      }

      alert("Your account details changed successfuly !");
      navigate("/account");
    } catch (error: any) {
      console.log("Network or server error:", error.message);
      alert(error.message);
    }
  }
  useEffect(() => {
    setGetUser(getCurrentUser);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen px-4 mb-10 flex-col ">
      <form
        onSubmit={onEditChange}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mb-10"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Change Password
        </h2>

        <div className="mb-4">
          <label htmlFor="firstName" className="block mb-1 font-medium">
            Change First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block mb-1 font-medium">
            Change Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="reTypePassword" className="block mb-1 font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            id="reTypePassword"
            name="reTypePassword"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        <Button text="Confirm Changes" width />
      </form>
    </div>
  );
}
