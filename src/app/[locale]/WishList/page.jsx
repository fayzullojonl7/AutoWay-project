"use client";
import { useEffect, useState } from "react";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      setWishlist(JSON.parse(stored));
    }
  }, []);

  const handleRemove = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <section className="pt-[120px] flex flex-col px-6 gap-8 md:px-20">
      <section className="py-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Wishlist <span className="text-gray-500">({wishlist.length})</span>
        </h1>

        {wishlist.length === 0 ? (
          <p className="text-gray-500 text-xl">В избранном пока пусто 🚗</p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {wishlist.map((car) => (
              <div
                key={car.id}
                className="w-[270px] bg-white dark:bg-[#2c2c2c] shadow rounded-lg overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={car.cardCover}
                    alt={car.carName}
                    className="h-48 w-full object-cover"
                  />
                  <button
                    onClick={() => handleRemove(car.id)}
                    className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-red-500 hover:text-white transition"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{car.carName}</h2>
                  <p className="text-gray-600">${car.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
};

export default WishlistPage;
