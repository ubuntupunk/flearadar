"use client";

import React from 'react';
import Link from 'next/link';
import LocalShipping from '@mui/icons-material/LocalShipping';
import WbSunny from '@mui/icons-material/WbSunny';
import NightlightRound from '@mui/icons-material/NightlightRound';
import ExploreIcon from '@mui/icons-material/Explore';

interface Listing {
  id: number;
  name: string;
  type: string;
  description: string;
  date: string;
  location: string;
  gps: string;
  contact: string;
  email: string;
  url: string;
  image: string;
  "trade-days": string;
  "trade-hours": string;
  rating: number[];
}

interface SearchResultsProps {
  results: Listing[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div>
      {results.map((item, index) => (
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
  );
};

export default SearchResults;
