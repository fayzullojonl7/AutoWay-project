"use client";

import { use, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const BASIC_URL = "http://localhost:3000/data";

export default function CarPage({ params }) {
  const { locale, brandId, modelId, carId } = use(params); // ✅ unwrap params
  const [car, setCar] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(BASIC_URL);
      const db = response.data;

      const carsCategory = db.categories.find((c) => c.name === "Cars");
      let foundCar = null;

      for (const brand of carsCategory.brands) {
        for (const model of brand.models) {
          const vehicle = model.vehicles.find(
            (v) => v.id.toString() === carId.toString()
          );
          if (vehicle) {
            foundCar = { ...vehicle, brand: brand.brand, model: model.name };
            break;
          }
        }
        if (foundCar) break;
      }

      setCar(foundCar);
    }

    fetchData();
  }, [carId]);

  if (!car) return <div>Loading...</div>;

  return (
    <div className="pt-[130px] px-[50px]">
      <Link href={`/${locale}/Cars/${brandId}/models/${modelId}`}>
        <button className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-[20px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
      </Link>
      <h1 className="text-4xl font-bold mb-6">{car.name}</h1>

      <img
        src={car.cardCover}
        alt={car.name}
        className="mb-6 w-[500px] rounded-lg shadow-lg"
      />

      <div className="grid grid-cols-2 gap-6 text-lg">
        <p>
          <strong>Year:</strong> {car.year}
        </p>
        <p>
          <strong>Fuel:</strong> {car.fuelType}
        </p>
        <p>
          <strong>Gearbox:</strong> {car.gearBox}
        </p>
        <p>
          <strong>Price:</strong> {car.price}
        </p>
        <p>
          <strong>Mileage:</strong> {car.mialage}
        </p>
      </div>
    </div>
  );
}
