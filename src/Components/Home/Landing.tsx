import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export default function Landing() {
  type Car = {
    id: number;
    plateNumber: string;
    carBrand: string;
    carName: string;
    vinNumber: string;
    fuelType: string;
    engineCapacity: number;
    category: string;
    department: string;
    user: string;
  };

  const location = useLocation();
  const [cars, setCars] = useState<Car[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [sorter, setSorter] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    if (token) {
      fetchCars(token);
    }
  }, [location]);

  async function fetchCars(token: string) {
    try {
      const response = await fetch("http://192.168.1.137:3000/vehicles", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log(data);
      setCars(data);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    }
  }

  function sortAscById(sorter: boolean) {
    const sorted = cars
      .map((item) => item)
      .sort((a: any, b: any) => (sorter ? a.id - b.id : b.id - a.id));
    setCars(sorted);
  }

  if (!token) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Please log in to view the vehicle list.
      </div>
    );
  }

  return (
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
              className="p-2 border"
              onClick={() => {
                setSorter(!sorter);
                sortAscById(sorter);
              }}
            >
              ID {sorter ? "↓" : "↑"}
            </th>
            <th className="p-2 border">Plate Number</th>
            <th className="p-2 border">Brand</th>
            <th className="p-2 border">Model</th>
            <th className="p-2 border">VIN</th>
            <th className="p-2 border">Fuel Type</th>
            <th className="p-2 border">Engine (cc)</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Department</th>
            <th className="p-2 border">Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {cars.length === 0 ? (
            <tr>
              <td colSpan={10} className="text-center p-4">
                No vehicles found.
              </td>
            </tr>
          ) : (
            cars.map((car: any) => (
              <tr key={car.id}>
                <td className="p-2 border">{car.id}</td>
                <td className="p-2 border">{car.plateNumber}</td>
                <td className="p-2 border">{car.carBrand}</td>
                <td className="p-2 border">{car.carName}</td>
                <td className="p-2 border">{car.vinNumber}</td>
                <td className="p-2 border">{car.fuelType}</td>
                <td className="p-2 border">{car.engineCapacity}</td>
                <td className="p-2 border">{car.category}</td>
                <td className="p-2 border">{car.department}</td>
                <td className="p-2 border">{car.user}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
