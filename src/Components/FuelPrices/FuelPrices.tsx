import React, { useState, useEffect } from "react";

export function FuelPrices() {
  const apiKey = "fca_live_zHXLOVKqC7vwILmgOjJG56uox4J7IwAKAh0sBKWT";
  const [petrolPrice, setPetrolPrice] = useState<null | number | string>(null);
  const [dieselPrice, setDieselPrice] = useState<null | number | string>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrices() {
      setLoading(true);
      try {
        const exchangeRes = await fetch(
          `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=RON&base_currency=BGN`
        );
        const exchangeData = await exchangeRes.json();
        console.log(exchangeData);

        const petrolResponse = await fetch(
          "https://fuelo.net/api/price?key=87f40ca3d32e9d0&fuel=gasoline&date=2025-08-08"
        );
        const petrolData = await petrolResponse.json();

        const dieselResponse = await fetch(
          "https://fuelo.net/api/price?key=87f40ca3d32e9d0&fuel=diesel&date=2025-08-08"
        );
        const dieselData = await dieselResponse.json();

        setPetrolPrice(
          Number(petrolData.price * exchangeData.data.RON).toFixed(2)
        );
        setDieselPrice(
          Number(dieselData.price * exchangeData.data.RON).toFixed(2)
        );
        console.log(dieselData);
        console.log(petrolData);
        console.log(Date.now());
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
