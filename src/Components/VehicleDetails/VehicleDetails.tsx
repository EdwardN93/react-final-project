import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Car } from "../Types/Types";
import { motion } from "framer-motion";
import { intlDate, compareDates } from "../functions/getDate";
import { useAuthContext } from "../routes/auth/AuthContext";
import { NotLoggedIn } from "../NotLoggedIn/NotLoggedIn";
import { Button } from "../Button/Button";
import { toast } from "react-toastify";
import { AssuranceDetails } from "./AssuranceDetails";
import { VignetteDetails } from "./VignetteDetails";
import { RepairsDetails } from "./RepairsDetails";

const apiUrl = import.meta.env.VITE_API_URL;

export function VehicleDetails() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>();
  const { user, accessToken } = useAuthContext();
  const [activeTab, setActiveTab] = useState("detalii");

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

  function handleDeleteIntervention(repairId: string) {
    if (!car) return;

    const updatedRepairs = car.repairs!.filter(
      (repair) => repair.createdAt !== repairId
    );

    const updatedCar = { ...car, repairs: updatedRepairs };

    fetch(`${apiUrl}/vehicles/${car.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCar),
    })
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
      })
      .catch((error) => {
        console.error("Error deleting repair:", error);
        toast.error("Eroare la ștergerea intervenției");
      });
  }

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
        <div className="p-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold border-b pb-4">
            Vehicul: {car.plateNumber}
          </h2>

          {/* Car Details Section */}

          <div className="flex items-center justify-center mt-4 gap-4">
            <button
              onClick={() => setActiveTab("detalii")}
              className={`border-b-2 px-5 transition-all duration-300 transform ${
                activeTab === "detalii"
                  ? "text-blue-600 font-bold border-blue-600 scale-110"
                  : "text-gray-600 hover:text-blue-600 border-transparent scale-100"
              }`}
            >
              Detalii Tehnice
            </button>

            <button
              onClick={() => setActiveTab("rca")}
              className={`border-b-2 px-5 transition-all duration-300 transform ${
                activeTab === "rca"
                  ? "text-blue-600 font-bold border-blue-600 scale-110"
                  : "text-gray-600 hover:text-blue-600 border-transparent scale-100"
              }`}
            >
              RCA
            </button>

            <button
              onClick={() => setActiveTab("casco")}
              className={`border-b-2 px-5 transition-all duration-300 transform ${
                activeTab === "casco"
                  ? "text-blue-600 font-bold border-blue-600 scale-110"
                  : "text-gray-600 hover:text-blue-600 border-transparent scale-100"
              }`}
            >
              CASCO
            </button>

            <button
              onClick={() => setActiveTab("vigneta")}
              className={`border-b-2 px-5 transition-all duration-300 transform ${
                activeTab === "vigneta"
                  ? "text-blue-600 font-bold border-blue-600 scale-110"
                  : "text-gray-600 hover:text-blue-600 border-transparent scale-100"
              }`}
            >
              Vignetă
            </button>
          </div>

          {/*Tehnical section*/}
          {activeTab === "detalii" && (
            <div className="space-y-10">
              <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 m-y-10">
                <h3 className="text-2xl font-semibold mb-4 text-blue-800">
                  Date Tehnice
                </h3>
                <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
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
                </ul>
              </section>

              <RepairsDetails car={car} setCar={setCar} />
            </div>
          )}

          {activeTab === "rca" && <AssuranceDetails car={car} type={"rca"} />}

          {activeTab === "casco" && (
            <AssuranceDetails car={car} type={"casco"} />
          )}

          {activeTab === "vigneta" && <VignetteDetails car={car} />}
        </div>
      )}
    </motion.div>
  );
}
