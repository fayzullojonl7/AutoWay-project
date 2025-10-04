"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import PartnersMarquee from "@/components/partnersMarque";
import Footer from "@/components/Footer";
import DetailingSection from "@/components/detailingSection";
import ServiceSection from "@/components/serviceSection";

const BASIC_URL = "http://localhost:3000/data";

export default function Home() {
  const [data, setData] = useState([]); // сразу массив

  async function getData() {
    try {
      const response = await axios.get(BASIC_URL);
      const data = response.data;
      console.log(data);

      setData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <section className="px-[20px] md:px-[50px] pt-[80px] md:pt-[120px] pb-[40px]">
        <section className="md:rounded-[30px] overflow-hidden">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <section className="md:h-[650px] relative">
                <img
                  src="/images/pages/home/Swiper1/Slide1.png"
                  alt="m5"
                  className="w-[100%] rounded-[20px] h-[100%] hidden md:flex"
                />
                <img
                  src="/images/pages/home/Swiper1/Slide1Mb.png"
                  alt="m5"
                  className="w-[100%] rounded-[20px] h-[100%] "
                />
                <Link href={"/Cars"}>
                  <button className="text-[20px] text-[black] font-bold bg-[white] w-[150px] h-[53px] rounded-[30px] absolute z-[2] md:top-[445px] top-[508px] left-[10px] md:left-[690px]">
                    Explore
                  </button>
                </Link>
              </section>
            </SwiperSlide>
            <SwiperSlide>
              <section className="md:h-[650px] relative">
                <img
                  src="/images/pages/home/Swiper1/Slide2.png"
                  alt="m5"
                  className="w-[100%] rounded-[20px] h-[100%] hidden md:flex"
                />
                <img
                  src="/images/pages/home/Swiper1/Slide2Mb.png"
                  alt="m5"
                  className="w-[100%] rounded-[20px] h-[100%] "
                />
                <Link href={"/Service"}>
                  <button className="text-[20px] text-[#ffffff] font-bold bg-[#000000] w-[160px] h-[63px] rounded-[30px] absolute z-[2] top-[510px] md:top-[480px] left-[10px] md:left-[60px]">
                    Explore
                  </button>
                </Link>
              </section>
            </SwiperSlide>
            <SwiperSlide>
              <section className="md:h-[650px] relative">
                <img
                  src="/images/pages/home/Swiper1/Slide3.png"
                  alt="m5"
                  className="w-[100%] rounded-[20px] h-[100%] hidden md:flex"
                />
                <img
                  src="/images/pages/home/Swiper1/Slide3Mb.png"
                  alt="m5"
                  className="w-[100%] rounded-[20px] h-[100%] "
                />
              </section>
              <Link href={"/Detailing"}>
                <button className="text-[20px] text-[#000000] font-bold bg-[#fffbfb] w-[150px] h-[53px] md:w-[160px] md:h-[63px] rounded-[30px] absolute z-[2] bottom-[20px] md:top-[470px] right-[190px] md:right-[450px]">
                  Explore
                </button>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <section className="md:h-[650px] relative">
                <img
                  src="/images/pages/home/Swiper1/Slide4.png"
                  alt="m5"
                  className="w-[100%] rounded-[20px] h-[100%] hidden md:flex"
                />
                <img
                  src="/images/pages/home/Swiper1/Slide4Mb.png"
                  alt="m5"
                  className="w-[100%] rounded-[20px] h-[100%] "
                />
              </section>
              <Link href={"/Parts"}>
                <button className="text-[20px] text-[#000000] font-bold bg-[#ffffff] w-[150px] h-[53px] md:w-[160px] mdLh-[63px] rounded-[30px] absolute z-[2] top-[150px] md:top-[320px] left-[10px] md:left-[60px]">
                  Explore
                </button>
              </Link>
            </SwiperSlide>
          </Swiper>
        </section>

        {/* CATEGORIES SECTION */}
        <section className="flex flex-col gap-[30px] py-[50px]">
          <h1 className="text-center text-[30px] font-bold">CATEGORIES</h1>
          <div className="flex flex-wrap gap-[15px]">
            {data?.categories?.map((cat) => (
              <Link href={cat.name} key={cat.id}>
                <div
                  className="dark:shadow-md bg-white dark:bg-[#ffffff1d] flex flex-col p-[20px] text-[30px] overflow-hidden rounded-[20px] h-[200px] md:w-[330px] justify-between shadow-md 
  transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                >
                  <h1 className="font-bold">{cat.name}</h1>
                  <img
                    src={cat.categoryImage}
                    alt=""
                    className="h-[100px] object-contain"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FEATURED CARS SECTION */}
        <section className="py-[50px]">
          <h1 className="text-center text-[30px] font-bold">FEATURED CARS</h1>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px] mt-[30px]">
            {data?.featuredCars?.map((car) => (
              <div
                key={car.id}
                className="bg-white dark:bg-[#1d1d1d] rounded-[20px] p-[20px] shadow-md hover:shadow-xl transition"
              >
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-[100%] h-[200px] object-cover rounded-[10px]"
                />
                <h2 className="mt-[15px] text-[20px] font-bold">{car.name}</h2>
                <p className="text-gray-500">{car.brand}</p>
                <p className="mt-[10px] font-semibold text-[18px]">
                  {car.price}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="py-[50px] bg-gray-100 dark:bg-[#0f0f0f] rounded-[20px] px-[30px]">
          <h1 className="text-center text-[30px] font-bold mb-[20px]">
            ABOUT US
          </h1>
          <p className="text-center text-[18px] text-gray-600 dark:text-gray-300 max-w-[800px] mx-auto">
            We are passionate about bringing the most exclusive and premium cars
            to our clients. Our mission is simple: help you find your dream car
            with comfort, trust, and elegance.
          </p>
        </section>
        <section className="py-[50px] rounded-[20px] ">
          <DetailingSection />
        </section>
        <section className="py-[50px] rounded-[20px] ">
          <ServiceSection />
        </section>

        {/* CONTACT SECTION */}
        <section className="py-[50px]">
          <h1 className="text-center text-[30px] font-bold mb-[20px]">
            CONTACT US
          </h1>
          <div className="flex flex-col md:flex-row justify-between gap-[20px] max-w-[1000px] mx-auto">
            <div className="flex-1 bg-white dark:bg-[#1d1d1d] rounded-[20px] p-[20px] shadow-md">
              <h2 className="font-bold text-[20px] mb-[10px]">Visit Us</h2>
              <p>Dushanbe, Rudaki Avenue</p>
            </div>
            <div className="flex-1 bg-white dark:bg-[#1d1d1d] rounded-[20px] p-[20px] shadow-md">
              <h2 className="font-bold text-[20px] mb-[10px]">Email</h2>
              <p>info@autoway.com</p>
            </div>
            <div className="flex-1 bg-white dark:bg-[#1d1d1d] rounded-[20px] p-[20px] shadow-md">
              <h2 className="font-bold text-[20px] mb-[10px]">Phone</h2>
              <p>+992 009 29 1001</p>
            </div>
          </div>
        </section>
        {/* TESTIMONIALS SECTION */}
        <section className="py-[50px] bg-gray-50 dark:bg-[#0f0f0f] rounded-[20px] px-[30px]">
          <h1 className="text-center text-[30px] font-bold mb-[40px]">
            WHAT OUR CLIENTS SAY
          </h1>
          <div className="grid md:grid-cols-3 gap-[20px]">
            {[
              {
                id: 1,
                name: "Alice Johnson",
                city: "New York",
                comment: "Amazing service! Highly recommend to everyone.",
                avatar: "https://i.pravatar.cc/100?img=32",
                rating: 5,
              },
              {
                id: 2,
                name: "Mark Smith",
                city: "Los Angeles",
                comment: "Very professional and fast response.",
                avatar: "https://i.pravatar.cc/100?img=12",
                rating: 4,
              },
              {
                id: 3,
                name: "Sophia Lee",
                city: "Chicago",
                comment: "Loved the experience, will come back for sure!",
                avatar: "https://i.pravatar.cc/100?img=56",
                rating: 5,
              },
            ].map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-[#1d1d1d] rounded-[20px] p-[20px] shadow-md flex flex-col items-center text-center"
              >
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-20 h-20 rounded-full mb-4"
                />
                <p className="italic text-gray-600 dark:text-gray-300 mb-2">
                  "{review.comment}"
                </p>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-yellow-400 ${
                        i < review.rating
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <h2 className="font-bold">{review.name}</h2>
                <p className="text-gray-500">{review.city}</p>
              </div>
            ))}
          </div>
        </section>

        {/* LATEST NEWS SECTION */}
        <section className="py-[50px]">
          <h1 className="text-center text-[30px] font-bold mb-[30px]">
            LATEST CAR NEWS
          </h1>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
            {[
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
            ].map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-[#1d1d1d] rounded-[20px] p-[20px] shadow-md hover:shadow-lg transition"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-[250px] w-full object-cover rounded-[10px]"
                />
                <h2 className="mt-[10px] text-[20px] font-bold">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-[14px]">{post.date}</p>
                <p className="mt-[10px] text-[16px] text-gray-600 dark:text-gray-300 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PARTNERS SECTION */}
        <section>
          <PartnersMarquee />
        </section>
      </section>
      <Footer />
    </>
  );
}
