import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import listings from '../data/listings.json';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import Link from 'next/link';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fuse = new Fuse(listings, { 
            keys: ['title', 'description', 'location', 'type'],
            includeScore: true,
            threshold: 0.3,
        });
        const result = fuse.search(query);
        setResults(result.map(res => res.item));
    }, [query]);

return (
    <div>
        <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
        <div>
            {results.map((item, index) => (
                <div key={index}>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">{item.title}</CardTitle>
                            <CardText>{item.description}</CardText>
                        </CardBody>
                    </Card>
                    <Link href={`/listings/${item.id}`}>
                        <a>View Listing</a>
                    </Link>
                </div>
            ))}
        </div>
    </div>
);
}
export default SearchBar;