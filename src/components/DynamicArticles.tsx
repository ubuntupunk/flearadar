"use client";

import React from 'react';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import latestArticles from "../app/data/articles.json";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DynamicArticlesExpandable from './DynamicArticlesExpandable';

// Define the Article interface
interface Article {
  title: string;
  categories: string[];
  author: string;
  date: string;
  time: string;
  image: string;
}

export default function DynamicArticles(): React.ReactElement {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'free',
    rtl: false,
    slides: {
      perView: 2,
      spacing: 16,
    },
    breakpoints: {
      '(max-width: 768px)': {
        slides: {
          perView: 1,
          spacing: 12,
        },
      },
    },
    created(slider) {
      let timeout: ReturnType<typeof setTimeout>
      let mouseOver = false
      
      function clearNextTimeout() {
        clearTimeout(timeout)
      }
      
      function nextTimeout() {
        clearTimeout(timeout)
        if (mouseOver) return
        timeout = setTimeout(() => {
          slider.moveToIdx(slider.track.details.abs + 1, true, {
            duration: 1500
          })
        }, 2000)
      }
      
      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true
          clearNextTimeout()
        })
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false
          nextTimeout()
        })
        nextTimeout()
      })
      slider.on("dragStarted", clearNextTimeout)
      slider.on("animationEnded", nextTimeout)
      slider.on("updated", nextTimeout)
    }
  });

  return (
    <section className="py-6">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-6 text-center">
          <h2 className="text-gray-800 dark:text-white text-xl font-bold mb-2">
            Articles & Guides
          </h2>
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
          <div ref={sliderRef} className="keen-slider">
           {latestArticles.map((article: Article, index: number) => (
           <DynamicArticlesExpandable key={index} article={article} />
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
