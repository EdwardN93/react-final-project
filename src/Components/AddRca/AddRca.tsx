import { useNavigate, useParams } from "react-router";
import { useAuthContext } from "../routes/auth/AuthContext";
import { useEffect, useState } from "react";
import { AuthResponse, Car } from "../Types/Types";
import { Button } from "../Button/Button";
import { motion } from "framer-motion";
import { z } from "zod/v4";
import { toast } from "react-toastify";
import { validateForm, ValidationErrors } from "../utils/validation";

const apiUrl = import.meta.env.VITE_API_URL;

const validationSchema = z.object({
  rcaInsurer: z.string().min(1, "Introdu numele companiei de asigurări"),
  rcaSerie: z.string().min(1, "Introdu seria poliței RCA"),
  rcaNumber: z.string().min(1, "Introdu numărul poliței RCA"),
  rcaCost: z.string().min(1, "Introdu prețul poliței RCA (în RON)"),
  rcaStart: z.string().min(1, "Selectează perioada de valabilitate"),
  rcaEnd: z.string().min(1, "Selectează perioada de valabilitate"),
});

const initialDefaultValues = {
  rcaInsurer: "",
  rcaSerie: "",
  rcaNumber: "",
  rcaCost: "",
  rcaStart: "",
  rcaEnd: "",
};

export function AddRca() {
  const [errors, setErrors] = useState<null | ValidationErrors<
    typeof validationSchema
  >>(null);
  const [defaultValues, setDefaultValues] = useState(initialDefaultValues);

  const { accessToken } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState<Car>({});

  useEffect(() => {
    fetch(`${apiUrl}/vehicles/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((data) => {
        try {
          if (!data.ok) throw new Error(`Status error: ${data.status}`);
          return data.json();
        } catch (err) {
          console.log(err);
        }
      })
      .then((data) => setCar(data));
  }, []);

  async function handleSubmit(formData: FormData) {
    const values = Object.fromEntries(formData.entries());
    const errors = validateForm(values, validationSchema);

    if (errors) {
      setErrors(errors);
      setDefaultValues(values as typeof defaultValues);
      return;
    }

    setErrors(null);
    setDefaultValues(initialDefaultValues);

    const newRcaDetails = {
      rcaInsurer: values.rcaInsurer.toString().toUpperCase().trim(),
      rcaSerie: values.rcaSerie.toString().toUpperCase().trim(),
      rcaNumber: values.rcaNumber.toString().trim(),
      rcaCost: values.rcaCost.toString().trim(),
      rcaStart: new Date(values.rcaStart?.toString() || ""),
      rcaEnd: new Date(values.rcaEnd?.toString() || ""),
      createdAt: new Date().toISOString(),
    };

    const updatedCar = {
      ...car,
      rca: [...(car.rca || []), newRcaDetails],
    };

    const data = await fetch(`${apiUrl}/vehicles/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedCar),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json() as Promise<AuthResponse>);

    toast.success("Poliță RCA adăugată cu succes !");
    navigate(-1);
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

  function handleDiscard() {
    navigate(-1);
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
            handleSubmit(new FormData(e.currentTarget));
          }}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mb-10"
          noValidate
        >
          <h2 className="font-medium text-xl mb-4 text-center">
            Date asigurare RCA
          </h2>

          <div className="mb-4 pb-2 border-b">
            <div className="mb-4">
              <label htmlFor="rcaInsurer" className="block mb-1 font-medium">
                Asigurator<span className="text-red-600">*</span>
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                type="text"
                name="rcaInsurer"
                id="rcaInsurer"
                placeholder="Groupama"
                onChange={handleInputChange}
              />
              {errors?.rcaInsurer && (
                <p className="text-red-600 mb-4">{errors.rcaInsurer[0]}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="rcaSerie" className="block mb-1 font-medium">
                Serie<span className="text-red-600">*</span>
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                type="text"
                name="rcaSerie"
                id="rcaSerie"
                placeholder="RO/25/C25/HP"
                onChange={handleInputChange}
              />
              {errors?.rcaSerie && (
                <p className="text-red-600 mb-4">{errors.rcaSerie[0]}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="rcaNumber" className="block mb-1 font-medium">
                Număr<span className="text-red-600">*</span>
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                type="text"
                name="rcaNumber"
                id="rcaNumber"
                placeholder="12345"
                onChange={handleInputChange}
              />
              {errors?.rcaNumber && (
                <p className="text-red-600 mb-4">{errors.rcaNumber[0]}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="rcaCost" className="block mb-1 font-medium">
                Costul poliței (în RON)<span className="text-red-600">*</span>
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                type="text"
                name="rcaCost"
                id="rcaCost"
                placeholder="12345"
                onChange={handleInputChange}
              />
              {errors?.rcaCost && (
                <p className="text-red-600 mb-4">{errors.rcaCost[0]}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="rcaStart" className="block mb-1 font-medium">
                Valabilitate de la:<span className="text-red-600">*</span>
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                type="date"
                name="rcaStart"
                id="rcaStart"
                placeholder="Utilizator"
                onChange={handleInputChange}
              />
              {errors?.rcaStart && (
                <p className="text-red-600 mb-4">{errors.rcaStart[0]}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="rcaEnd" className="block mb-1 font-medium">
                Valabilitate până la:<span className="text-red-600">*</span>
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                type="date"
                name="rcaEnd"
                id="rcaEnd"
                placeholder="Utilizator"
                onChange={handleInputChange}
              />
              {errors?.rcaEnd && (
                <p className="text-red-600 mb-4">{errors.rcaEnd[0]}</p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button text="Adaugă poliță" width />
            <Button text="Anulează" color="red" width onClick={handleDiscard} />
          </div>
        </form>
      </div>
    </motion.div>
  );
}
