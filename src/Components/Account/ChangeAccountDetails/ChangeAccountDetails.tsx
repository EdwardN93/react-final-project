import { FormEvent, useEffect, useState } from "react";
import { getCurrentUser, getAccessToken } from "../../routes/auth/Login/utils";
import { Button } from "../../Button/Button";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { User } from "../../Types/Types";
import { z, ZodObject } from "zod/v4";

const validationSchema = z
  .object({
    firstName: z.string().min(1, "Please tell us your name"),
    lastName: z.string().min(1, "Please tell us your last name"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must contain at least 6 characters"),
    reTypePassword: z
      .string()
      .min(6, "Password must contain at least 6 characters"),
  })
  .refine((data) => data.password === data.reTypePassword, {
    message: "Passwords don't match",
    path: ["reTypePassword"],
  });

function validateForm<T extends ZodObject>(
  formValues: Record<string, FormDataEntryValue>,
  validationSchema: T
) {
  const result = validationSchema.safeParse(formValues);
  if (result.error) {
    return z.flattenError(result.error).fieldErrors;
  }
  return null;
}

export function ChangeAccountDetails() {
  const [getUser, setGetUser] = useState<null | User>();
  const navigate = useNavigate();

  async function onEditChange(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formDetails = Object.fromEntries(formData.entries());
    const errors = validateForm(formDetails, validationSchema);

    if (errors) {
      console.log(errors);
      return;
    }

    if (formDetails.password !== formDetails.reTypePassword) {
      return alert("Passwords don't match");
    }

    if (formDetails.email !== getUser?.email) {
      return alert("Email is incorrect. Please provide your email");
    }

    try {
      const response = await fetch(
        `http://localhost:3000/users/${getUser?.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
          },
          body: JSON.stringify({
            firstName: formDetails.firstName,
            lastName: formDetails.lastName,
            email: formDetails.email,
            password: formDetails.password,
          }),
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
  function discardChanges() {
    navigate("/account");
  }
  useEffect(() => {
    setGetUser(getCurrentUser);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
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
            />
          </div>
          <div className="flex flex-row gap-2">
            <Button
              text="Anulează"
              color="red"
              width
              onClick={discardChanges}
            />
            <Button text="Confirmă" width />
          </div>
        </form>
      </div>
    </motion.div>
  );
}
