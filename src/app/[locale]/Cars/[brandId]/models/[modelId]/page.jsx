"use client";

import { useEffect, useState, use } from "react";
import axios from "axios";
import Link from "next/link";

const BASIC_URL = "http://localhost:3000/data";

export default function ModelVehiclesPage({ params }) {
  const { locale, brandId, modelId } = use(params); 
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(BASIC_URL);
      setData(response.data);
    }
    fetchData();
  }, []);

  if (!data.categories) return <div>Loading...</div>;

  const carsCategory = data.categories.find((c) => c.name === "Cars");
  const brand = carsCategory.brands.find(
    (b) => b.brandId.toString() === brandId
  );

  if (!brand) return <div>Brand not found</div>;

  const model = brand.models.find((m) => m.id.toString() === modelId);

  if (!model) return <div>Model not found</div>;

  return (
    <div className="pt-[130px] px-[50px]">
      <h1 className="text-3xl font-bold mb-6">
        {brand.brand} {model.name}
      </h1>

      <div className="flex flex-wrap gap-[30px]">
        {model.vehicles.length === 0 ? (
          <p>No vehicles available for this model.</p>
        ) : (
          model.vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="w-[300px] p-4 rounded-[10px] shadow-md"
            >
              {/* ✅ правильный href */}
              <Link
                href={`/${locale}/Cars/${brandId}/models/${modelId}/${vehicle.id}`}
              >
                <img src={vehicle.cardCover} alt={vehicle.name} />
              </Link>
              <h2 className="font-bold">{vehicle.name}</h2>
              <p>Year: {vehicle.year}</p>
              <p>Fuel: {vehicle.fuelType}</p>
              <p>Gearbox: {vehicle.gearBox}</p>
              <p>Price: {vehicle.price}</p>
              <p>Mileage: {vehicle.mialage}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
