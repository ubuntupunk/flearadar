"use client";

import Link from "next/link";
import React, {useRef, useState } from "react";
import SupaAuthButton from "./SupaAuthButton";
import SearchBar from "./SearchBar";
import Image from "next/image";

const provinces = [
  "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal",
  "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Western Cape"
];

const marketsFoodEvents = [
  "Weekend Markets", "Food Trucks", "Kasi Shopping", "Everyday Markets", "Events"
];

const Header: React.FC = () => {
  const [imageSize, setImageSize] = useState({ width: 1, height: 1 });
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);


  const handleMouseEnter = (dropdown: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 300);
  };

  return (
    <nav className="bg-white shadow-sm dark:bg-gray-800 fixed top-0 left-0 w-full z-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link className="flex items-center space-x-2 -ml-2" href="/">
            <Image 
              src="/images/flea.png"
              alt="Flea Logo"
              className="h-8 w-auto"
              priority={true}
              onLoad={(event) => {
                const img = event.currentTarget;
                setImageSize({
                  width: img.naturalWidth,
                  height: img.naturalHeight
                });
              }}
              width={imageSize.width}
              height={imageSize.height}
            />
            <span className="text-xl font-bold text-gray-900 dark:text-white">FleaRadar</span>
          </Link>

          <div className="flex items-center space-x-6 ml-auto relative">
            <div 
              className="relative group"
              onMouseEnter={() => handleMouseEnter("provinces")}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-4 py-3 text-sm font-bold flex items-center"
              >
                PROVINCES
                <svg className="ml-1 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"></path></svg>
              </button>
              {activeDropdown === "provinces" && (
                <div className="absolute left-0 mt-2 w-52 bg-gray-600 text-white shadow-lg sharp-edge px-3 py-3 group-hover:block pointer-events-auto">
                  <div className="absolute top-0 left-12 -mt-2 w-4 h-4 bg-gray-600 transform rotate-45 border-t border-l border-gray-600"></div>
                  {provinces.map((province, index) => (
                    <Link 
                      key={province} 
                      href={`/province/${province.toLowerCase().replace(/\s+/g, "-")}`}
                      className={`block w-full px-5 py-1.5 text-start text-xs font-bold leading-5 hover:text-red-500 focus:outline-none transition duration-150 ease-in-out ${index !== provinces.length - 1 ? 'border-b border-gray-400' : ''}`}
                    >
                      {province}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter("markets")}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-4 py-3 text-sm font-bold flex items-center"
              >
                MARKETS, FOOD & EVENTS 
                <svg className="ml-1 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"></path></svg>
              </button>
              {activeDropdown === "markets" && (
                <div className="absolute right-0 mt-2 w-52 bg-gray-600 text-white shadow-lg sharp-edge px-3 py-3 group-hover:block pointer-events-auto">
                  <div className="absolute top-0 left-12 -mt-2 w-4 h-4 bg-gray-600 transform rotate-45 border-t border-l border-gray-600"></div>
                  {marketsFoodEvents.map((item,index) => (
                    <Link 
                      key={item} 
                      href={`/category/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className={`block w-full px-5 py-1.5 text-start text-xs font-bold leading-5 hover:text-red-500 focus:outline-none transition duration-150 ease-in-out ${index !== marketsFoodEvents.length - 1 ? 'border-b border-gray-400' : ''}`}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div>
              <SupaAuthButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
