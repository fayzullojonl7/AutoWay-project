"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const BASIC_URL = "http://localhost:3000/data"; // путь к твоему db.json

export default function ServiceDetailPage() {
  const params = useParams();
  const { detById, id } = params;

  const [detailing, setDetailing] = useState(null);
  const [service, setService] = useState(null);
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(BASIC_URL);
        const data = response.data;

        const det = data.categories
          ?.find((cat) => cat.name === "Detailing")
          ?.detailings.find((d) => d.id === parseInt(detById));

        if (!det) {
          setDetailing(null);
          setService(null);
          setLoading(false);
          return;
        }

        const serv = det.services.find((s) => s.id === parseInt(id));

        setDetailing(det);
        setService(serv);

        if (serv) {
          const imgs =
            serv.images && serv.images.length > 0 ? serv.images : [serv.image];
          setImages(imgs);
          setActiveImage(imgs[0]);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    fetchData();
  }, [detById, id]);

  // Skeleton для изображения и превью
  if (loading)
    return (
      <section className="p-6 pt-[100px] px-[20px] md:px-[50px] mx-auto">
        <div className="animate-pulse flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="rounded-[20px] bg-gray-300 dark:bg-gray-700 h-64 md:h-96 mb-3" />
            <div className="flex gap-2 overflow-x-auto">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg bg-gray-300 dark:bg-gray-700"
                />
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-gray-300 dark:bg-gray-700 rounded-[20px] shadow-md p-6 h-40 mb-4" />
            <div className="flex flex-col gap-4 md:gap-[20px] md:flex-row">
              <div className="flex-1 bg-gray-300 dark:bg-gray-700 p-4 rounded-lg shadow-sm h-20" />
              <div className="flex-1 bg-gray-300 dark:bg-gray-700 p-4 rounded-lg shadow-sm h-20" />
            </div>
          </div>
        </div>
      </section>
    );

  if (!service) return <p className="p-6 text-center">Service not found!</p>;

  return (
    <section className="p-6 pt-[100px] px-[20px] md:px-[50px] mx-auto">
      <Link
        href={`/Detailing/${params.detById}`}
        className="text-blue-500 hover:underline"
      >
        ← Back to {detailing?.name}
      </Link>

      <div className="mt-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="rounded-[20px] overflow-hidden shadow-md">
            <img
              src={activeImage}
              alt={service.title}
              loading="lazy"
              className="w-full h-64 md:h-96 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>

          <div className="flex gap-2 mt-3 overflow-x-auto">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden cursor-pointer border-2 ${
                  img === activeImage ? "border-blue-500" : "border-transparent"
                }`}
                onClick={() => setActiveImage(img)}
              >
                <img
                  src={img}
                  alt={`Preview ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white dark:bg-[#ffffff14] rounded-[20px] shadow-md p-6">
            <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {service.description}
            </p>
          </div>

          <div className="flex flex-col gap-4 md:gap-[20px] md:flex-row">
            <div className="flex-1 bg-[#f3f3f3] dark:bg-[#ffffff14] p-4 rounded-lg shadow-sm">
              <h3 className="font-bold mb-2 text-[20px]">Price</h3>
              <p>${service.price || "N/A"}</p>
            </div>
            <div className="flex-1 bg-[#f3f3f3] dark:bg-[#ffffff14] p-4 rounded-lg shadow-sm">
              <h3 className="font-bold mb-2 text-[20px]">Phone</h3>
              <p>{service.phone || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
