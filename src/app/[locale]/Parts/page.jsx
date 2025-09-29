"use client";

import { use } from "react";
import Link from "next/link";
import axios from "axios";
import React, { useState, useEffect } from "react";

const BASIC_URL = "http://localhost:3000/data";

export default function PartPage({ params }) {
  const { brandId, partId } = params;
  const [part, setPart] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(BASIC_URL);
        const data = response.data.categories || [];
        const partsCategory = data.find((c) => c.name === "Parts");
        if (!partsCategory) return;

        const brand = partsCategory.brands.find(
          (b) => b.brandId.toString() === brandId
        );
        if (!brand) return;

        const foundPart = brand.parts.find((p) => p.id.toString() === partId);
        setPart(foundPart);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [brandId, partId]);

  if (!part) return <div>Loading...</div>;

  return (
    <div className="pt-[100px] md:px-[50px] px-[20px]">
      <h1 className="text-2xl font-bold">{part.name}</h1>
      <p>Brand ID: {brandId}</p>
      <p>Part ID: {part.id}</p>
      <Link href="/Parts">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Back
        </button>
      </Link>
    </div>
  );
}
