"use client";

import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const featuredCars = [
  {
    id: 1,
    name: "BMW M4",
    brand: "BMW",
    price: "$75,000",
    image:
      "https://i.pinimg.com/1200x/b1/df/37/b1df3711ae3ca2a9b4774ae0afd3a868.jpg",
  },
  {
    id: 2,
    name: "Audi RS7",
    brand: "Audi",
    price: "$95,000",
    image:
      "https://i.pinimg.com/736x/33/f6/5f/33f65fe824960c06245c3690e0037d66.jpg",
  },
  {
    id: 3,
    name: "Mercedes-AMG GT",
    brand: "Mercedes",
    price: "$120,000",
    image:
      "https://i.pinimg.com/1200x/48/8b/e5/488be5e777e76535d0c18f6dcc9c877e.jpg",
  },
  {
    id: 4,
    name: "Porsche 911",
    brand: "Porsche",
    price: "$150,000",
    image:
      "https://i.pinimg.com/736x/e4/36/a7/e436a705e3ff3165d1fc943ef0cbb629.jpg",
  },
  {
    id: 5,
    name: "Tesla Model S Plaid",
    brand: "Tesla",
    price: "$130,000",
    image:
      "https://i.pinimg.com/1200x/71/27/f1/7127f11ba2fe84d3d40076eac7600e22.jpg",
  },
  {
    id: 6,
    name: "Lamborghini Huracan",
    brand: "Lamborghini",
    price: "$220,000",
    image:
      "https://i.pinimg.com/736x/8f/0e/8e/8f0e8e51ad1f52ad4b79af521de90b53.jpg",
  },
];

export default function FeaturedCarsSwiper() {
  const [loadedImages, setLoadedImages] = useState({});
  const refs = useRef({});

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.id;
            const img = new Image();
            img.src = featuredCars.find((c) => c.id === +id).image;
            img.onload = () => handleImageLoad(+id);
          }
        });
      },
      { threshold: 0.25 }
    );

    Object.values(refs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      Object.values(refs.current).forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section className="py-20 bg-[#f8f8f8] dark:bg-[#0f0f0f]">
      <div className="max-w-[1500px] mx-auto px-4">
        <h1 className="text-center text-3xl font-semibold mb-12 text-gray-900 dark:text-gray-100">
          Featured Cars
        </h1>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 30 },
            768: { slidesPerView: 2, spaceBetween: 35 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
            1280: { slidesPerView: 4, spaceBetween: 50 },
          }}
        >
          {featuredCars.map((car) => (
            <SwiperSlide key={car.id}>
              <div
                ref={(el) => (refs.current[car.id] = el)}
                data-id={car.id}
                className="relative w-[300px] h-[400px] rounded-[30px] overflow-hidden shadow-lg mx-auto transition-transform duration-300"
                aria-label={`${car.name}, ${car.brand}, priced at ${car.price}`}
              >
                {!loadedImages[car.id] && (
                  <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-[30px] z-10" />
                )}

                <div
                  className="absolute inset-0 rounded-[30px] transition-opacity duration-500"
                  style={{
                    opacity: loadedImages[car.id] ? 1 : 0,
                    backgroundImage: loadedImages[car.id]
                      ? `url(${car.image})`
                      : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                <div className="absolute bottom-0 left-0 w-full h-[22%] bg-gradient-to-t from-black/85 via-black/50 to-transparent backdrop-blur-md p-6 flex flex-col justify-end z-20">
                  <h2 className="text-white text-xl font-bold tracking-wide drop-shadow-md">
                    {car.name}
                  </h2>
                  <p className="text-gray-300 text-sm uppercase mb-1">
                    {car.brand}
                  </p>
                  <p className="text-white text-lg font-semibold">
                    {car.price}
                  </p>
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40 pointer-events-none" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
