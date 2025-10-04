"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
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
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const response = await axios.get(BASIC_URL);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const LazyImage = ({
    src,
    alt,
    className,
    width,
    height,
    priority = false,
  }) => (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`${className} rounded-[20px]`}
      placeholder="blur"
      blurDataURL="/images/placeholder.png"
      priority={priority}
    />
  );

  return (
    <>
      <section className="px-[20px] md:px-[50px] pt-[80px] md:pt-[120px] pb-[40px]">
        <section className="md:rounded-[30px] overflow-hidden">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {[
              {
                desktop: "/images/pages/home/Swiper1/Slide1.png",
                mobile: "/images/pages/home/Swiper1/Slide1Mb.png",
                href: "/Cars",
                buttonText: "Explore",
                buttonStyles: "text-[black] bg-[white]",
                top: "md:top-[445px] top-[508px]",
                left: "md:left-[690px] left-[10px]",
              },
              {
                desktop: "/images/pages/home/Swiper1/Slide2.png",
                mobile: "/images/pages/home/Swiper1/Slide2Mb.png",
                href: "/Service",
                buttonText: "Explore",
                buttonStyles: "text-[#ffffff] bg-[#000000]",
                top: "md:top-[480px] top-[510px]",
                left: "md:left-[60px] left-[10px]",
              },
              {
                desktop: "/images/pages/home/Swiper1/Slide3.png",
                mobile: "/images/pages/home/Swiper1/Slide3Mb.png",
                href: "/Detailing",
                buttonText: "Explore",
                buttonStyles: "text-[#000000] bg-[#fffbfb]",
                top: "md:top-[470px] bottom-[20px]",
                right: "md:right-[450px] right-[190px]",
              },
              {
                desktop: "/images/pages/home/Swiper1/Slide4.png",
                mobile: "/images/pages/home/Swiper1/Slide4Mb.png",
                href: "/Parts",
                buttonText: "Explore",
                buttonStyles: "text-[#000000] bg-[#ffffff]",
                top: "md:top-[320px] top-[150px]",
                left: "md:left-[60px] left-[10px]",
              },
            ].map((slide, idx) => (
              <SwiperSlide key={idx}>
                <section className="md:h-[650px] relative">
                  <LazyImage
                    src={slide.desktop}
                    alt={`Slide ${idx + 1}`}
                    width={1200}
                    height={650}
                    className="hidden md:flex w-full h-full"
                    priority={idx < 2} // первые 2 слайда грузятся сразу для SEO
                  />
                  <LazyImage
                    src={slide.mobile}
                    alt={`Slide ${idx + 1} Mobile`}
                    width={600}
                    height={400}
                    className="md:hidden w-full h-full"
                    priority={idx < 2}
                  />
                  <Link href={slide.href}>
                    <button
                      className={`absolute z-[2] w-[150px] h-[53px] md:w-[160px] md:h-[63px] font-bold rounded-[30px] ${
                        slide.buttonStyles
                      } ${slide.top || ""} ${slide.left || ""} ${
                        slide.right || ""
                      }`}
                    >
                      {slide.buttonText}
                    </button>
                  </Link>
                </section>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section className="flex flex-col gap-[30px] py-[50px]">
          <h1 className="text-center text-[30px] font-bold">CATEGORIES</h1>
          <div className="flex flex-wrap gap-[15px]">
            {data?.categories?.map((cat) => (
              <Link href={cat.name} key={cat.id}>
                <div className="dark:shadow-md bg-white dark:bg-[#ffffff1d] flex flex-col p-[20px] text-[30px] overflow-hidden rounded-[20px] h-[200px] w-[350px] md:w-[330px] justify-between shadow-md transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                  <h1 className="font-bold">{cat.name}</h1>
                  <LazyImage
                    src={cat.categoryImage}
                    alt={cat.name}
                    width={300}
                    height={100}
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section
          className="py-[50px] bg-gray-100 dark:bg-[#0f0f0f] rounded-[20px] px-[30px]"
          style={{ minHeight: "220px" }}
        >
          <h1
            className="text-center text-[30px] font-bold mb-[20px]"
            style={{ lineHeight: 1.2 }}
          >
            ABOUT US
          </h1>
          <p
            className="text-center text-[18px] text-gray-600 dark:text-gray-300 max-w-[800px] mx-auto"
            style={{ minHeight: "72px", lineHeight: 1.5 }}
          >
            We are passionate about bringing the most exclusive and premium cars
            to our clients. Our mission is simple: help you find your dream car
            with comfort, trust, and elegance.
          </p>
        </section>

        <section className="py-[50px] rounded-[20px] ">
          <DetailingSection />
        </section>

        <section>
          <FeaturedCars />
        </section>

        <section className="py-[50px] rounded-[20px] ">
          <ServiceSection />
        </section>

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

        <section>
          <ClientReviewsSwiper />
        </section>

        <section>
          <CarNewsSection />
        </section>

        <section>
          <PartnersMarquee />
        </section>
      </section>
      <Footer />
    </>
  );
}
