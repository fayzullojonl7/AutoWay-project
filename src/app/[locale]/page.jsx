"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
const BASIC_URL = "http://localhost:3000/data";
export default function Home() {
  const [data, setData] = useState([]); // сразу массив

  async function getData() {
    try {
      const response = await axios.get(BASIC_URL);
      const data = response.data;
      console.log(data);

      setData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="px-[50px] pt-[150px] ">
      <section className="h-[80vh] relative">
        {/* Светлая версия */}
        <img
          src="/images/pages/home/header/m5G90.jpg"
          alt="m5"
          className="w-[100%] rounded-[20px] h-[100%] dark:hidden"
        />

        {/* Тёмная версия */}
        <img
          src="/images/pages/home/header/m5G90Touring.png"
          alt="m5-dark"
          className="w-[100%] rounded-[20px] h-[100%] hidden dark:block"
        />
        <section className="absolute w-[100%] h-[100%] bg-[#5252ff00] top-[0px] rounded-[20px]">
          <h1 className=" font-bold text-[45px] text-center mt-[50px]">
            FIND YOR DREAM CAR
          </h1>
        </section>
      </section>
      <section className="flex flex-col gap-[30px] py-[50px]">
        <h1 className="text-center text-[30px] font-bold">CATEGORIES</h1>
        <div className="flex justify-between">
          {data?.categories?.map((cat) => (
            <Link href={cat.name} key={cat.id}>
              <div className="dark:shadow-md dark:shadow-[#ffffff8b] text-[30px] overflow-hidden rounded-[20px] h-[170px] w-[300px] justify-between pl-[30px] shadow-md  flex items-center py-[20px] gap-[10px]">
                <h1> {cat.name}</h1>
                <img src={cat.categoryImage} alt="" className="w-[100px] " />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}
