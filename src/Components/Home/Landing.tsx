import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Car, ColProp } from "../Types/Types";
import { motion } from "framer-motion";
import { compareDates, intlDate } from "../functions/getDate";
import { useAuthContext } from "../routes/auth/AuthContext";
import { NotLoggedIn } from "../NotLoggedIn/NotLoggedIn";
import { Pagination } from "../utils/Pagination";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export function Landing() {
  const [limitPerPage, setLimitPerPage] = useState(5);
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [sorter, setSorter] = useState<boolean>(false);
  const { accessToken } = useAuthContext();
  const [filters, setFilters] = useState({
    plateNumber: "",
    carBrand: "",
    carName: "",
    vinNumber: "",
    fuelType: "",
    engineCapacity: "",
    category: "",
    department: "",
    user: "",
    status: "",
  });

  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    text: string;
  }>({ visible: false, x: 0, y: 0, text: "" });

  const [totalCount, setTotalCount] = useState(0);
  const [params] = useSearchParams();
  // const page = Number(params.get("page") || 1);
  const [page, setPage] = useState(Number(params.get("page") || 1));

  useEffect(() => {
    async function fetchCars(token: string) {
      try {
        const response = await fetch(
          `${apiUrl}/vehicles?_page=${page}&_limit=${limitPerPage}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        setTotalCount(Number(response.headers.get("X-Total-Count")));
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    }
    if (accessToken) {
      fetchCars(accessToken);
    }
  }, [page, limitPerPage]);

  function sortAscDescId(sorter: boolean) {
    const sorted = [...cars].sort((a, b) =>
      sorter ? a.id! - b.id! : b.id! - a.id!
    );
    setCars(sorted);
  }

  function handleFilterChange(field: string, value: string) {
    setFilters({ ...filters, [field]: value });
  }

  const filteredCars = cars.filter((car) =>
    Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      const carValue = car[key as keyof typeof car];
      return carValue?.toString().toLowerCase().includes(value.toLowerCase());
    })
  );

  function TableCol({ carDetail }: ColProp) {
    const displayValue =
      carDetail instanceof Date
        ? carDetail.toLocaleDateString()
        : carDetail ?? "";
    return <td className="p-2 border text-center">{displayValue}</td>;
  }

  function handlePageLimit(limit: number) {
    setLimitPerPage(limit);
  }

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
        <div
          className="table_component overflow-auto mb-16"
          role="region"
          tabIndex={0}
        >
          <table className="min-w-full border border-gray-300">
            <caption className="caption-top font-bold text-lg mb-8">
              Afișare mașini
            </caption>
            <thead className="bg-gray-200">
              <tr>
                <th
                  className="p-2 border hover:cursor-pointer"
                  onClick={() => {
                    setSorter(!sorter);
                    sortAscDescId(sorter);
                  }}
                >
                  ID {sorter ? "↓" : "↑"}
                </th>
                <th className="p-2 border">Numar Inmatriculare</th>
                <th className="p-2 border">Marca</th>
                <th className="p-2 border">Model</th>
                <th className="p-2 border">Serie Sasiu</th>
                <th className="p-2 border">Combustibil</th>
                <th className="p-2 border">Capacitate Motor</th>
                <th className="p-2 border">Categorie</th>
                <th className="p-2 border">Department</th>
                <th className="p-2 border">Utilizator</th>
                <th className="p-2 border">Status</th>
              </tr>
              {/* START INPUTS FOR SEARCH FILTERS */}
              <tr>
                <td className="p-2 border" />
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1"
                    value={filters.plateNumber}
                    onChange={(e) =>
                      handleFilterChange("plateNumber", e.target.value)
                    }
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1"
                    value={filters.carBrand}
                    onChange={(e) =>
                      handleFilterChange("carBrand", e.target.value)
                    }
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1"
                    value={filters.carName}
                    onChange={(e) =>
                      handleFilterChange("carName", e.target.value)
                    }
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1"
                    value={filters.vinNumber}
                    onChange={(e) =>
                      handleFilterChange("vinNumber", e.target.value)
                    }
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1"
                    value={filters.fuelType}
                    onChange={(e) =>
                      handleFilterChange("fuelType", e.target.value)
                    }
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="number"
                    className="w-full p-1"
                    value={filters.engineCapacity}
                    onChange={(e) =>
                      handleFilterChange("engineCapacity", e.target.value)
                    }
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1"
                    value={filters.category}
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value)
                    }
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1"
                    value={filters.department}
                    onChange={(e) =>
                      handleFilterChange("department", e.target.value)
                    }
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1"
                    value={filters.user}
                    onChange={(e) => handleFilterChange("user", e.target.value)}
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1"
                    value={filters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                  />
                </td>
              </tr>
              {/* END INPUTS FOR SEARCH FILTERS */}
            </thead>
            <tbody>
              {filteredCars.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center p-4">
                    No vehicles found.
                  </td>
                </tr>
              ) : (
                filteredCars.map((car: Car) => {
                  const isPastDue = compareDates(car.nextRevDate!) < 0;
                  const alert = car?.nextRevDate
                    ? compareDates(car.nextRevDate) <= 30
                    : false;

                  return (
                    <tr
                      key={car.id}
                      className={`hover:cursor-pointer ${
                        isPastDue
                          ? "bg-red-300 hover:bg-red-200 duration-300 transition-all"
                          : alert
                          ? "bg-yellow-300 hover:bg-yellow-200 duration-300 transition-all"
                          : "hover:bg-sky-300 duration-300 transition-all"
                      }`}
                      onClick={() => navigate(`/vehicles/${car.id}`)}
                      onMouseEnter={(e) => {
                        if (isPastDue) {
                          setTooltip({
                            visible: true,
                            x: e.clientX + 20,
                            y: e.clientY - 50,
                            text: "Trecută de data reviziei",
                          });
                        } else if (alert) {
                          setTooltip({
                            visible: true,
                            x: e.clientX + 20,
                            y: e.clientY - 50,
                            text: `Data reviziei: ${intlDate(
                              car.nextRevDate!
                            )}`,
                          });
                        }
                      }}
                      onMouseLeave={() => {
                        setTooltip((prev) => ({ ...prev, visible: false }));
                      }}
                    >
                      <TableCol carDetail={car.id} />
                      {Object.keys(filters).map((field) => {
                        const value = car[field as keyof Car];

                        if (Array.isArray(value))
                          return <TableCol key={field} carDetail="-" />;

                        return (
                          <TableCol
                            key={field}
                            carDetail={
                              value as string | number | Date | null | undefined
                            }
                          />
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          {totalCount && (
            <Pagination
              itemsPerPage={limitPerPage}
              totalCount={totalCount}
              handlePageLimit={handlePageLimit}
              page={page}
              setPage={setPage}
            />
          )}
          {tooltip.visible && (
            <div
              className="fixed px-2 py-1 bg-black text-white text-sm rounded pointer-events-none z-50"
              style={{ top: tooltip.y + 10, left: tooltip.x + 10 }}
            >
              {tooltip.text}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
