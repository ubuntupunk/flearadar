import React from 'react';
import Image from 'next/image';

interface Spot {
  city: string;
  listings: string;
  image: string;
}

interface PopularSpotExpandableProps {
  spot: Spot;
}

const PopularSpotExpandable: React.FC<PopularSpotExpandableProps> = ({ spot }) => {
  return (
    <div className="w-full h-full flex flex-col">
       <h3 className="font-semibold text-gray-900 dark:text-white text-base leading-snug text-center py-2 mb-2">
       {spot.city}
      </h3>
      {/* Image with white text overlay */}
      <div className="relative w-full h-48">
        <Image
          src={spot.image}
          alt={spot.city}
          fill
          priority
          className="object-cover rounded-t-lg transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 text-white">
          <p className="text-sm">{spot.listings} listings</p>
        </div>
      </div>

      {/* Info & Button Section */}
      <div className="p-4 flex flex-col flex-grow">
        <button className="mt-auto bg-red-600 text-white px-3 py-1 text-sm font-medium hover:bg-red-700 transition duration-300 w-max">
          Explore
        </button>
      </div>
    </div>
  );
};

export default PopularSpotExpandable;
