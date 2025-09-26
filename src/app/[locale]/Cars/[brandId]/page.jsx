"use client";

import { useEffect, useState, use } from "react";
import axios from "axios";
import Link from "next/link";

const BASIC_URL = "http://localhost:3000/data";

export default function BrandModelsPage({ params }) {
  const { brandId } = use(params);

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

  return (
    <div className="pt-[130px] px-[50px]">
      <h1 className="text-3xl font-bold mb-6">{brand.brand} Models</h1>
      <img src={brand.brandLogo} alt={brand.brand} className="w-32 mb-4" />
      <div className="flex flex-wrap gap-[30px] py-[50px]">
        {brand.models.map((model) => (
          <Link key={model.id} href={`/Cars/${brandId}/models/${model.id}/`}>
            <div className="w-[300px]">
              <h1 className="font-bold">{model.name}</h1>
              <img
                className="transition-transform duration-500 ease-in-out transform hover:scale-105"
                src={model.prevImg}
                alt=""
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
