"use client";

import React from 'react';
import Map from './Map';
import Image from 'next/image';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import StarIcon from '@mui/icons-material/Star';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState } from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MercuryMap from './MercuryMap';
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

interface DirectoryProps {
  listings: Listing[];
}

const Directory: React.FC<DirectoryProps> = ({ listings }) => {
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Flearadar Directory</h1>
        {listings.map((listing: Listing) => {
          const [isBookmarked, setIsBookmarked] = useState(false);

          const toggleBookmark = () => {
            setIsBookmarked(!isBookmarked);
          };

          return (
            <div key={listing.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <h2 className="text-xl font-semibold mb-2">{listing.name}</h2>
              <Image src={listing.image} alt={listing.name} width={600} height={300} className="w-full h-48 object-cover mb-2" />
              <p className="text-gray-700 italic">{listing.description}</p>
              <p className="text-gray-700">
                <strong>Type:</strong>
                {listing.type === 'Food Truck' ? <LocalShippingIcon /> : null}
                {listing.type === 'Day Market' ? <WbSunnyIcon /> : null}
                {listing.type === 'Night Market' ? <NightlightRoundIcon /> : null}
                {listing.type}
              </p>
              <p className="text-gray-700"><strong>Location:</strong> <LocationOnIcon /> {listing.location}</p>
              <p className="text-gray-700"><strong>Email:</strong> <EmailIcon /> {listing.email}</p>
              <p className="text-gray-700"><strong>Website:</strong> <LanguageIcon /> <a href={listing.url} target="_blank" rel="noopener noreferrer">{listing.url}</a></p>
              <p className="text-gray-700"><strong>Trade Days:</strong> <EventIcon /> {listing["trade-days"]} </p>
              <p className="text-gray-700"><strong>Trade Hours:</strong> <AccessTimeIcon /> {listing["trade-hours"]}</p>
              <p className="text-gray-700"><strong>GPS:</strong> <GpsFixedIcon /> {listing.gps}</p>
              <p className="text-gray-700"><strong>Rating:</strong> <StarIcon /> {listing.rating}</p>
              <div className="flex justify-between items-center">
                <button className="cursor-pointer" onClick={toggleBookmark}>
                  {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </button>
                <a href={`/directory/${listing.id}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Review and Explore
                </a>
              </div>
              {listing.gps && (
                <div className="map-container">
                  <MercuryMap
                    gps={listing.gps.split(",").map(parseFloat) as [number, number]}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Directory;
