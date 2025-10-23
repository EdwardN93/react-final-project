import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { intlDate } from "../functions/getDate";
import { CarDetailsProps } from "../Types/Types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function VignetteDetails({ car }: CarDetailsProps) {
  const latestVignette = car.vignette?.[car.vignette.length - 1];
  const cost = car.vignette?.map((p) => Number(p.vignetteCost)) || [];
  const dates = car.vignette?.map((p) => intlDate(p.createdAt!)) || [];
  const vignetteExists = car.vignette && car.vignette.length > 0;

  const vignetteDetails = [
    {
      label: "Rovinietă",
      value:
        latestVignette?.hasVignette == "true"
          ? "Valabilă"
          : "Nu există rovinietă",
    },
    {
      label: "Costul vignetei RON",
      value: isNaN(Number(latestVignette?.vignetteCost))
        ? "-"
        : Number(latestVignette?.vignetteCost).toLocaleString(),
    },
    {
      label: "Data expirare",
      value: latestVignette?.vignetteEnd
        ? intlDate(latestVignette?.vignetteEnd)
        : "-",
    },
  ];

  function charter() {
    const data = {
      labels: dates,
      datasets: [
        {
          label: "Cost RON",
          data: cost,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    const options = {
      // responsive: true,
      aspectRatio: 3.5,
      maintainAspectRatio: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Istoric cost vignete" },
      },
      scales: {
        x: {
          grid: {
            borderDash: [15, 5],
            color: "#CDD1DB",
            borderColor: "#CDD1DB",
          },
          ticks: {
            color: "#6B7280",
            font: {
              size: 10,
            },
          },
        },
        y: {
          min: 0,
          ticks: {
            font: {
              size: 10,
            },
            stepSize: 25,
            color: "#6B7280",
          },
        },
      },
    };

    return <Bar data={data} options={options} />;
  }

  return (
    <>
      <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 m-y-10">
        <h3 className="text-2xl font-semibold mb-4 text-blue-800">
          Detalii Vignetă
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

      <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 mt-4">
        <h3 className="text-2xl font-semibold mb-4 text-blue-800">
          Istoric Vignete
        </h3>

        {car.vignette && car.vignette.length > 0 ? (
          <ul className="space-y-3">
            {car.vignette.map((p) => (
              <li
                key={p.createdAt}
                className="grid grid-cols-4 border-b pb-2 text-sm justify-between items-center"
              >
                {p && (
                  <>
                    <span className="text-gray-700 text-center">
                      Dată Achiziție: {intlDate(p.createdAt!).toLocaleString()}
                    </span>
                    <span className="text-gray-700 text-center">
                      Dată Expirare: {intlDate(p.vignetteEnd!).toLocaleString()}
                    </span>
                    <span className="text-gray-900 font-semibold text-right">
                      {isNaN(Number(p.vignetteCost))
                        ? "Preț nespecificat"
                        : `${Number(p.vignetteCost).toLocaleString()} RON`}
                    </span>
                  </>
                )}
              </li>
            ))}

            <div className="w-full text-right">
              <span className="text-gray-900 font-semibold">
                Total costuri:{" "}
                {car.vignette
                  .reduce((acc, val) => {
                    return acc + (Number(val.vignetteCost) || 0);
                  }, 0)
                  .toLocaleString()}{" "}
                RON
              </span>
            </div>
          </ul>
        ) : (
          <p className="text-gray-500 text-sm italic">Nu există date.</p>
        )}
      </section>
      {vignetteExists && (
        <section className="w-full h-full mt-8 justify-center items-center self-center">
          {charter()}
        </section>
      )}
    </>
  );
}
