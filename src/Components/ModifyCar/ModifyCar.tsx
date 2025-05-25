import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../Button/Button";

type Car = {
  plateNumber: string;
  carBrand: string;
  carName: string;
  vinNumber: string;
  engineCapacity: string;
  fuelType: string;
  category: string;
  department: string;
  user: string;
  status: string;
};

export function ModifyCar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formState, setFormState] = useState<Car>({
    plateNumber: "",
    carBrand: "",
    carName: "",
    vinNumber: "",
    engineCapacity: "",
    fuelType: "",
    category: "",
    department: "",
    user: "",
    status: "",
  });

  useEffect(() => {
    if (id) {
      getCarFromId(id);
    }
  }, [id]);

  async function getCarFromId(id: string) {
    const url = `http://192.168.1.137:3000/vehicles/${id}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    setFormState(data);
  }

  function sendFormDetails(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const carToSend: Car = {
      ...formState,
      plateNumber: formState.plateNumber.toUpperCase().split(" ").join(""),
    };

    editCar(carToSend);
  }

  async function editCar(car: Car) {
    const url = `http://192.168.1.137:3000/vehicles/${id}`;
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(car),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    // Optional: navigate or show a success message
    console.log("Updated", data);
    alert("Vehicul modificat cu succes !");
    navigate("/"); // redirect after edit
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4 mb-10 mt-10 flex-col">
      <form
        onSubmit={sendFormDetails}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mb-10"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Modificare date
        </h2>

        {/** INPUTS */}
        {[
          { id: "plateNumber", label: "Număr Înmatriculare" },
          { id: "carBrand", label: "Marcă" },
          { id: "carName", label: "Denumire mașină" },
          { id: "vinNumber", label: "Serie șasiu" },
          { id: "engineCapacity", label: "Capacitate cilindrică" },
          { id: "user", label: "Nume utilizator mașină" },
        ].map(({ id, label }) => (
          <div className="mb-4" key={id}>
            <label htmlFor={id} className="block mb-1 font-medium">
              {label}
              <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id={id}
              name={id}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
              required
              value={(formState as any)[id]}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  [id]: e.target.value,
                }))
              }
            />
          </div>
        ))}

        {/** SELECTS */}
        <div className="mb-4">
          <label htmlFor="fuelType" className="block mb-1 font-medium">
            Combustibil<span className="text-red-600">*</span>
          </label>
          <select
            name="fuelType"
            className="p-2 rounded"
            value={formState.fuelType}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, fuelType: e.target.value }))
            }
            required
          >
            <option value="Benzină">Benzină</option>
            <option value="Motorină">Motorină</option>
            <option value="Hibrid">Hibrid</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block mb-1 font-medium">
            Categorie vehicul<span className="text-red-600">*</span>
          </label>
          <select
            name="category"
            className="p-2 rounded"
            value={formState.category}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, category: e.target.value }))
            }
            required
          >
            <option value="Autoturism M1">Autoturism M1</option>
            <option value="Autoturism M1G">Autoturism M1G</option>
            <option value="Autoutilitara N1">Autoutilitară N1</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="department" className="block mb-1 font-medium">
            Selectează departament<span className="text-red-600">*</span>
          </label>
          <select
            name="department"
            className="p-2 rounded"
            value={formState.department}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, department: e.target.value }))
            }
            required
          >
            <option value="Administrativ">Administrativ</option>
            <option value="Cafenele">Cafenele</option>
            <option value="Financiar">Financiar</option>
            <option value="Logistică">Logistică</option>
            <option value="Marketing">Marketing</option>
            <option value="Prăjitorie">Prăjitorie</option>
            <option value="Service">Service</option>
            <option value="Vânzări">Vânzări</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block mb-1 font-medium">
            Status Mașină<span className="text-red-600">*</span>
          </label>
          <select
            name="status"
            className="p-2 rounded"
            value={formState.status}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, status: e.target.value }))
            }
            required
          >
            <option value="Activă">Activă</option>
            <option value="Vândută">Vândută</option>
          </select>
        </div>

        <Button text="Modifică Mașină" width />

        <p className="text-xs mt-4">
          Câmpurile marcate cu <span className="text-red-600">*</span> sunt
          obligatorii!
        </p>
      </form>
    </div>
  );
}
