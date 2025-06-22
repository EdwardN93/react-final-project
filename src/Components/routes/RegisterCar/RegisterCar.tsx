import { useNavigate } from "react-router";
import { Button } from "../../Button/Button";
import { Car } from "../../Types/Types";
import { motion } from "framer-motion";
import { useAuthContext } from "../auth/AuthContext";
import { NotLoggedIn } from "../../NotLoggedIn/NotLoggedIn";
import { CustomModal } from "../../Modal/Modal";
import { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export function RegisterCar() {
  const { accessToken } = useAuthContext();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
      nextRevDate,
      kilometers,
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
      nextRevDate: nextRevDate.value,
      kilometers: kilometers.value,
    };

    handleRegisterCar(car);

    event.currentTarget.reset();
  }

  async function handleRegisterCar(car: Car) {
    const url = `${apiUrl}/vehicles`;

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(car),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setShowModal(true);
      setModalMessage("Masina adaugata cu succes!");

      navigate("/");
    } catch (error) {
      console.log(error);
      setShowModal(true);
      setModalMessage(error);
    }
  }

  function handleDiscardChanges() {
    navigate("/");
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
        <div className="flex justify-center items-center min-h-screen px-4 mb-10 mt-10 flex-col">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Înregistrare Mașină
          </h2>
          <form
            onSubmit={sendFormDetails}
            className="grid grid-cols-1 gap-4 bg-white p-8 rounded-lg shadow-md w-full max-w-max mb-10"
          >
            <div>
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
                  Model<span className="text-red-600">*</span>
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
            </div>
            <div>
              <div className="mb-4">
                <label
                  htmlFor="engineCapacity"
                  className="block mb-1 font-medium"
                >
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
                <label htmlFor="user" className="block mb-1 font-medium">
                  Nume utilizator mașină<span className="text-red-600">*</span>
                </label>
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                  type="text"
                  name="user"
                  id="user"
                  placeholder="Utilizator"
                  required
                ></input>
              </div>

              <div className="mb-4">
                <label htmlFor="kilometers" className="block mb-1 font-medium">
                  Kilometri mașină<span className="text-red-600">*</span>
                </label>
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                  type="text"
                  name="kilometers"
                  id="kilometers"
                  placeholder="120,000"
                  required
                ></input>
              </div>

              <div className="mb-4">
                <label htmlFor="nextRevDate" className="block mb-1 font-medium">
                  Data revizie<span className="text-red-600">*</span>
                </label>
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                  type="date"
                  name="nextRevDate"
                  id="nextRevDate"
                  placeholder="Utilizator"
                  required
                ></input>
              </div>
            </div>

            <div className="flex gap-6 items-center justify-center text-center">
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
                  id="department"
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
                <label htmlFor="status" className="block mb-1 font-medium">
                  Status Mașină<span className="text-red-600">*</span>
                </label>
                <select
                  name="status"
                  id="status"
                  className="p-2 rounded hover:cursor-pointer border"
                >
                  <option value="Activa">Activă</option>
                  <option value="Vanduta">Vândută</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center gap-2">
              <Button
                text="Renunta"
                color="red"
                width
                onClick={handleDiscardChanges}
              />
              <Button
                text="Adaugă"
                width
                onClick={() => {
                  setShowModal(true);
                }}
              />
            </div>

            <div>
              <p className="text-xs mt-4">
                Câmpurile marcate cu <span className="text-red-600">*</span>{" "}
                sunt obligatorii!
              </p>
            </div>
          </form>
          {showModal && (
            <CustomModal
              title={modalMessage}
              confirmBtnMessage="Confirma"
              onConfirm={() => {
                setShowModal(false);
              }}
            />
          )}
        </div>
      )}
    </motion.div>
  );
}
