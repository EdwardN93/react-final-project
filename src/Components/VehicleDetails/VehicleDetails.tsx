import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Car } from "../Types/Types";
import { motion } from "framer-motion";

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
          <li>
            <strong>Brand:</strong> {car.carBrand}
          </li>
          <li>
            <strong>Model:</strong> {car.carName}
          </li>
          <li>
            <strong>VIN:</strong> {car.vinNumber}
          </li>
          <li>
            <strong>Combustibil:</strong> {car.fuelType}
          </li>
          <li>
            <strong>Capacitate Motor:</strong> {car.engineCapacity} cmc
          </li>
          <li>
            <strong>Categorie:</strong> {car.category}
          </li>
          <li>
            <strong>Departament:</strong> {car.department}
          </li>
          <li>
            <strong>Utilizator:</strong> {car.user}
          </li>
          <li>
            <strong>Status:</strong> {car.status}
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
