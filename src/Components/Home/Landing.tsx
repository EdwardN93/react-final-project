import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Car, ColProp } from "../Types/Types";
import { motion } from "framer-motion";
import { compareDates } from "../functions/getDate";

export default function Landing() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [sorter, setSorter] = useState<boolean>(false);
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    if (token) {
      fetchCars(token);
    }
  }, [location]);

  async function fetchCars(token: string) {
    try {
      const response = await fetch("http://localhost:3000/vehicles", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    }
  }

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
    return <td className="p-2 border text-center">{carDetail}</td>;
  }

  if (!token) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Please log in to view the vehicle list.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="table_component overflow-auto mb-16"
        role="region"
        tabIndex={0}
      >
        <table className="min-w-full border border-gray-300">
          <caption className="caption-top font-bold text-lg mb-8">
            All Company Cars
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
                  onChange={(e) => handleFilterChange("status", e.target.value)}
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
                const urgent = car?.nextRevDate
                  ? compareDates(car.nextRevDate) <= 30
                  : false;

                return (
                  <tr
                    key={car.id}
                    className={
                      urgent
                        ? `bg-red-300 hover:bg-red-200 hover:cursor-pointer`
                        : "hover:bg-sky-300 hover:cursor-pointer"
                    }
                    onClick={() => navigate(`/vehicles/${car.id}`)}
                  >
                    <TableCol carDetail={car.id} />
                    {Object.keys(filters).map((field) => (
                      <TableCol
                        key={field}
                        carDetail={car[field as keyof Car]}
                      />
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
