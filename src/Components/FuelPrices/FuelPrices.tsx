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
    <div>
      <p>Benzină / l: {petrolPrice} RON</p>
      <p>Motorină / l: {dieselPrice} RON</p>
    </div>
  );
}
