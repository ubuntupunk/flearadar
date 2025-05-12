import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import Image from 'next/image';

interface Listing {
  id: string | number;
  name: string;
  image: string;
  location: string;
  type: string;
  rating: number[];
  extraDetails?: string;
}

interface TrendingExpandableProps {
  listing: Listing;
  isAuthenticated: boolean;
}

const TrendingExpandable: React.FC<TrendingExpandableProps> = ({ listing, isAuthenticated }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadMoreClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Image section */}
      <h3 className="font-semibold text-gray-900 dark:text-white text-base leading-snug text-center py-2 mb-2">
          {listing.type}
        </h3>
      <div className="relative w-full h-36">
        <Image
         src={listing.image}
         alt={listing.name}
         fill
         priority
         className="object-cover"
        />
      </div>

      {/* Info section */}
      <div className="bg-white dark:bg-gray-800 p-3 flex flex-col flex-grow text-center">
        <h3 className="font-semibold text-gray-900 dark:text-white text-base leading-snug">
          {listing.name}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
          {listing.location}
        </p>

        {isExpanded && (
          <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-600 dark:text-gray-300">{listing.extraDetails}</p>
          </div>
        )}

        <div className="mt-2">
          {isAuthenticated ? (
            <button
              onClick={handleReadMoreClick}
              className="text-blue-500 hover:underline text-sm"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          ) : (
            <div>
              <a
                href="/api/auth/[auth0]/login?screen_hint=signup"
                data-tooltip-content="Register to unlock"
                className="text-sm text-red-500"
              >
                🔒
              </a>
              <Tooltip anchorSelect="[data-tooltip-content]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingExpandable;
