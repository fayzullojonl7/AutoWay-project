"use client";

import Link from "next/link";
import { FiHome, FiSearch, FiUser, FiSettings, FiPlus } from "react-icons/fi";

export default function MobileMenu() {
  return (
    <div className="fixed bottom-0 w-full flex justify-between items-center px-6 bg-[white] dark:bg-[#2d3c60] shadow-t z-50">
      <div className="flex gap-6">
        <Link href={"/"}>
          <button className="flex flex-col items-center">
            <FiHome size={24} className="cursor-pointer" />
            <h1 className="text-[12px]">Home</h1>
          </button>
        </Link>
        <button className="flex flex-col items-center">
          <FiSearch size={24} className="cursor-pointer" />
          <h1 className="text-[12px]">Search</h1>
        </button>
      </div>

      <Link href="/AddPage">
        <button className="bg-[#5252ff] text-white p-5 rounded-full shadow-xl -translate-y-1/3 hover:bg-blue-700 transition">
          <FiPlus size={28} />
        </button>
      </Link>

      <div className="flex gap-6">
        <Link href={"MyProfile"}>
          <button className="flex flex-col items-center">
            <FiUser size={24} className="cursor-pointer" />
            <h1 className="text-[12px]">Profile</h1>
          </button>
        </Link>
        <Link href={"/WishList"}>
          <button className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            <p className="text-[12px]">Favourite</p>
          </button>
        </Link>
      </div>
    </div>
  );
}
