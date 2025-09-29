"use client";

import { useEffect, useState, use } from "react";
import axios from "axios";
import Link from "next/link";
import WishlistButton from "@/components/WishListButton";
import Image from "next/image";
import VehicleImage from "@/components/VehicleImages";

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

  const formatMileage = (mileage) => {
    if (!mileage && mileage !== 0) return "-"; // если нет данных
    if (mileage >= 1000) {
      return `${Math.floor(mileage / 1000)}k`;
    }
    return mileage.toString();
  };

  const getMileageBg = (mileage) => {
    if (!mileage && mileage !== 0) return "bg-gray-200";
    if (mileage < 5000) return "bg-green-300";
    if (mileage < 20000) return "bg-amber-200";
    return "bg-red-300";
  };
  if (!data.categories) return <div>Loading...</div>;

  const carsCategory = data.categories.find((c) => c.name === "Cars");
  const brand = carsCategory.brands.find(
    (b) => b.brandId.toString() === brandId
  );

  if (!brand) return <div>Brand not found</div>;

  const model = brand.models.find((m) => m.id.toString() === modelId);

  if (!model) return <div>Model not found</div>;

  return (
    <div className="pt-[100px] md:pt-[130px] md:px-[50px] px-[20px]">
      <div className="flex items-center gap-[10px]">
        <Link href={`/Cars/${brandId}`}>
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
        <h1 className="font-bold text-[20px] md:text-[30px]">
          {brand.brand} {model.name}
        </h1>
      </div>

      <div className="flex flex-wrap gap-[30px] mt-[20px]">
        {!model.vehicles || model.vehicles.length === 0 ? (
          <p>No vehicles available for this model.</p>
        ) : (
          model.vehicles.map((vehicle) => (
            <Link
              key={vehicle.id}
              href={`/${locale}/Cars/${brandId}/models/${modelId}/${vehicle.id}`}
            >
              <div className="w-[100%] md:w-[300px] rounded-[20px] overflow-hidden shadow-md bg-white dark:bg-[#ffffff14] relative">
                <div
                  className={`absolute top-[20px] left-[20px]  px-3 py-1 rounded-[30px] text-white text-sm font-bold ${
                    vehicle.price > 50000 ? "bg-[#ff6161]" : "bg-[#3D923A]"
                  }`}
                >
                  {vehicle.price > 50000 ? "Expensive" : "Great Price"}
                </div>
                <WishlistButton vehicle={vehicle} />
                <div className="md:h-[218px] h-[260px] md:hidden flex items-center pb-[5px] justify-center overflow-hidden">
                  {" "}
                  <img
                    src={vehicle.cardCover}
                    alt={vehicle.name}
                    className="rounded-t-[20px] w-[100%] "
                  />
                </div>

                <VehicleImage
                  cardCover={vehicle.cardCover}
                  carImages={vehicle.carImages}
                  name={vehicle.name}
                />

                <div className="p-[20px]">
                  <div className="border-b-[1px] py-[5px] border-[#E9E9E9] dark:border-[#e9e9e946]">
                    <h1 className="font-bold">
                      {vehicle.name} {vehicle.year}
                    </h1>
                    <p>
                      {vehicle.power}{" "}
                      {vehicle.turbo ? "twin-turbo" : "without turbines"}{" "}
                      {vehicle.drive}
                    </p>
                  </div>
                  <div className="border-b-[1px] border-[#E9E9E9] dark:border-[#e9e9e946] flex justify-between">
                    <div className="flex items-center flex-col py-[5px] gap-[10px]">
                      <Image
                        src={"/images/pages/home/otherIcons/mileageIcon.svg"}
                        alt="dd"
                        width={100}
                        height={100}
                        className="w-[20px] h-[20px] dark:hidden"
                      />
                      <Image
                        src={"/images/pages/home/otherIcons/milesIconWhite.svg"}
                        alt="dd"
                        width={100}
                        height={100}
                        className="w-[20px] h-[20px] dark:block hidden"
                      />
                      <div
                        className={`${getMileageBg(
                          vehicle.mileage
                        )} px-[2px] text-black rounded-[10px]`}
                      >
                        <p>{formatMileage(vehicle.mileage)} Miles</p>
                      </div>
                    </div>
                    <div className="flex items-center flex-col py-[5px] gap-[10px]">
                      <Image
                        src={"/images/pages/home/otherIcons/petrolicon.svg"}
                        alt="dd"
                        width={100}
                        height={100}
                        className="w-[20px] h-[20px] dark:hidden"
                      />
                      <Image
                        src={
                          "/images/pages/home/otherIcons/petroliconWhite.svg"
                        }
                        alt="dd"
                        width={100}
                        height={100}
                        className="w-[20px] h-[20px] dark:block hidden"
                      />
                      <p>{vehicle.fuelType}</p>
                    </div>
                    <div className="flex items-center flex-col py-[5px] gap-[10px]">
                      <Image
                        src={"/images/pages/home/otherIcons/gearBoxIcon.svg"}
                        alt="dd"
                        width={100}
                        height={100}
                        className="w-[20px] h-[20px] dark:hidden"
                      />
                      <Image
                        src={
                          "/images/pages/home/otherIcons/gearBoxIconWhite.svg"
                        }
                        alt="dd"
                        width={100}
                        height={100}
                        className="w-[20px] h-[20px] dark:block hidden"
                      />
                      <p>{vehicle.gearBox}</p>
                    </div>
                  </div>
                  <div className="flex py-[5px] justify-between items-center">
                    <h1 className="text-[20px] font-bold font-sans">
                      ${vehicle.price}
                    </h1>
                    <div className="flex gap-[5px] text-[#405FF2] items-center">
                      <p className="text-[15px] ">View Details </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
