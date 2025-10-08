import { Button } from "../Button/Button";
import { Car, Repairs } from "../Types/Types";
import { useAuthContext } from "../routes/auth/AuthContext";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

interface RepairsSectionProps {
  car: Car;
  setCar: React.Dispatch<React.SetStateAction<Car | null | undefined>>;
}

export function RepairsDetails({ car, setCar }: RepairsSectionProps) {
  const { user, accessToken } = useAuthContext();

  async function handleDeleteIntervention(repairId: string) {
    if (!car) return;

    const updatedRepairs = car.repairs!.filter(
      (repair) => repair.createdAt !== repairId
    );

    const updatedCar = { ...car, repairs: updatedRepairs };

    try {
      const res = await fetch(`${apiUrl}/vehicles/${car.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCar),
      });

      if (!res.ok) throw new Error("Eroare la server");

      const data = await res.json();
      setCar(data);
    } catch (error) {
      console.error("Error deleting repair:", error);
      toast.error("Eroare la ștergerea intervenției");
    }
  }

  const totalCost =
    car.repairs?.reduce((acc, val) => acc + Number(val.cost || 0), 0) || 0;

  return (
    <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
      <h3 className="text-2xl font-semibold mb-4 text-blue-800">
        Intervenții & Costuri
      </h3>

      {car.repairs && car.repairs.length > 0 ? (
        <ul className="space-y-3">
          {car.repairs.map((repair: Repairs) => (
            <li
              id={repair.createdAt}
              key={repair.createdAt}
              className="grid grid-cols-4 border-b pb-2 text-sm justify-start items-center"
            >
              <span className="text-gray-700">{repair.intervention}</span>
              <span className="text-gray-700 text-center">
                Kilometri: {Number(repair.repairAtKm).toLocaleString()}
              </span>
              <span className="text-gray-900 font-semibold text-right">
                {Number(repair.cost).toLocaleString()} RON
              </span>
              <span className="text-right">
                {user?.role == 1 && (
                  <Button
                    text="X"
                    onClick={() => handleDeleteIntervention(repair.createdAt)}
                  />
                )}
              </span>
            </li>
          ))}

          <div className="w-full text-right">
            <span className="text-gray-900 font-semibold">
              Total costuri: {totalCost.toLocaleString()} RON
            </span>
          </div>
        </ul>
      ) : (
        <p className="text-gray-500 text-sm italic">Nicio intervenție.</p>
      )}
    </section>
  );
}
