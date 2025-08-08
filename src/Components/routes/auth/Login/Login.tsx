import { NavLink, useNavigate } from "react-router";
import { z } from "zod/v4";
import { motion } from "framer-motion";
import { useAuthContext } from "../AuthContext";
import { validateForm, ValidationErrors } from "../../../utils/validation";
import { useRedirectWhenLoggedIn } from "../useRedirectWhenLogIn";
import { useState } from "react";
import { AuthResponse } from "../../../Types/Types";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

const validationSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, "Your password should be at least 6 characters long."),
});

const initialDefaultValues = {
  email: "",
  password: "",
};
export function Login() {
  const [errors, setErrors] = useState<null | ValidationErrors<
    typeof validationSchema
  >>(null);
  const [defaultValues, setDefaultValues] = useState(initialDefaultValues);

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
    console.log(newErrors);

    setErrors(newErrors);
  }

  async function handleLogin(formData: FormData) {
    const values = Object.fromEntries(formData.entries());
    const errors = validateForm(values, validationSchema);

    if (errors) {
      setErrors(errors);
      setDefaultValues(values as typeof defaultValues);
      return;
    }

    setErrors(null);
    setDefaultValues(initialDefaultValues);

    const data = await fetch(`${apiUrl}/login`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-type": "application/json" },
    }).then((res) => res.json() as Promise<AuthResponse>);

    login(data);
    toast.success("Te-ai logat cu succes!");
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
            handleLogin(new FormData(e.currentTarget));
          }}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mb-10"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Log In</h2>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border rounded px-3 py-2"
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
              type="password"
              id="password"
              name="password"
              className="w-full border rounded px-3 py-2"
              onChange={handleInputChange}
            />
          </div>
          {errors?.password && (
            <p className="text-red-600 mb-4">{errors.password[0]}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>
        <div className="">
          <p>
            Nu ai cont? Înregistrează-te{" "}
            <NavLink
              className="text-blue-600 hover:cursor-pointer hover:text-red-600 active:text-red-700 md:text-center duration-200"
              to="/register"
            >
              AICI
            </NavLink>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
