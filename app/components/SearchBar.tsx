// component/SearchBar.tsx

import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import listings from '../data/listings.json';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import Link from 'next/link';

// Define the Listing interface based on expected JSON structure and Fuse search keys
interface Listing {
  id: string | number;
  title: string;
  description: string;
  location: string;
  type: string;
  // Add other fields from listings.json if present
}

// Define Fuse search result interface
interface FuseResult {
  item: Listing;
  score?: number;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Listing[]>([]);

  useEffect(() => {
    const fuse = new Fuse<Listing>(listings as Listing[], { 
      keys: ['title', 'description', 'location', 'type'],
      includeScore: true,
      threshold: 0.3,
    });
    const result: FuseResult[] = fuse.search(query);
    setResults(result.map((res: FuseResult) => res.item));
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
      />
      <div>
        {results.map((item: Listing, index: number) => (
          <div key={index}>
            <Card>
              <CardBody>
                <CardTitle tag="h5">{item.title}</CardTitle>
                <CardText>{item.description}</CardText>
              </CardBody>
            </Card>
            <Link href={`/listings/${item.id}`}>
              View Listing
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;