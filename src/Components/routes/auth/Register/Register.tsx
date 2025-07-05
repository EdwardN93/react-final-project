import { NavLink, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { z } from "zod/v4";
import { AuthResponse } from "../../../Types/Types";
import { validateForm, ValidationErrors } from "../../../utils/validation";
import { useAuthContext } from "../AuthContext";
import { useRedirectWhenLoggedIn } from "../useRedirectWhenLogIn";
import { useState } from "react";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

const validationSchema = z
  .object({
    email: z.email("Please enter a valid email address."),
    password: z
      .string()
      .min(6, "Your password should be at least 6 characters long."),
    retypePassword: z
      .string()
      .min(6, "Your password should be at least 6 characters long."),
    firstName: z.string().min(1, "Please tell us your first name."),
    lastName: z.string().min(1, "Please tell us your last name."),
  })
  .refine((data) => data.password === data.retypePassword, {
    message: "The passwords did not match.",
    path: ["retypePassword"],
  });

const initialDefaultValues = {
  email: "",
  password: "",
  retypePassword: "",
  firstName: "",
  lastName: "",
};

export const Register = () => {
  const [errors, setErrors] = useState<null | ValidationErrors<
    typeof validationSchema
  >>(null);
  const [defaultValues, setDefaultValues] = useState(initialDefaultValues);
  const [showPassword, setShowPassword] = useState(false);

  const willRedirect = useRedirectWhenLoggedIn();
  const { login } = useAuthContext();

  if (willRedirect) {
    return null;
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!errors) {
      return;
    }
    const formValues = new FormData(e.target.form!);
    const newErrors = validateForm(
      Object.fromEntries(formValues.entries()),
      validationSchema
    );

    setErrors(newErrors);
  }

  async function handleRegister(formData: FormData) {
    const values = Object.fromEntries(formData.entries());
    const errors = validateForm(values, validationSchema);

    if (errors) {
      setErrors(errors);
      setDefaultValues(values as typeof defaultValues);
      return;
    }

    setErrors(null);
    setDefaultValues(initialDefaultValues);

    delete values.retypePassword;
    const valuesWithRole = {
      ...values,
      role: 0,
    };
    console.log(valuesWithRole);

    const data = await fetch(`${apiUrl}/register`, {
      method: "POST",
      body: JSON.stringify(valuesWithRole),
      headers: { "Content-type": "application/json" },
    }).then((res) => res.json() as Promise<AuthResponse>);

    login(data);
    toast.success("Contul tau a fost înregistrat cu succes !");
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-center items-center min-h-screen px-4 mb-10 flex-col">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister(new FormData(e.currentTarget));
          }}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mb-10"
          noValidate
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

          <div className="mb-4">
            <label htmlFor="firstName" className="block mb-1 font-medium">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
              defaultValue={defaultValues.firstName}
              onChange={handleInputChange}
            />
          </div>
          {errors?.firstName && (
            <p className="text-red-600 mb-4">{errors.firstName[0]}</p>
          )}

          <div className="mb-4">
            <label htmlFor="lastName" className="block mb-1 font-medium">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
              defaultValue={defaultValues.lastName}
              onChange={handleInputChange}
            />
          </div>
          {errors?.lastName && (
            <p className="text-red-600 mb-4">{errors.lastName[0]}</p>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
              defaultValue={defaultValues.email}
              onChange={handleInputChange}
            />
          </div>
          {errors?.email && (
            <p className="text-red-600 mb-4">{errors.email[0]}</p>
          )}

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
              defaultValue={defaultValues.password}
              onChange={handleInputChange}
            />
          </div>
          {errors?.password && (
            <p className="text-red-600 mb-4">{errors.password[0]}</p>
          )}

          <div className="mb-6">
            <label htmlFor="retypePassword" className="block mb-1 font-medium">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="retypePassword"
              id="retypePassword"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
              defaultValue={defaultValues.retypePassword}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center gap-2 mt-4">
            <input
              className="w-4 h-4"
              type="checkbox"
              name="showPassword"
              id="showPassword"
              checked={showPassword}
              onChange={handleShowPassword}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-4"
          >
            Register
          </button>
        </form>
        <div className="">
          <p>
            Ai deja cont? Click{" "}
            <NavLink
              className="text-blue-600 hover:cursor-pointer md:text-center"
              to="/login"
            >
              AICI
            </NavLink>{" "}
            pentru a intra in cont.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
