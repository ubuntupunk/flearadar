import React from 'react';
import Directory from '../../components/Directory';
import { notFound } from 'next/navigation';
import listingsData from '../../../app/data/listings.json';

interface Params {
  listingId: string;
}

interface Props {
  params: Params;
}

const DirectoryPage = async ({ params }: Props) => {
  const { listingId } = await params;

  // Find the listing with the matching ID
  const listing = listingsData.find((listing) => listing.id === parseInt(listingId));

  // If the listing is not found, return a 404
  if (!listing) {
    notFound();
  }

  return (
    <div>
      <Directory listings={[listing]} />
    </div>
  );
};

export default DirectoryPage;
