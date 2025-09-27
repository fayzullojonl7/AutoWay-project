import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <section className="max-w-[1600px] flex rounded-b-[20px] fixed z-[10] w-[100%] bg-white px-[40px] py-[10px] md:py-[20px] justify-between items-center shadow-md">
      <Link href={"/"}>
        <img
          src="/images/pages/home/header/autoWay-Light.jpg"
          alt=""
          className="w-[150px] "
        />
      </Link>
      <Link href={"/login"}>
        <button className="bg-[#5252ff] px-[30px] h-[40px] text-white font-bold rounded-[10px]">
          log in
        </button>
      </Link>
    </section>
  );
};

export default Header;
