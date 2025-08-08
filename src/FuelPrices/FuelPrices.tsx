import React, { useState, useEffect } from "react";

export function FuelPrices() {
  const [petrolPrice, setPetrolPrice] = useState(null);
  const [dieselPrice, setDieselPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrices() {
      setLoading(true);
      try {
        const petrolResponse = await fetch(
          "https://fuelo.net/api/price?key=87f40ca3d32e9d0&fuel=gasoline"
        );
        const petrolData = await petrolResponse.json();

        const dieselResponse = await fetch(
          "https://fuelo.net/api/price?key=87f40ca3d32e9d0&fuel=diesel"
        );
        const dieselData = await dieselResponse.json();

        setPetrolPrice(petrolData.price);
        setDieselPrice(dieselData.price);
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
