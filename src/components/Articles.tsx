'use client';

import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ArticleExpandable from './ArticleExpandable';
import articles from "../app/data/articles.json";

interface Article {
  title: string;
  categories: string[];
  author: string;
  date: string;
  time: string;
  image: string;
}

export default function Articles(): React.ReactElement {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'snap',
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
      setInterval(() => slider.next(), 3000);
    }
  });

  return (
    <section className="pb-5 pt-5 text-gray-600">
      <div className="container">
        <div className="mb-4 text-center">
          <h2 className="text-gray-800 text-2xl">Articles &nnnnn Guides</h2>
          <p className="text-gray-600">Helpful reviews, details and advice on accessing your local informal marketplace</p>
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
            {(articles as Article[]).map((article: Article, index: number) => (
              <div
                key={`${index}`}
                className="keen-slider__slide flex justify-center"
              >
                <div className="w-full max-w-sm bg-white shadow-md rounded-sm overflow-hidden flex flex-col h-full">
                  <div className="p-4 flex flex-col flex-grow">
                    <ArticleExpandable article={article} />
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
