"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const BASIC_URL = "http://localhost:3000/data";

const CarsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    try {
      const response = await axios.get(BASIC_URL);
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const carsCategory = data?.categories?.find((cat) => cat.name === "Cars");

  return (
    <div className="flex gap-[33px] flex-wrap justify-center md:justify-start md:px-[50px] px-[20px] pb-[50px] pt-[120px]">
      {loading
        ? // Skeleton loading
          Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="flex flex-col gap-[10px] bg-gray-300 dark:bg-gray-700 rounded-[10px] items-center shadow-md w-[150px] h-[100px] md:w-[200px] md:h-[200px] justify-center animate-pulse"
              />
            ))
        : carsCategory?.brands?.map((brand) => (
            <Link key={brand.brandId} href={`/Cars/${brand.brandId}`}>
              <div className="flex flex-col gap-[10px] bg-white dark:bg-[#ffffff31] rounded-[10px] items-center shadow-md w-[150px] h-[100px] md:w-[200px] md:h-[200px] justify-center">
                <Image
                  src={brand.brandLogo}
                  alt={brand.brand}
                  width={150}
                  height={100}
                  className="md:h-[100px] h-[50px] object-contain"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="/images/placeholder.png"
                />
                <h3 className="text-center font-bold text-[18px]">
                  {brand.brand}
                </h3>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default CarsPage;
