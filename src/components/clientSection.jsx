"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const reviews = [
  {
    id: 1,
    name: "Alex Johnson",
    title: "Satisfied Client",
    comment: "Incredible detailing, my car shines like new!",
    image:
      "https://i.pinimg.com/736x/22/5f/4c/225f4c968155fcd81cc89182f673583b.jpg",
  },
  {
    id: 2,
    name: "Maria Lopez",
    title: "Happy Customer",
    comment: "They brought my car back to life — amazing job!",
    image:
      "https://i.pinimg.com/736x/88/ae/fb/88aefb54ee3f3e7191b3df89b5230ad0.jpg",
  },
  {
    id: 3,
    name: "John Smith",
    title: "Car Enthusiast",
    comment: "Perfect polish, no scratches left at all.",
    image:
      "https://i.pinimg.com/1200x/52/09/f6/5209f6863f1e5a4e552bdbbc30bf20fb.jpg",
  },
  {
    id: 4,
    name: "Sophia Brown",
    title: "Returning Client",
    comment: "Professional and fast — 10/10 experience.",
    image:
      "https://i.pinimg.com/736x/04/32/0f/04320f63f177eac45bfeac2b8d0436e6.jpg",
  },
];

export default function ClientReviews() {
  const [loaded, setLoaded] = useState({});

  useEffect(() => {
    reviews.forEach((review) => {
      const img = new Image();
      img.src = review.image;
      img.onload = () => {
        setLoaded((prev) => ({ ...prev, [review.id]: true }));
      };
    });
  }, []);

  return (
    <section className="py-20 bg-[#f8f8f8] dark:bg-[#0f0f0f]">
      <div className="max-w-[1300px] mx-auto px-4">
        <h2 className="text-center text-3xl font-semibold mb-12 text-gray-900 dark:text-gray-100">
          What Our Clients Say
        </h2>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="relative w-[90%] sm:w-[350px] h-[450px] rounded-[30px] overflow-hidden shadow-lg mx-auto transition-transform duration-300 hover:scale-[1.03]">
                {!loaded[review.id] && (
                  <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse" />
                )}

                {loaded[review.id] && (
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      backgroundImage: `url(${review.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                )}

                <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-black/80 via-black/30 to-transparent backdrop-blur-md p-6 flex flex-col justify-end">
                  <h3 className="text-white text-lg font-semibold tracking-wide drop-shadow-sm">
                    {review.name}
                  </h3>
                  <p className="text-gray-200 text-sm opacity-90 drop-shadow-sm">
                    {review.title}
                  </p>
                  <p className="text-gray-300 text-sm mt-2 italic leading-snug drop-shadow-sm">
                    “{review.comment}”
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30 pointer-events-none" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
