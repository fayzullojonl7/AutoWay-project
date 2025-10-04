"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const BASIC_URL = "http://localhost:3000/data";

export default function DetailingsPage() {
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const response = await axios.get(BASIC_URL);
      setData(response.data);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const detailingCategory = data?.categories?.find(
    (cat) => cat.name === "Detailing"
  );

  const detailings = detailingCategory?.detailings || [];

  return (
    <div className="pt-[100px] px-[20px] md:px-[50px]">
      <div className="flex gap-[20px] items-center">
        <Link href={`/`}>
          <button className="text-white rounded-lg hover:bg-[#5252ffb1]">
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
        <h1 className="text-3xl font-bold mb-4">Detailing Services</h1>
      </div>
      <div className="flex flex-wrap gap-[20px] justify-center md:justify-start">
        {detailings.map((det) => (
          <Link key={det.id} href={`/Detailing/${det.id}`}>
            <div className="flex flex-col gap-[10px] bg-white dark:bg-[#ffffff31] rounded-[10px] items-center shadow-md w-[150px] h-[150px] md:w-[200px] md:h-[200px] justify-center transition hover:shadow-lg">
              <img
                src={det.avatar}
                alt={det.name}
                className="md:h-[100px] h-[50px] object-cover rounded-full"
              />
              <h2 className="text-center font-bold text-[16px] md:text-[18px]">
                {det.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
