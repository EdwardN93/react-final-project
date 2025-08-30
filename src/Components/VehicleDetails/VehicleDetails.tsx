import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router";
import { Car } from "../Types/Types";
import { motion } from "framer-motion";
import { intlDate, compareDates } from "../functions/getDate";
import { useAuthContext } from "../routes/auth/AuthContext";
import { NotLoggedIn } from "../NotLoggedIn/NotLoggedIn";
import { Button } from "../Button/Button";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export function VehicleDetails() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>();
  const { accessToken } = useAuthContext();
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

  const latestRca = car.rca?.[car.rca.length - 1];
  const latestCasco = car.casco?.[car.casco.length - 1];
  const latestVignette = car.vignette?.[car.vignette.length - 1];

  const assuranceDetails = [
    { label: "Asigurator", value: latestRca?.rcaInsurer || "-" },
    { label: "Serie asigurare", value: latestRca?.rcaSerie || "-" },
    { label: "Număr asigurare", value: latestRca?.rcaNumber || "-" },
    {
      label: "Data începerii asigurării",
      value: latestRca?.rcaStart ? intlDate(latestRca.rcaStart) : "-",
    },
    {
      label: "Data expirării asigurării",
      value: latestRca?.rcaEnd ? intlDate(latestRca.rcaEnd) : "-",
    },
  ];

  const cascoAssuranceDetails = [
    { label: "Asigurator", value: latestCasco?.cascoInsurer || "-" },
    { label: "Serie asigurare", value: latestCasco?.cascoSerie || "-" },
    { label: "Număr asigurare", value: latestCasco?.cascoNumber || "-" },
    {
      label: "Data începerii asigurării",
      value: latestCasco?.cascoStart ? intlDate(latestCasco.cascoStart) : "-",
    },
    {
      label: "Data expirării asigurării",
      value: latestCasco?.cascoEnd ? intlDate(latestCasco.cascoEnd) : "-",
    },
  ];

  const vignetteDetails = [
    {
      label: "Rovinietă",
      value:
        latestVignette?.hasVignette == "true"
          ? "Valabilă"
          : "Nu există rovinietă",
    },
    {
      label: "Data expirare",
      value: latestVignette?.vignetteEnd
        ? intlDate(latestVignette?.vignetteEnd)
        : "-",
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

              {/* Repairs Section */}
              <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
                <h3 className="text-2xl font-semibold mb-4 text-blue-800">
                  Intervenții & Costuri
                </h3>
                {car.repairs && car.repairs.length > 0 ? (
                  <ul className="space-y-3">
                    {car.repairs.map((repair) => (
                      <li
                        id={repair.createdAt}
                        key={repair.createdAt}
                        className="grid grid-cols-4 border-b pb-2 text-sm justify-start items-center"
                      >
                        <span className="text-gray-700">
                          {repair.intervention}
                        </span>
                        <span className="text-gray-700 text-center">
                          Kilometri:{" "}
                          {Number(repair.repairAtKm).toLocaleString()}
                        </span>
                        <span className="text-gray-900 font-semibold text-right">
                          {Number(repair.cost).toLocaleString()} RON
                        </span>
                        <span className="text-right">
                          <Button
                            text="X"
                            onClick={() =>
                              handleDeleteIntervention(repair.createdAt)
                            }
                          />
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
                  <p className="text-gray-500 text-sm italic">
                    Nicio intervenție.
                  </p>
                )}
              </section>
            </div>
          )}

          {activeTab === "rca" && (
            <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 m-y-10">
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">
                Detalii RCA
              </h3>
              <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                {cascoAssuranceDetails.map(({ label, value }) => (
                  <div key={label} className="flex flex-col">
                    <dt className="text-gray-800 font-medium">{label}</dt>
                    <dd className="text-gray-800">{value || "-"}</dd>
                  </div>
                ))}
              </ul>
            </section>
          )}

          {activeTab === "casco" && (
            <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 m-y-10">
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">
                Detalii CASCO
              </h3>
              <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                {assuranceDetails.map(({ label, value }) => (
                  <div key={label} className="flex flex-col">
                    <dt className="text-gray-800 font-medium">{label}</dt>
                    <dd className="text-gray-800">{value || "-"}</dd>
                  </div>
                ))}
              </ul>
            </section>
          )}

          {activeTab === "vigneta" && (
            <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 m-y-10">
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">
                Detalii CASCO
              </h3>
              <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                {vignetteDetails.map(({ label, value }) => (
                  <div key={label} className="flex flex-col">
                    <dt className="text-gray-800 font-medium">{label}</dt>
                    <dd className="text-gray-800">{value || "-"}</dd>
                  </div>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </motion.div>
  );
}
