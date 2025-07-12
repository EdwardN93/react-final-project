import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Car } from "../Types/Types";
import { motion } from "framer-motion";
import { intlDate, compareDates } from "../functions/getDate";
import { useAuthContext } from "../routes/auth/AuthContext";
import { NotLoggedIn } from "../NotLoggedIn/NotLoggedIn";
import { literal } from "zod/v4";

const apiUrl = import.meta.env.VITE_API_URL;

export default function VehicleDetails() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>();
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
        <div className="p-6 max-w-6xl mx-auto space-y-10">
          <h2 className="text-3xl font-bold border-b pb-4">
            Vehicul: {car.plateNumber}
          </h2>

          {/* Car Details Section */}
          <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
            <h3 className="text-2xl font-semibold mb-4 text-blue-800">
              Date Tehnice
            </h3>
            <dl className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              {carDetails.map(({ label, value }) => {
                const isRevision = label === "Zile rămase până la revizie";
                const isUrgent =
                  isRevision && typeof value === "number" && value <= 30;
                const pastRevision =
                  isRevision && typeof value === "number" && value < 0;

                return (
                  <div key={label} className="flex flex-col">
                    <dt className="text-gray-800 font-medium">
                      {pastRevision
                        ? "Zile întârziere în efectuarea reviziei"
                        : label}
                    </dt>
                    <dd
                      className={`${
                        isUrgent
                          ? "text-red-600 font-semibold"
                          : "text-gray-800"
                      }`}
                    >
                      {pastRevision ? -value : value}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </section>

          {/* Repairs Section */}
          <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
            <h3 className="text-2xl font-semibold mb-4 text-blue-800">
              Intervenții & Costuri
            </h3>
            {car.repairs && car.repairs.length > 0 ? (
              <ul className="space-y-3">
                {car.repairs.map((repair, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-3 border-b pb-2 text-sm"
                  >
                    <span className="text-gray-700">{repair.intervention}</span>
                    <span className="text-gray-700 text-center">
                      Kilometri: {repair.repairAtKm}
                    </span>
                    <span className="text-gray-900 font-semibold text-right">
                      {Number(repair.cost).toLocaleString()} RON
                    </span>
                  </li>
                ))}
                <div className="w-full text-right">
                  <span className="text-gray-900 font-semibold">
                    Total costuri:{" "}
                    {car.repairs
                      .reduce((acc, val) => acc + Number(val.cost), 0)
                      .toLocaleString()}{" "}
                    RON
                  </span>
                </div>
              </ul>
            ) : (
              <p className="text-gray-500 text-sm italic">Nicio intervenție.</p>
            )}
          </section>
        </div>
      )}
    </motion.div>
  );
}
