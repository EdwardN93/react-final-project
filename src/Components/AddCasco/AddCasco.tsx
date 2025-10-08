import { useNavigate, useParams } from "react-router";
import { useAuthContext } from "../routes/auth/AuthContext";
import { useEffect, useState } from "react";
import { AuthResponse, Car } from "../Types/Types";
import { Button } from "../Button/Button";
import { motion } from "framer-motion";
import { z } from "zod/v4";
import { toast } from "react-toastify";
import { validateForm, ValidationErrors } from "../utils/validation";
import { toStringToUpperCaseTrim } from "../utils/helperFunctions";

const apiUrl = import.meta.env.VITE_API_URL;

const validationSchema = z.object({
  cascoInsurer: z.string().min(1, "Introdu numele companiei de asigurări"),
  cascoSerie: z.string().min(1, "Introdu seria poliței CASCO"),
  cascoNumber: z.string().min(1, "Introdu numarul poliței CACSO"),
  cascoCost: z.string().min(1, "Introdu prețul poliței CASCO (în RON)"),
  cascoStart: z.string().min(1, "Selectează perioada de valabilitate"),
  cascoEnd: z.string().min(1, "Selectează perioada de valabilitate"),
});

const initialDefaultValues = {
  cascoInsurer: "",
  cascoSerie: "",
  cascoNumber: "",
  cascoCost: "",
  cascoStart: "",
  cascoEnd: "",
};

export function AddCasco() {
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

    const newCascoDetails = {
      cascoInsurer: toStringToUpperCaseTrim(values.cascoInsurer),
      cascoSerie: toStringToUpperCaseTrim(values.cascoSerie),
      cascoNumber: toStringToUpperCaseTrim(values.cascoNumber),
      cascoCost: values.cascoCost.toString().trim(),
      cascoStart: new Date(values.cascoStart?.toString() || ""),
      cascoEnd: new Date(values.cascoEnd?.toString() || ""),
      createdAt: new Date().toISOString(),
    };

    const updatedCar = {
      ...car,
      casco: [...(car.casco || []), newCascoDetails],
    };

    const data = await fetch(`${apiUrl}/vehicles/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedCar),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json() as Promise<AuthResponse>);

    toast.success("Poliță CASCO adăugată cu succes !");
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
            Date asigurare CASCO
          </h2>

          <div className="mb-4">
            <div className="mb-4">
              <label htmlFor="cascoInsurer" className="block mb-1 font-medium">
                Asigurator<span className="text-red-600">*</span>
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                type="text"
                name="cascoInsurer"
                id="cascoInsurer"
                placeholder="OMNIASIG"
                onChange={handleInputChange}
              />
              {errors?.cascoInsurer && (
                <p className="text-red-600 mb-4">{errors.cascoInsurer[0]}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="cascoSerie" className="block mb-1 font-medium">
                Serie<span className="text-red-600">*</span>
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                type="text"
                name="cascoSerie"
                id="cascoSerie"
                placeholder="C"
                onChange={handleInputChange}
              />
              {errors?.cascoSerie && (
                <p className="text-red-600 mb-4">{errors.cascoSerie[0]}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="cascoNumber" className="block mb-1 font-medium">
                Număr<span className="text-red-600">*</span>
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                type="text"
                name="cascoNumber"
                id="cascoNumber"
                placeholder="C12345"
                onChange={handleInputChange}
              />
              {errors?.cascoNumber && (
                <p className="text-red-600 mb-4">{errors.cascoNumber[0]}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="cascoCost" className="block mb-1 font-medium">
                Costul poliței (în RON)<span className="text-red-600">*</span>
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                type="text"
                name="cascoCost"
                id="cascoCost"
                placeholder="C12345"
                onChange={handleInputChange}
              />
              {errors?.cascoCost && (
                <p className="text-red-600 mb-4">{errors.cascoCost[0]}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="cascoStart" className="block mb-1 font-medium">
                Valabilitate de la:<span className="text-red-600">*</span>
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                type="date"
                name="cascoStart"
                id="cascoStart"
                placeholder="Utilizator"
                onChange={handleInputChange}
              />
              {errors?.cascoStart && (
                <p className="text-red-600 mb-4">{errors.cascoStart[0]}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="cascoEnd" className="block mb-1 font-medium">
                Valabilitate până la:<span className="text-red-600">*</span>
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                type="date"
                name="cascoEnd"
                id="cascoEnd"
                placeholder="Utilizator"
                onChange={handleInputChange}
              />
              {errors?.cascoEnd && (
                <p className="text-red-600 mb-4">{errors.cascoEnd[0]}</p>
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
