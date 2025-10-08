import { intlDate } from "../functions/getDate";
import {
  Assurance,
  CascoAssurance,
  AssuranceDetailsProps,
} from "../Types/Types";

function isRca(policy: Assurance | CascoAssurance): policy is Assurance {
  return "rcaNumber" in policy;
}

function isCasco(policy: Assurance | CascoAssurance): policy is CascoAssurance {
  return "cascoNumber" in policy;
}

export function AssuranceDetails({ car, type }: AssuranceDetailsProps) {
  const assuranceData =
    type === "rca" ? (car.rca as Assurance[]) : (car.casco as CascoAssurance[]);
  const latest = assuranceData?.[assuranceData.length - 1];

  const details =
    type === "rca" && latest && isRca(latest)
      ? [
          { label: "Asigurator", value: latest.rcaInsurer || "-" },
          { label: "Serie asigurare", value: latest.rcaSerie || "-" },
          { label: "Număr asigurare", value: latest.rcaNumber || "-" },
          {
            label: "Costul poliței RON",
            value: isNaN(Number(latest.rcaCost))
              ? "-"
              : Number(latest.rcaCost).toLocaleString(),
          },
          {
            label: "Data începerii asigurării",
            value: latest.rcaStart ? intlDate(latest.rcaStart) : "-",
          },
          {
            label: "Data expirării asigurării",
            value: latest.rcaEnd ? intlDate(latest.rcaEnd) : "-",
          },
        ]
      : latest && isCasco(latest)
      ? [
          { label: "Asigurator", value: latest.cascoInsurer || "-" },
          { label: "Serie asigurare", value: latest.cascoSerie || "-" },
          { label: "Număr asigurare", value: latest.cascoNumber || "-" },
          {
            label: "Costul poliței RON",
            value: isNaN(Number(latest.cascoCost))
              ? "-"
              : Number(latest.cascoCost).toLocaleString(),
          },
          {
            label: "Data începerii asigurării",
            value: latest.cascoStart ? intlDate(latest.cascoStart) : "-",
          },
          {
            label: "Data expirării asigurării",
            value: latest.cascoEnd ? intlDate(latest.cascoEnd) : "-",
          },
        ]
      : [];

  return (
    <>
      <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 m-y-10">
        <h3 className="text-2xl font-semibold mb-4 text-blue-800">
          Detalii {type.toUpperCase()}
        </h3>
        {details.length > 0 ? (
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            {details.map(({ label, value }) => (
              <div key={label} className="flex flex-col">
                <dt className="text-gray-800 font-medium">{label}</dt>
                <dd className="text-gray-800">{value}</dd>
              </div>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm italic">Nu există date.</p>
        )}
      </section>

      <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 mt-4">
        <h3 className="text-2xl font-semibold mb-4 text-blue-800">
          Istoric Polițe {type.toUpperCase()}
        </h3>

        {assuranceData && assuranceData.length > 0 ? (
          <ul className="space-y-3">
            {assuranceData.map((p) => (
              <li
                key={p.createdAt}
                className="grid grid-cols-4 border-b pb-2 text-sm justify-start items-center"
              >
                {isRca(p) ? (
                  <>
                    <span className="text-gray-700">Număr: {p.rcaNumber}</span>
                    <span className="text-gray-700 text-center">
                      Data start: {intlDate(p.rcaStart!).toLocaleString()}
                    </span>
                    <span className="text-gray-900 font-semibold text-right">
                      {isNaN(Number(p.rcaCost))
                        ? "Preț nespecificat"
                        : `${Number(p.rcaCost).toLocaleString()} RON`}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-gray-700">
                      Număr: {p.cascoNumber}
                    </span>
                    <span className="text-gray-700 text-center">
                      Data start: {intlDate(p.cascoStart!).toLocaleString()}
                    </span>
                    <span className="text-gray-900 font-semibold text-right">
                      {isNaN(Number(p.cascoCost))
                        ? "Preț nespecificat"
                        : `${Number(p.cascoCost).toLocaleString()} RON`}
                    </span>
                  </>
                )}
              </li>
            ))}

            <div className="w-full text-right">
              <span className="text-gray-900 font-semibold">
                Total costuri:{" "}
                {assuranceData
                  .reduce((acc, val) => {
                    if (isRca(val)) return acc + (Number(val.rcaCost) || 0);
                    if (isCasco(val)) return acc + (Number(val.cascoCost) || 0);
                    return acc;
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
    </>
  );
}
