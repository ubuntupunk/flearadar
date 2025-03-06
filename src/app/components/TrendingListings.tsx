import React from 'react';
//components/TrendingListings
import listings from "../data/listings.json";
import Image from 'next/image';
import Score from './Score';

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
  return (
    <section className="pb-5 pt-5">
      <div className="container">
        <div className="mb-4 text-center">
          <h2 className="text-gray-800 text-2xl">Trending Markets & Food Trucks</h2>
          <p className="text-gray-600">These are the highest rated places to shop and trade</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {(listings as Listing[]).map((listing: Listing) => (
            <div key={listing.id} className="border rounded-lg shadow-sm">
              <a href="#" className="d-block">
                <Image
                  src={listing.image}
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover rounded-t-lg"
                  alt={listing.name}
                />
              </a>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <a href="#" className="text-gray-800 no-underline">
                      <h3 className="text-lg mb-1">{listing.name}</h3>
                    </a>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="1.125em"
                        height="1.125em"
                        className="mr-1 text-red-500"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M18.364 17.364L12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                      </svg>
                      <span className="text-gray-600">{listing.location}</span>
                    </div>
                  </div>
                  <a href="#" className="btn bg-red-500 text-white p-2 rounded-full" aria-label="add to favorite">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="1em"
                      height="1em"
                      className="inline-block"
                    >
                      <path fill="none" d="M0 0H24V24H0z"></path>
                      <path d="M20.243 4.757c2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236C5.515 3 8.093 2.56 10.261 3.44L6.343 7.358l1.414 1.415L12 4.53l-.013-.014.014.013c2.349-2.109 5.979-2.039 8.242.228z"></path>
                    </svg>
                  </a>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between items-center">
                  <Score rating={listing.rating} />
                  <span className="font-bold text-gray-800">Rands</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pb-3 pt-3 text-center">
          <a href="#" className="btn bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">
            View More
          </a>
        </div>
      </div>
    </section>
  );
}
