import { intlDate } from "../functions/getDate";
import { CarDetailsProps } from "../Types/Types";

export function VignetteDetails({ car }: CarDetailsProps) {
  const latestVignette = car.vignette?.[car.vignette.length - 1];

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

  return (
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
  );
}
