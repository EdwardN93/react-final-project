import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function VehicleDetails() {
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
          <strong>Fuel Type:</strong> {car.fuelType}
        </li>
        <li>
          <strong>Engine Capacity:</strong> {car.engineCapacity}
        </li>
        <li>
          <strong>Category:</strong> {car.category}
        </li>
        <li>
          <strong>Department:</strong> {car.department}
        </li>
        <li>
          <strong>Assigned To:</strong> {car.user}
        </li>
      </ul>
    </div>
  );
}
