"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const BASIC_URL = "http://localhost:3000/data";

export default function CarDetailPage() {
  const params = useParams();
  const { locale, brandId, modelId, carId } = params;

  const [car, setCar] = useState(null);
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(BASIC_URL);
        const data = response.data;

        const carsCategory = data.categories.find((c) => c.name === "Cars");
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

        if (!foundCar) {
          setCar(null);
          setLoading(false);
          return;
        }

        setImages(foundCar.carImages || [foundCar.cardCover]);
        setActiveImage(foundCar.carImages?.[0] || foundCar.cardCover);
        setCar(foundCar);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    fetchData();
  }, [carId]);

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!car) return <p className="p-6 text-center">Car not found!</p>;

  return (
    <section className="p-6 pt-[130px] px-[20px] md:px-[50px] mx-auto">
      <Link
        href={`/${locale}/Cars/${brandId}/models/${modelId}`}
        className="text-blue-500 hover:underline"
      >
        ← Back to {car.model} ({car.brand})
      </Link>

      <div className="mt-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="rounded-[20px] overflow-hidden shadow-md relative">
            {imgLoading && (
              <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse" />
            )}
            <img
              src={activeImage}
              alt={car.name}
              loading="lazy"
              onLoad={() => setImgLoading(false)}
              className={`w-full h-64 md:h-96 object-cover transition-transform duration-300 ease-in-out hover:scale-105 ${
                imgLoading ? "opacity-0" : "opacity-100"
              }`}
            />
          </div>

          <div className="flex gap-2 mt-3 overflow-x-auto">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden cursor-pointer border-2 ${
                  img === activeImage ? "border-blue-500" : "border-transparent"
                }`}
                onClick={() => {
                  setActiveImage(img);
                  setImgLoading(true); // skeleton для выбранной картинки
                }}
              >
                <img
                  src={img}
                  alt={`Preview ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white dark:bg-[#ffffff14] rounded-[20px] shadow-md p-6">
            <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Model: {car.model} | Brand: {car.brand}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Year: {car.year} | Fuel: {car.fuelType} | Gearbox: {car.gearBox}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Mileage: {car.mileage || "N/A"}
            </p>
          </div>

          <div className="flex flex-col gap-4 md:gap-[20px] md:flex-row">
            <div className="flex-1 bg-[#f3f3f3] dark:bg-[#ffffff14] p-4 rounded-lg shadow-sm">
              <h3 className="font-bold mb-2 text-[20px]">Price</h3>
              <p>{car.price || "N/A"}</p>
            </div>
            <div className="flex-1 bg-[#f3f3f3] dark:bg-[#ffffff14] p-4 rounded-lg shadow-sm">
              <h3 className="font-bold mb-2 text-[20px]">Phone</h3>
              <p>{car.phone || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
