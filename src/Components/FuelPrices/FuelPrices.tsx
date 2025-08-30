import { useState, useEffect } from "react";

export function FuelPrices() {
  const exchangeKey = import.meta.env.VITE_EXCHANGE_API_KEY;
  const fueloKey = import.meta.env.VITE_FUELO_API_KEY;
  const [petrolPrice, setPetrolPrice] = useState<null | number | string>(null);
  const [dieselPrice, setDieselPrice] = useState<null | number | string>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrices() {
      setLoading(true);
      try {
        const exchangeRes = await fetch(
          `https://api.freecurrencyapi.com/v1/latest?apikey=${exchangeKey}&currencies=RON&base_currency=BGN`
        );
        const exchangeData = await exchangeRes.json();

        const petrolResponse = await fetch(
          `https://fuelo.net/api/price?key=${fueloKey}&fuel=gasoline&date=2025-08-08`
        );
        const petrolData = await petrolResponse.json();

        const dieselResponse = await fetch(
          `https://fuelo.net/api/price?key=${fueloKey}&fuel=diesel&date=2025-08-08`
        );
        const dieselData = await dieselResponse.json();

        setPetrolPrice(
          Number(petrolData.price * exchangeData.data.RON).toFixed(2)
        );
        setDieselPrice(
          Number(dieselData.price * exchangeData.data.RON).toFixed(2)
        );
      } catch (error) {
        console.error("Error fetching prices:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPrices();
  }, []);

  if (loading) return <p>Loading fuel prices...</p>;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-x-6 text-sm text-gray-700 bg-gray-100 px-3 py-2 rounded-lg shadow-inner">
      <p className="font-semibold text-blue-800">Medie preț carburant:</p>
      <div className="flex flex-col sm:flex-row sm:gap-x-4">
        <span>
          Benzină: <span className="font-medium">{petrolPrice} RON/l</span>
        </span>
        <span>
          Motorină: <span className="font-medium">{dieselPrice} RON/l</span>
        </span>
      </div>
    </div>
  );
}
