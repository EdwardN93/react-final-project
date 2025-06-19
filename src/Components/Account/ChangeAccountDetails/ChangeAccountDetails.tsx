import { FormEvent, useEffect, useState } from "react";
import { getCurrentUser, getAccessToken } from "../../routes/auth/Login/utils";
import { Button } from "../../Button/Button";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { User } from "../../Types/Types";
import { z, ZodObject } from "zod/v4";

const apiUrl = import.meta.env.VITE_API_URL;

const initialDefaultValues = {
  firstName: getCurrentUser()?.firstName ? getCurrentUser()?.firstName : "",
  lastName: getCurrentUser()?.lastName ? getCurrentUser()?.lastName : "",
  email: getCurrentUser()?.email ? getCurrentUser().email : "",
  password: "",
  retypePassword: "",
};

const validationSchema = z
  .object({
    firstName: z.string().min(1, "Please tell us your name"),
    lastName: z.string().min(1, "Please tell us your last name"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must contain at least 6 characters"),
    retypePassword: z
      .string()
      .min(6, "Password must contain at least 6 characters"),
  })
  .refine((data) => data.password === data.retypePassword, {
    message: "Passwords don't match",
    path: ["retypePassword"],
  })
  .refine((data) => data.email === getCurrentUser().email, {
    message: "Email is incorrect",
    path: ["email"],
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

// type SchemaObject = z.infer<typeof validationSchema>;
// type ErrorObject = Record<keyof SchemaObject, string[]>;
// type Errors = Partial<ErrorObject>;

type Errors = Partial<Record<keyof z.infer<typeof validationSchema>, string[]>>;

export function ChangeAccountDetails() {
  const [errors, setErrors] = useState<null | Errors>(null);
  const [getUser, setGetUser] = useState<null | User>();
  const [defaultValues, setDefaultValues] = useState(initialDefaultValues);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function handleAccountChange(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formDetails = Object.fromEntries(formData.entries());
    const newErrors = validateForm(formDetails, validationSchema);

    if (newErrors) {
      setErrors(newErrors);
      return;
    }
    setDefaultValues(formDetails as typeof defaultValues);
    setErrors(null);

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

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!errors) return;

    const formValues = new FormData(e.target.form!);
    const newErrors = validateForm(
      Object.fromEntries(formValues),
      validationSchema
    );

    setErrors(newErrors);
  }

  function discardChanges() {
    navigate("/account");
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
    console.log(showPassword);
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
          onSubmit={handleAccountChange}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mb-10"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Schimbă date cont
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
              defaultValue={defaultValues.firstName}
              onChange={handleInputChange}
            />
          </div>
          {errors?.firstName && (
            <p className="text-red-600 mb-4">{errors.firstName[0]}</p>
          )}
          <div className="mb-4">
            <label htmlFor="lastName" className="block mb-1 font-medium">
              Change Last Name
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
              id="retypePassword"
              name="retypePassword"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
              defaultValue={defaultValues.retypePassword}
              onChange={handleInputChange}
            />
          </div>
          {errors?.retypePassword && (
            <p className="text-red-600 mb-4">{errors.retypePassword[0]}</p>
          )}
          <div className="flex flex-row gap-2">
            <Button
              text="Anulează"
              color="red"
              width
              onClick={discardChanges}
            />
            <Button text="Confirmă" width />
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
        </form>
      </div>
    </motion.div>
  );
}
