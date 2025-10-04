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
import FeaturedCars from "@/components/featuredCars";
import ClientReviewsSwiper from "@/components/clientSection";
import CarNewsSection from "@/components/latestCarNews";

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
                  className="dark:shadow-md bg-white dark:bg-[#ffffff1d] flex flex-col p-[20px] text-[30px] overflow-hidden rounded-[20px] h-[200px] w-[350px] md:w-[330px] justify-between shadow-md 
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
        {/* FEATURED CARS SECTION */}
        <section>
          <FeaturedCars />
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
        <section>
          <ClientReviewsSwiper />
        </section>

        {/* LATEST NEWS SECTION */}
        <section>
          <CarNewsSection />
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
