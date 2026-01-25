'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaInstagram } from 'react-icons/fa';
import logo from '@/src/assets/Logoo2.png';
import { getImageUrl } from '@/utils/imageUtils';

const Header = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tours', href: '/tours' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-white/80 backdrop-blur shadow-sm transition-all duration-300">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          <div className="w-20 h-10 sm:w-24 sm:h-14 rounded-full overflow-hidden flex items-center justify-center">
            <img src={getImageUrl(logo)} alt="Golden tours Tours Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="text-lg sm:text-2xl font-extrabold text-gray-800 tracking-wide">GOLDEN TOURS</div>
            <div className="text-xs text-gray-500 tracking-widest hidden sm:block">TOURS & TRAVEL</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex space-x-8 font-medium text-gray-700">
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`hover:text-orange-500 transition relative after:content-[''] after:block after:h-0.5 after:bg-orange-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${isActive(item.href) ? 'text-orange-500 after:scale-x-100' : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Instagram Icon Only */}
        <div className="flex sm:hidden items-center">
          <a
            href="https://www.instagram.com/goldentours.eg?igsh=MW52aHFqNGliMmh6Mg=="
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white text-orange-500 transition"
            aria-label="Instagram"
          >
            <FaInstagram size={16} />
          </a>
        </div>

        {/* Desktop Social + Book Now */}
        <div className="hidden sm:flex items-center space-x-3 lg:space-x-4">
          <a
            href="https://www.instagram.com/goldentours.eg?igsh=MW52aHFqNGliMmh6Mg=="
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white text-orange-500 transition"
            aria-label="Instagram"
          >
            <FaInstagram size={16} />
          </a>
          <a
            href="http://wa.me/201507000720"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 text-white px-4 py-2 lg:px-6 lg:py-2 rounded-full shadow font-bold text-sm lg:text-base hover:bg-orange-600 transition"
          >
            Book Now
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
