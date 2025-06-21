import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Car } from "../Types/Types";
import { motion } from "framer-motion";
import { intlDate, compareDates } from "../functions/getDate";
import { useAuthContext } from "../routes/auth/AuthContext";
import { NotLoggedIn } from "../NotLoggedIn/NotLoggedIn";

const apiUrl = import.meta.env.VITE_API_URL;

export default function VehicleDetails() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const { accessToken } = useAuthContext();

  useEffect(() => {
    async function getCarFromApi(id: string) {
      const url = `${apiUrl}/vehicles/${id}`;

      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error("Error fetching car:", error);
      }
    }

    if (id && accessToken) {
      getCarFromApi(id);
    }
  }, [id, accessToken]);

  if (!accessToken) {
    return <div className="p-6 text-red-600">Please log in</div>;
  }

  if (!car) {
    return <div className="p-6">Loading car data...</div>;
  }

  const carDetails = [
    { label: "Marcă", value: car.carBrand },
    { label: "Model", value: car.carName },
    { label: "Serie șasiu", value: car.vinNumber },
    { label: "Combustibil", value: car.fuelType },
    { label: "Capacitate motor", value: `${car.engineCapacity} cmc` },
    { label: "Categorie", value: car.category },
    { label: "Departament", value: car.department },
    { label: "Utilizator", value: car.user },
    { label: "Status", value: car.status },
    { label: "Kilometri", value: car.kilometers },
    {
      label: "Data următoarei revizii",
      value: intlDate(car.nextRevDate || ""),
    },
    {
      label: "Zile rămase până la revizie",
      value: compareDates(car.nextRevDate || ""),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!accessToken ? (
        <NotLoggedIn />
      ) : (
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 grid grid-cols-3 col-span-2">
            Detalii Vehicul - {car.plateNumber}
          </h2>
          <ul className="space-y-2">
            {carDetails.map(({ label, value }) => {
              const isRevision = label === "Zile rămase până la revizie";
              const isUrgent =
                isRevision && typeof value === "number" && value <= 30;
              const pastRevision =
                isRevision && typeof value === "number" && value < 0;

              return (
                <li
                  key={label}
                  className={
                    isUrgent
                      ? "text-red-600 font-semibold grid sm:grid-cols-3 grid-cols-1"
                      : "grid sm:grid-cols-3 grid-cols-1"
                  }
                >
                  <strong>
                    {pastRevision
                      ? `Zile întârziere în efectuarea reviziei`
                      : label}
                    :
                  </strong>{" "}
                  {pastRevision ? -value : value}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
