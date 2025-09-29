"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
const BASIC_URL = "http://localhost:3000/data";

const CarsPage = () => {
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const response = await axios.get(BASIC_URL);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const carsCategory = data?.categories?.find((cat) => cat.name === "Cars");

  return (
    <div className="flex gap-[33px] flex-wrap justify-center md:justify-start md:px-[50px] px-[20px] pb-[50px] pt-[120px]">
      {carsCategory?.brands?.map((brand) => (
        <Link key={brand.brandId} href={`/Cars/${brand.brandId}`}>
          <div className="flex flex-col gap-[10px] rounded-[10px] items-center shadow-md w-[150px] h-[100px] md:w-[200px] md:h-[200px] justify-center">
            <img
              src={brand.brandLogo}
              alt=""
              className="md:h-[100px] h-[50px]"
            />
            <h3 className="text-center font-bold text-[18px]">{brand.brand}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CarsPage;
