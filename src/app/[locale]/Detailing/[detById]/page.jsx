"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const BASIC_URL = "http://localhost:3000/data"; // твой db.json

export default function DetByIdPage() {
  const { detById } = useParams(); // имя папки [detById]
  const [detailing, setDetailing] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getDetailing() {
    try {
      const response = await axios.get(BASIC_URL);

      const detailingCategory = response.data?.categories?.find(
        (cat) => cat.name === "Detailing"
      );

      const found = detailingCategory?.detailings?.find(
        (det) => String(det.id) === String(detById)
      );

      setDetailing(found);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (detById) getDetailing();
  }, [detById]);

  if (loading) return <p className="p-6">Загрузка...</p>;
  if (!detailing)
    return <p className="p-6 text-red-500">Детейлинг не найден</p>;

  return (
    <div className="pt-[100px] px-[50px]">
      <div className="flex items-center  gap-4 mb-6">
        {detailing.avatar && (
          <img
            src={detailing.avatar}
            alt={detailing.name}
            className="w-16 h-16 rounded-full"
          />
        )}
        <h1 className="text-3xl font-bold">{detailing.name}</h1>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Services:</h2>
      <div className="flex gap-[20px] flex-wrap">
        {detailing.services?.map((service) => (
          <Link
            key={service.id}
            href={`/Detailing/${detailing.id}/${service.id}`}
          >
            <div className="w-[100%] md:w-[300px] rounded-[20px] overflow-hidden shadow-md bg-white dark:bg-[#ffffff14] relative transition hover:shadow-lg">
              {service.label && (
                <div
                  className={`absolute top-[20px] left-[20px] px-3 py-1 rounded-[30px] text-white text-sm font-bold ${
                    service.isPremium ? "bg-[#ff6161]" : "bg-[#3D923A]"
                  }`}
                >
                  {service.label}
                </div>
              )}

              {service.cardCover && (
                <div className="md:h-[318px] h-[230px] flex items-center justify-center overflow-hidden bg-amber-500">
                  <img
                    src={service.cardCover}
                    alt={service.title}
                    className=" w-[100%] h-[100%] object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </div>
              )}

              <div className="p-[20px]">
                <div className="border-b-[1px] py-[5px] border-[#E9E9E9] dark:border-[#e9e9e946]">
                  <h3 className="font-bold text-lg">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>

                {service.details && (
                  <div className="border-b-[1px] border-[#E9E9E9] dark:border-[#e9e9e946] flex justify-between py-[10px]">
                    {service.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center gap-[5px]"
                      >
                        <img
                          src={detailing.avatar}
                          alt={detail.label}
                          className="w-[20px] h-[20px] transition-transform duration-300 ease-in-out hover:scale-110"
                        />
                        <p className="text-sm">{detail.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                {service.price && (
                  <div className="flex justify-between items-center pt-[10px]">
                    <h4 className="text-[20px] font-bold">${service.price}</h4>
                    <div className="flex gap-[5px] text-[#405FF2] items-center cursor-pointer">
                      <p className="text-[15px]">View Details</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
