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
  intervention: z.string().min(1, "Adaugă intervenție"),
  cost: z.string().min(2, "Adaugă costul reparației"),
  repairAtKm: z
    .string()
    .min(1, "Adaugă numarul de kilometri la momentul reparației"),
});

const initialDefaultValues = {
  intervention: "",
  cost: "",
  repairAtKm: "",
};

export default function AddRepairs() {
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

    const newRepair = {
      intervention: values.intervention,
      cost: values.cost,
      repairAtKm: String(values.repairAtKm).replace(".", ","),
    };

    const updatedCar = {
      ...car,
      repairs: [...(car.repairs || []), newRepair],
    };

    const data = await fetch(`${apiUrl}/vehicles/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedCar),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json() as Promise<AuthResponse>);

    toast.success("Reparație adăugată cu succes !");
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
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Intervenție
          </h2>

          <div className="mb-4">
            <label htmlFor="intervention" className="block mb-1 font-medium">
              Intervenție
            </label>
            <input
              type="text"
              id="intervention"
              name="intervention"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
              defaultValue={defaultValues.intervention}
              onChange={handleInputChange}
              placeholder="Ex. Schimb placuțe de frână"
            />
            {errors?.intervention && (
              <p className="text-red-600 mb-4">{errors.intervention[0]}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="cost" className="block mb-1 font-medium">
              Cost
            </label>
            <input
              type="number"
              id="cost"
              name="cost"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="1001"
              defaultValue={defaultValues.cost}
              onChange={handleInputChange}
            />
            {errors?.cost && (
              <p className="text-red-600 mb-4">{errors.cost[0]}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="repairAtKm" className="block mb-1 font-medium">
              Kilometri la momentul reparatiei / interventiei
            </label>
            <input
              type="text"
              id="repairAtKm"
              name="repairAtKm"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="100,4"
              defaultValue={defaultValues.repairAtKm}
              onChange={handleInputChange}
            />
            {errors?.repairAtKm && (
              <p className="text-red-600 mb-4">{errors.repairAtKm[0]}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button text="Adaugă reparație" width />
            <Button text="Anulează" color="red" width onClick={handleDiscard} />
          </div>
        </form>
      </div>
    </motion.div>
  );
}
