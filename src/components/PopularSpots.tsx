
"use client";

import React from 'react';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import spots from "../app/data/spots.json";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PopularSpotExpandable from './PopularSpotExpandable';

interface Spot {
  city: string;
  listings: string;
  image: string;
}

export default function PopularSpots(): React.ReactElement {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
      loop: true,
      mode: "free-snap",
      renderMode: "performance",
      slides: {
        perView: 1,
        spacing: 16,
      },
      breakpoints: {
        "(min-width: 640px)": {
          slides: { perView: 2, spacing: 20 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 4, spacing: 24 },
        },
      },
      created(slider) {
        setInterval(() => slider.next(), 3000);
      }
    });
  
  return (
    <section className="pb-2 py-6">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-3 text-center">
          <h2 className="text-gray-700 text-2xl font-bold mb-2">Most Popular Spots</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm max-w-lg mx-auto leading-relaxed mb-6">
            The most popular cities for trading flea markets in South Africa
          </p>
        </div>

        <div className="relative">
          {/* Left Chevron */}
          <button
            onClick={() => instanceRef.current?.prev()}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-red-600 p-2 rounded-full shadow-md z-10 hover:bg-red-50"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Slider */}
          <div ref={sliderRef} className="keen-slider px-2 py-3">
            {(spots as Spot[]).map((spot: Spot, index: number) => (
              <div
                key={`${index}`}
                className="keen-slider__slide flex justify-center"
              >
                <div className="w-full max-w-sm bg-white shadow-md rounded-sm overflow-hidden flex flex-col h-full">
                  <div className="p-4 flex flex-col flex-grow">
                    <PopularSpotExpandable spot={spot} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Chevron */}
          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-red-600 p-2 rounded-full shadow-md z-10 hover:bg-red-50"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
