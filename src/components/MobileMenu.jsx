"use client";

import Link from "next/link";
import { FiHome, FiSearch, FiUser, FiSettings, FiPlus } from "react-icons/fi";

export default function MobileMenu() {
  return (
    <div className="fixed bottom-0 w-full flex justify-between items-center px-6 py-3 bg-white shadow-t z-50">
        
      <div className="flex gap-6">
        <FiHome size={24} className="cursor-pointer" />
        <FiSearch size={24} className="cursor-pointer" />
      </div>

      <Link href="/add-car">
        <button className="bg-blue-600 text-white p-5 rounded-full shadow-xl -translate-y-1/2 hover:bg-blue-700 transition">
          <FiPlus size={28} />
        </button>
      </Link>

      <div className="flex gap-6">
        <FiUser size={24} className="cursor-pointer" />
        <FiSettings size={24} className="cursor-pointer" />
      </div>
    </div>
  );
}
