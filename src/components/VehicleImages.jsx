"use client";
import { useState, useEffect } from "react";

export default function VehicleImage({ cardCover, carImages, name }) {
  const [hovered, setHovered] = useState(false);
  const [currentImg, setCurrentImg] = useState(cardCover);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (hovered && carImages.length > 0) {
      interval = setInterval(() => {
        setCurrentImg(carImages[index]);
        setIndex((prev) => (prev + 1) % carImages.length);
      }, 1000); // листаем каждые 1 сек
    } else {
      setCurrentImg(cardCover);
      setIndex(0);
    }
    return () => clearInterval(interval);
  }, [hovered, index, carImages, cardCover]);

  return (
    <div
      className="md:h-[218px] h-[260px]  items-center justify-center overflow-hidden rounded-t-[20px] w-[100%] hidden  md:flex  "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={currentImg}
        alt={name}
        className="w-full h-full object-cover rounded-t-[20px] transition-all duration-500"
      />
    </div>
  );
}
