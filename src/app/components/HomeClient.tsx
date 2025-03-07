"use client";

import React, { useState, useEffect } from 'react';
import SearchResults from "./SearchResults";
import { Listing } from '@/lib/data';
import HeroSearch from "./HeroSearch";

interface HomeClientProps {
  listings: Listing[];
}

const HomeClient: React.FC<HomeClientProps> = ({ listings }) => {
  const [searchResults, setSearchResults] = useState<Listing[]>([]);

  useEffect(() => {
    setSearchResults(listings);
  }, [listings]);

  return (
    <div>
      <HeroSearch setResults={setSearchResults} />
      <SearchResults results={searchResults} />
    </div>
  );
};

export default HomeClient;
