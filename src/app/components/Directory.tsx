"use client";

import React from 'react';
import Map from './Map';
import Image from 'next/image';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { CurrencyExchange, Email, FacebookOutlined, Nature, People, Person2Outlined, Phone, WheelchairPickupOutlined } from '@mui/icons-material';
import { PaymentsOutlined, FlashAuto } from '@mui/icons-material';
import LanguageIcon from '@mui/icons-material/Language';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import StarIcon from '@mui/icons-material/Star';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState } from 'react';
import Score from './Score';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Home from '@mui/icons-material/Home';
import Calendar from '@mui/icons-material/CalendarToday';
import MercuryMap from './MercuryMap';
interface Listing {
  id: number;
  name: string;
  type: string;
  description: string;
  date: string;
  location: string;
  gps: string;
  organiser: string;
  contact: string;
  email: string;
  url: string;
  social: string;
  image: string;
  environment: string;
  frequency: string;
  "trade-days": string;
  "trade-hours": string;
  currency: string;
  payments: string
  crowd: string;
  access: string;
  status: string;
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
              <p className="text-gray-700"><strong>GPS:</strong> <GpsFixedIcon /> {listing.gps}</p>
              <p className="text-gray-700"><strong>Organiser:</strong> <Person2Outlined /> {listing.organiser} </p>
              <p className="text-gray-700"><strong>Contact:</strong> <Phone /> {listing.contact} </p>
              <p className="text-gray-700"><strong>Email:</strong> <Email /> {listing.email}</p>
              <p className="text-gray-700"><strong>Website:</strong> <LanguageIcon /> <a href={listing.url} target="_blank" rel="noopener noreferrer">{listing.url}</a></p>
              <p className="text-gray-700"><strong>Social Media:</strong> <FacebookOutlined /> {listing.social} </p>
              <p className="text-gray-700"><strong>Environment:</strong> 
                {listing.environment == 'Indoors' ? <Home /> : null}
                {listing.environment == 'Outdoors' ? <Nature /> : null}
                {listing.environment} 
                </p>
              <p className="text-gray-700"><strong>Frequency:</strong> <EventIcon /> {listing.frequency} </p>
              <p className="text-gray-700"><strong>Trade Days:</strong> <EventIcon /> {listing["trade-days"]} </p>
              <p className="text-gray-700"><strong>Trade Hours:</strong> <AccessTimeIcon /> {listing["trade-hours"]}</p>
              <p className="text-gray-700"><strong>Currency:</strong> <CurrencyExchange /> {listing.currency}</p>
              <p className="text-gray-700"><strong>Payments:</strong> <PaymentsOutlined /> {listing.payments}</p>
              <p className="text-gray-700"><strong>Crowd:</strong> <People /> {listing.crowd}</p>
              <p className="text-gray-700"><strong>Access:</strong> <WheelchairPickupOutlined /> {listing.access}</p>
              <p className="text-gray-700"><strong>Status:</strong> <FlashAuto /> {listing.status} </p>
              <p className="text-gray-700"><strong>Rating:</strong> <Score rating={listing.rating} /></p>
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
