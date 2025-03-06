// component/SearchBar.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import listings from '../data/listings.json';
import Link from 'next/link';

// Define the Listing interface based on expected JSON structure and Fuse search keys
interface Listing {
  id: string | number;
  name: string;
  description: string;
  location: string;
  type: string;
  date: string;
  gps: string;
  image: string;
  rating: number;
  // Add other fields from listings.json if present
}

// Define Fuse search result interface
interface FuseResult {
  item: Listing;
  score?: number;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Listing[]>([]);

  useEffect(() => {
    const fuse = new Fuse<Listing>(listings as Listing[], { 
      keys: ['name', 'description', 'location', 'type'],
      includeScore: true,
      threshold: 0.3,
    });
    const result: FuseResult[] = fuse.search(query);
    setResults(result.map((res: FuseResult) => res.item));
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <div>
        {results.map((item: Listing, index: number) => (
          <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{item.name}</div>
              <p className="text-gray-700 text-base">{item.description}</p>
            </div>
            <Link href={`/listings/${item.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              View Listing
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
