import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function CarNewsSwiper() {
  const news = [
    {
      id: 1,
      title: "BMW Unveils the New M3 2025",
      date: "Oct 1, 2025",
      excerpt:
        "BMW has just revealed the all-new M3 with improved aerodynamics, 500+ hp engine, and advanced tech features. A true beast on the road!",
      image:
        "https://i.pinimg.com/1200x/5b/8b/e3/5b8be3ec075a7ebbd51adf8fb99f01e4.jpg",
    },
    {
      id: 2,
      title: "Tesla Model S Plaid Review",
      date: "Sep 28, 2025",
      excerpt:
        "We took the Tesla Model S Plaid for a spin. Incredible acceleration, autopilot features, and futuristic interior make it a must-drive.",
      image:
        "https://i.pinimg.com/1200x/77/37/e9/7737e9ca44b0822c0381e1a7685e0505.jpg",
    },
    {
      id: 3,
      title: "Top 5 Electric Cars in 2025",
      date: "Sep 25, 2025",
      excerpt:
        "Electric vehicles are taking over. Check out our list of top 5 EVs this year, including range, performance, and innovative features.",
      image:
        "https://i.pinimg.com/1200x/42/6a/a7/426aa702ff5b33a0a214eeecce5b6ba7.jpg",
    },
    {
      id: 4,
      title: "Lamborghini Aventador Road Test",
      date: "Sep 22, 2025",
      excerpt:
        "Experience the thrill of the Lamborghini Aventador in our latest road test. Speed, design, and luxury combined in a supercar masterpiece.",
      image:
        "https://i.pinimg.com/1200x/71/9e/41/719e41cbbe89d89d7852b5f7081db7df.jpg",
    },
    {
      id: 5,
      title: "How to Choose the Best SUV",
      date: "Sep 18, 2025",
      excerpt:
        "SUV buying guide: tips on engine, comfort, safety, and style to help you pick the perfect SUV for your family and adventures.",
      image:
        "https://i.pinimg.com/736x/72/b9/67/72b967d26124b18b88e61d8425fbeb18.jpg",
    },
    {
      id: 6,
      title: "Future of Autonomous Cars",
      date: "Sep 15, 2025",
      excerpt:
        "Self-driving cars are closer than you think. Discover the latest advancements, challenges, and predictions for autonomous vehicles.",
      image:
        "https://i.pinimg.com/1200x/ed/f0/40/edf040f76f19a382ca1af44f1014cc4f.jpg",
    },
  ];

  return (
    <section className="py-[60px]">
      <h1 className="text-center text-[32px] font-bold mb-[40px]">
        LATEST CAR NEWS
      </h1>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={40} // большие отступы между карточками
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 30 },
          640: { slidesPerView: 2, spaceBetween: 40 },
          1024: { slidesPerView: 3, spaceBetween: 50 },
          1280: { slidesPerView: 4, spaceBetween: 60 },
        }}
        className="px-[40px]"
      >
        {news.map((post) => (
          <SwiperSlide key={post.id}>
            <div className="bg-white dark:bg-[#1d1d1d] rounded-[20px] overflow-hidden shadow-md hover:shadow-2xl h-[430px] transition-all duration-300">
              <div className="relative w-full h-[230px] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-[20px]">
                <h2 className="text-[20px] font-bold mb-[5px]">{post.title}</h2>
                <p className="text-gray-500 text-[14px] mb-[10px]">
                  {post.date}
                </p>
                <p className="text-[15px] text-gray-600 dark:text-gray-300 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
