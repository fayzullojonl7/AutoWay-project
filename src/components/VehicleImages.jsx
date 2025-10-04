"use client";
import { useState, useEffect } from "react";

export default function VehicleImage({ cardCover, carImages, name }) {
  const [hovered, setHovered] = useState(false);
  const [currentImg, setCurrentImg] = useState(cardCover);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let interval;
    if (hovered && carImages.length > 0) {
      interval = setInterval(() => {
        setCurrentImg(carImages[index]);
        setIndex((prev) => (prev + 1) % carImages.length);
      }, 1000);
    } else {
      setCurrentImg(cardCover);
      setIndex(0);
    }
    return () => clearInterval(interval);
  }, [hovered, index, carImages, cardCover]);

  return (
    <div
      className="md:h-[218px] h-[260px] w-full rounded-t-[20px] overflow-hidden relative flex items-center justify-center hidden md:flex"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse z-10 rounded-t-[20px]" />
      )}

      <img
        src={currentImg}
        alt={name}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="w-full h-full object-cover rounded-t-[20px] transition-all duration-500 relative z-20"
      />
    </div>
  );
}
