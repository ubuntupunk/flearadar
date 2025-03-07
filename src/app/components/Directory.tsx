import React from 'react';

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
        {listings.map((listing: Listing) => (
          <div key={listing.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">{listing.name}</h2>
            <img src={listing.image} alt={listing.name} className="w-full h-48 object-cover mb-2" />
            <p className="text-gray-700">{listing.description}</p>
            <p className="text-gray-700"><strong>Type:</strong> {listing.type}</p>
            <p className="text-gray-700"><strong>Location:</strong> {listing.location}</p>
            <p className="text-gray-700"><strong>Email:</strong> {listing.email}</p>
            <p className="text-gray-700"><strong>Website:</strong> {listing.url}</p>
            <p className="text-gray-700"><strong>Trade Days:</strong> {listing["trade-days"]} </p>
            <p className="text-gray-700"><strong>Trade Hours:</strong> {listing["trade-hours"]}</p>
            <p className="text-gray-700"><strong>Rating:</strong> {listing.rating}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Directory;
