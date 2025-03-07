// component/SearchBar.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import listings from '../data/listings.json';
import Link from 'next/link';
import LocalShipping from '@mui/icons-material/LocalShipping';
import WbSunny from '@mui/icons-material/WbSunny';
import NightlightRound from '@mui/icons-material/NightlightRound';
import ExploreIcon from '@mui/icons-material/Explore';

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
  rating: number[];
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
            <div className="px-6 pt-4 pb-2 flex items-center justify-between">
              <div>
                {item.type === 'Food Truck' ? <LocalShipping className="inline-block h-5 w-5" /> :
                 item.type === 'Day Market' ? <WbSunny className="inline-block h-5 w-5" /> :
                 item.type === 'Night Market' ? <NightlightRound className="inline-block h-5 w-5" /> : null}
              </div>
              <div>
                <Link href={`/directory/${item.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  View Listing
                </Link>
                {item.gps ? (
                  <Link href={`/explorer?gps=${item.gps}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2">
                    <ExploreIcon />
                    Explore
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
