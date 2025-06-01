import { useNavigate } from "react-router";
import { Button } from "../../Button/Button";
import { Car } from "../../Types/Types";

export function RegisterCar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function sendFormDetails(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = event.currentTarget;
    const {
      plateNumber,
      carBrand,
      carName,
      vinNumber,
      engineCapacity,
      fuelType,
      category,
      department,
      user,
      status,
    } = formData;

    const car: Car = {
      plateNumber: plateNumber.value.toUpperCase().split(" ").join(""),
      carBrand: carBrand.value,
      carName: carName.value,
      vinNumber: vinNumber.value,
      engineCapacity: engineCapacity.value,
      fuelType: fuelType.value,
      category: category.value,
      department: department.value,
      user: user.value,
      status: status.value,
    };

    registerCar(car);

    event.currentTarget.reset();
  }

  async function registerCar(car: Car) {
    const url = "http://localhost:3000/vehicles";

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(car),
    };

    const response = await fetch(url, options);

    const data = await response.json();

    alert("Car successfuly added !");
    navigate("/");
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4 mb-10 mt-10 flex-col ">
      <form
        onSubmit={sendFormDetails}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mb-10"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Înregistrare Mașină
        </h2>

        <div className="mb-4">
          <label htmlFor="plateNumber" className="block mb-1 font-medium">
            Număr Înmatriculare<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="plateNumber"
            name="plateNumber"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Ex. B100TCH"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="carBrand" className="block mb-1 font-medium">
            Marcă<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="carBrand"
            name="carBrand"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Dacia"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="carName" className="block mb-1 font-medium">
            Denumire mașină<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="carName"
            name="carName"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Logan"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="vinNumber" className="block mb-1 font-medium">
            Serie șasiu<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="vinNumber"
            name="vinNumber"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="DC9234JMAX"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="engineCapacity" className="block mb-1 font-medium">
            Capacitate cilindrică<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="engineCapacity"
            name="engineCapacity"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="1197"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="fuelType" className="block mb-1 font-medium">
            Combustibil<span className="text-red-600">*</span>
          </label>
          <select
            id="fuelType"
            name="fuelType"
            className="p-2 rounded hover:cursor-pointer border"
            required
          >
            <option id="benzina">Benzină</option>
            <option id="motorina">Motorină</option>
            <option id="hibrid">Hibrid</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block mb-1 font-medium">
            Categorie vehicul<span className="text-red-600">*</span>
          </label>
          <select
            name="category"
            id="category"
            className="p-2 rounded hover:cursor-pointer border"
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
            className="p-2 rounded hover:cursor-pointer border"
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
          <label htmlFor="user" className="block mb-1 font-medium">
            Nume utilizator mașină<span className="text-red-600">*</span>
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            type="text"
            name="user"
            id=""
            placeholder="Utilizator"
            required
          ></input>
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block mb-1 font-medium">
            Status Mașină<span className="text-red-600">*</span>
          </label>
          <select
            name="status"
            className="p-2 rounded hover:cursor-pointer border"
          >
            <option value="Activă">Activă</option>
            <option value="Vândută">Vândută</option>
          </select>
        </div>
        <div className="flex justify-center ">
          <Button text="Adaugă" width />
        </div>

        <div>
          <p className="text-xs mt-4">
            Câmpurile marcate cu <span className="text-red-600">*</span> sunt
            obligatorii!
          </p>
        </div>
      </form>
    </div>
  );
}
