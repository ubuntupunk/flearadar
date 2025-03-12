import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';

interface TrendingExpandableProps {
  listing: any; // Replace with the actual listing type
  isAuthenticated: boolean;
}

const TrendingExpandable: React.FC<TrendingExpandableProps> = ({ listing, isAuthenticated }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadMoreClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border rounded-lg shadow-sm">
      <a href="#" className="d-block">
        <img
          src={listing.image}
          className="w-full h-48 object-cover rounded-t-lg"
          alt={listing.name}
        />
      </a>
      <div className="p-4">
        <h3 className="font-bold">{listing.name}</h3>
        <p className="text-sm">{listing.location}</p>
        {isExpanded && (
          <div>
            <p>Extra details: {listing.extraDetails}</p>
          </div>
        )}
        {isAuthenticated ? (
          <button onClick={handleReadMoreClick}>{isExpanded ? 'Read Less' : 'Read More'}</button>
        ) : (
          <div>
            <a href="/api/auth/[auth0]/login?screen_hint=signup" data-tooltip-content="Register to unlock">
              <span>🔒</span>
            </a>
            <Tooltip anchorSelect="[data-tooltip-content]"/>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingExpandable;
