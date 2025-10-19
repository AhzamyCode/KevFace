'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 shadow-lg bg-gray-950">
      {/* desktopsss */}
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4 md:p-6">
        <Link href="/">
          <span className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-green-500 via-green-400 to-green-300 text-transparent bg-clip-text cursor-pointer transition-transform">
            KEVYLL PG
          </span>
        </Link>
        <nav className="hidden md:flex gap-6 text-lg sm:text-xl font-semibold text-white">
          <Link
            href="/chat"
            className="relative text-green-500 font-extrabold transition-all after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-green-400 after:transition-all hover:after:w-full"
          >
            Chat With AI
          </Link>
          <Link
            href="https://ahzamycode.biz.id"
            className="relative text-white transition-all after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-green-400 after:transition-all hover:after:w-full"
          >
            About
          </Link>
          
        </nav>

        {/* button jika mobile */}
        <button
          className="md:hidden text-white text-3xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 text-white flex flex-col gap-4 p-4 border-t border-gray-700">
          <Link href="/chat" className="text-green-500 font-extrabold">
            Chat With AI
          </Link>
          <Link href="https://ahzamycode.biz.id" className="hover:text-green-400 transition-colors">
            About
          </Link>
        </div>
      )}
    </header>
  );
}
