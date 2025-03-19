// app/explorer/page.tsx
import React from 'react';
import Explorer from '../../components/Explorer'; // Adjust the path if necessary
import { notFound } from 'next/navigation';
import listings from '../data/listings.json';


// Define props interface if passing data
interface ExplorerPageProps {
  // Example: data: any; // Replace with actual data type
}

// Note: In App Router, data fetching happens in the component itself
export default async function ExplorerPage(/* props: ExplorerPageProps */) {
  if (!listings) {
    notFound();
  }

  return (
    <div>
      <Explorer listings={listings} />
    </div>
  );
}

export const metadata = {
  title: 'Explorer | Flea Market Radar',
  description: 'Discover flea markets near you.',
}
