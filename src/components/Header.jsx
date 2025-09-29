"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Header = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false); // для мобильного меню

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/data");
        setData(response.data.categories || []);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setResults([]);
      return;
    }

    const allResults = [];

    data.forEach((category) => {
      if (category.name.toLowerCase().includes(value.toLowerCase())) {
        allResults.push({
          type: "Category",
          name: category.name,
          href: `/${category.name.toLowerCase()}`,
        });
      }

      category.brands?.forEach((brand) => {
        if (brand.brand.toLowerCase().includes(value.toLowerCase())) {
          allResults.push({
            type: "Brand",
            name: brand.brand,
            href:
              category.name === "Cars"
                ? `/Cars/${brand.brandId}`
                : `/Parts/${brand.brandId}`,
          });
        }

        if (category.name === "Cars") {
          brand.models?.forEach((model) => {
            if (model.name.toLowerCase().includes(value.toLowerCase())) {
              allResults.push({
                type: "Model",
                name: model.name,
                href: `/Cars/${brand.brandId}/models/${model.id}`,
              });
            }

            model.vehicles?.forEach((vehicle) => {
              if (vehicle.name.toLowerCase().includes(value.toLowerCase())) {
                allResults.push({
                  type: "Vehicle",
                  name: vehicle.name,
                  href: `/Cars/${brand.brandId}/models/${model.id}/${vehicle.id}`,
                });
              }
            });
          });
        }

        if (category.name === "Parts") {
          brand.parts?.forEach((part) => {
            if (part.name.toLowerCase().includes(value.toLowerCase())) {
              allResults.push({
                type: "Part",
                name: part.name,
                href: `/Parts/${brand.brandId}/${part.id}`,
              });
            }
          });
        }
      });
    });

    setResults(allResults);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white dark:bg-[#2d3c60] shadow-md">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-4 md:px-8 py-3 md:py-4">
        <Link href={"/"}>
          <div className="flex items-center">
            <img
              src="/images/pages/home/header/autoWay-Light.jpg"
              alt="Logo"
              className="w-[120px] dark:hidden"
            />
            <img
              src="/images/pages/home/header/autoWay-Dark.jpg"
              alt="Logo"
              className="w-[120px] hidden dark:flex"
            />
          </div>
        </Link>

        <div className="relative flex-1 mx-4 md:mx-[300px]">
          <input
            type="text"
            placeholder="Search cars, models, parts..."
            value={query}
            onChange={handleSearch}
            className="w-full px-4 py-2 rounded-[10px] border border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-[#3b4a71] dark:text-white"
          />

          {results.length > 0 && (
            <div className="absolute top-[45px] left-0 w-full max-h-[300px] overflow-y-auto bg-white dark:bg-[#3b4a71] rounded-[10px] shadow-lg z-50">
              {results.map((item, idx) => (
                <Link key={idx} href={item.href}>
                  <div className="p-3 border-b border-gray-200 dark:border-[#2d3c60] hover:bg-gray-100 dark:hover:bg-[#2d3c80] cursor-pointer">
                    <strong>{item.type}</strong>: {item.name}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Link href={"/login"}>
            <button className="hidden md:block bg-[#5252ff] px-6 py-2 text-white font-bold rounded-[10px]">
              Log in
            </button>
          </Link>

          <button
            className="md:hidden p-2 rounded bg-gray-200 dark:bg-[#3b4a71]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-[#2d3c60] shadow-md">
          <Link href="/login">
            <div className="p-4 border-b border-gray-200 dark:border-[#3b4a60] cursor-pointer">
              Log in
            </div>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
