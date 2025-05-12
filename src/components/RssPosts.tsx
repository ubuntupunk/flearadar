'use client';

import React from 'react';
import Link from 'next/link';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import RssPostsExpandable from './RssPostsExpandable';

interface RssItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
}

interface RssPostsProps {
  rssPosts: RssItem[];
}

export default function RssPosts({ rssPosts }: RssPostsProps): JSX.Element {
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
    <section className="py-6">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-6 text-center">
          <h2 className="text-gray-700 text-2xl font-bold mb-2">Latest Reviews</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm max-w-lg mx-auto leading-relaxed">
            Reviews written by our Community
          </p>
        </div>
        <div className="relative mb-6">
          {/* Left Chevron */}
        <button
          onClick={() => instanceRef.current?.prev()}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-red-600 p-2 rounded-full shadow-md z-10 hover:bg-red-50"
        >
          <ChevronLeft size={24} />
        </button>
          {rssPosts.length > 0 ? (
            <div ref={sliderRef} className="keen-slider">
              {rssPosts.map((post) => (
                <RssPostsExpandable key={post.link} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Loading posts...</p>
            </div>
          )}

          {/* Right Chevron */}
          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-red-600 p-2 rounded-full shadow-md z-10 hover:bg-red-50"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="text-center mt-4">
          <Link
            href="/add-review"
            className="inline-flex items-center bg-red-500 text-white px-6 py-2 text-sm font-bold rounded-full hover:bg-red-600/90 transition-colors duration-300 shadow-sm hover:shadow"
          >
            Add Your Review
          </Link>
        </div>
      </div>
    </section>
  );
}
