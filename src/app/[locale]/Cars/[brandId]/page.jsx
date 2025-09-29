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
      <div className="flex items-center gap-[10px]">
        <Link href={`/Cars`}>
          <button className="md:px-6 px-[5px] py-[2px] md:py-2 bg-[#5252ff] text-white rounded-lg hover:bg-[#5252ffb1]">
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
        <h1 className="font-bold text-[20px] md:text-[30px]">{brand.brand}</h1>
      </div>

      <div className="flex flex-wrap justify-center gap-[30px] py-[50px]">
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
