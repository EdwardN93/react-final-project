import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Car } from "../Types/Types";
import { motion } from "framer-motion";
import { intlDate, compareDates } from "../functions/getDate";

export default function VehicleDetails() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getCarFromApi(id: string) {
      const url = `http://localhost:3000/vehicles/${id}`;

      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();
      setCar(data);
    }
    if (token && token) getCarFromApi(id!);
  }, [id, token]);

  if (!token) return <div className="p-6 text-red-600">Please log in.</div>;
  if (!car) return <div className="p-6">Loading car data...</div>;

  const carDetails = [
    { label: "Brand", value: car.carBrand },
    { label: "Model", value: car.carName },
    { label: "VIN", value: car.vinNumber },
    { label: "Combustibil", value: car.fuelType },
    { label: "Capacitate Motor", value: `${car.engineCapacity} cmc` },
    { label: "Categorie", value: car.category },
    { label: "Departament", value: car.department },
    { label: "Utilizator", value: car.user },
    { label: "Status", value: car.status },
    {
      label: "Data următoarei revizii",
      value: intlDate(car?.nextRevDate ? car.nextRevDate : ""),
    },
    {
      label: "Timp rămas până la revizie (zile)",
      value: compareDates(car?.nextRevDate ? car.nextRevDate : ""),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">
          Vehicle Details - {car.plateNumber}
        </h2>
        <ul className="space-y-2">
          {carDetails.map(({ label, value }) => {
            const revizie = label === "Timp rămas până la revizie (zile)";
            const isUrgent =
              revizie && typeof value === "number" && value <= 30;
            return (
              <li
                key={label}
                className={isUrgent ? "text-red-600 font-semibold" : ""}
              >
                <strong>{label}:</strong> {value}
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}
