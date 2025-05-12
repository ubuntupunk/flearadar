"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'Food Truck':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Day Market':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Food Truck':
        return <LocalShipping className="h-4 w-4 mr-1" />;
      case 'Day Market':
        return <WbSunny className="h-4 w-4 mr-1" />;
      default:
        return <NightlightRound className="h-4 w-4 mr-1" />;
    }
  };

  if (results.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-gray-600 dark:text-gray-300">
          <p className="text-lg">No results found. Try adjusting your search.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((item, index) => (
          <div 
            key={index} 
            className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image 
                src={item.image || '/images/placeholder.jpg'} 
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeStyles(item.type)}`}>
                  {getTypeIcon(item.type)}
                  {item.type}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                {item.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                <ExploreIcon className="h-4 w-4 mr-1" />
                <span className="line-clamp-1">{item.location}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <Link 
                  href={`/directory/${item.id}`} 
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                >
                  View Details
                </Link>
                {item.gps && (
                  <Link 
                    href={`/explorer?gps=${item.gps}`} 
                    className="inline-flex justify-center items-center p-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                    title="View on Map"
                  >
                    <ExploreIcon className="h-5 w-5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
