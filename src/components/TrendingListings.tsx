"use client";

import React, { useState } from 'react';
import { JSX } from 'react';
//components/TrendingListings
import listings from "../app/data/listings.json";
import Image from 'next/image';
import Score from './Score';
import TrendingExpandable from './TrendingExpandable';
import { useAuthStore } from '@/lib/store/use-auth-store';

// Define the Listing interface based on expected JSON structure
interface Listing {
  id: string | number;
  name: string;
  image: string;
  location: string;
  rating: number[];
}

// Optional props interface for future use

interface TrendingListingsProps {
  // Add props here if needed
}

export default function TrendingListings(/* props: TrendingListingsProps */): JSX.Element {
  const [displayedListings, setDisplayedListings] = useState(4);
  const { isAuthenticated } = useAuthStore();

  const handleViewMore = () => {
    setDisplayedListings(displayedListings + 4);
  };

  const visibleListings = (listings as Listing[]).slice(0, displayedListings);

  return (
    <section className="pb-5 pt-5">
      <div className="container">
        <div className="mb-4 text-center">
          <h2 className="text-gray-800 text-2xl">Trending Markets & Food Trucks</h2>
          <p className="text-gray-600">These are the highest rated places to shop and trade</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {visibleListings.map((listing: Listing) => (
            <TrendingExpandable key={listing.id} listing={listing} isAuthenticated={isAuthenticated} />
          ))}
        </div>
        <div className="pb-3 pt-3 text-center">
          {displayedListings < (listings as Listing[]).length && (
            <button
              onClick={handleViewMore}
              className="btn bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
            >
              View More
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
