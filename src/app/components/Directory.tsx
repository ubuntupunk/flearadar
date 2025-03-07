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
    <div>
      <h1>Directory Component</h1>
      {listings.map((listing: Listing) => (
        <div key={listing.id}>
          <h2>{listing.name}</h2>
          <p>{listing.description}</p>
          <p>Type: {listing.type}</p>
          <p>Location: {listing.location}</p>
          {/* Add more details as needed */}
        </div>
      ))}
    </div>
  );
};

export default Directory;
