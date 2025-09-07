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
  hasVignette: z.string().min(1, "Adaugă vignetă"),
  vignetteEnd: z.string().min(1, "Selectează data de expirare a vignetei"),
});

const initialDefaultValues = {
  hasVignette: "",
  vignetteEnd: "",
};

export function AddVignette() {
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

    const newVignette = {
      hasVignette: values.hasVignette.toString().trim(),
      vignetteEnd: new Date(values.vignetteEnd?.toString() || ""),
    };

    const updatedCar = {
      ...car,
      vignette: [...(car.vignette || []), newVignette],
    };

    const data = await fetch(`${apiUrl}/vehicles/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedCar),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json() as Promise<AuthResponse>);

    toast.success("Vignetă adăugată cu succes !");
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
      <div className="flex justify-center items-center min-h-screen px-4 flex-col">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(new FormData(e.currentTarget));
          }}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
          noValidate
        >
          <div className="mb-4">
            <h2 className="font-medium text-xl mb-4 text-center">
              Date Vigneta
            </h2>

            <div className="mb-4">
              <label htmlFor="hasVignette" className="block mb-1 font-medium">
                Vignetă disponibilă ?<span className="text-red-600">*</span>
              </label>
              <select
                name="hasVignette"
                id="hasVignette"
                className="p-2 rounded hover:cursor-pointer border"
                required
              >
                <option value="true">Da</option>
                <option value="false">Nu</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="vignetteEnd" className="block mb-1 font-medium">
                Expiră la:<span className="text-red-600">*</span>
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                type="date"
                name="vignetteEnd"
                id="vignetteEnd"
                placeholder="Utilizator"
                onChange={handleInputChange}
              />
              {errors?.vignetteEnd && (
                <p className="text-red-600 mb-4">{errors.vignetteEnd[0]}</p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button text="Adaugă vignetă" width />
            <Button text="Anulează" color="red" width onClick={handleDiscard} />
          </div>
        </form>
      </div>
    </motion.div>
  );
}
