// components/ReachMillions.tsx
import React from 'react';
import Link from 'next/link'; // Import Link for navigation

// Optional props interface for future use
interface ReachMillionsProps {
  // Add props here if needed
}

export default function ReachMillions(/* props: ReachMillionsProps */): JSX.Element {
  return (
    <section className="bg-gray-100 pb-5 pt-5 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-gray-800 text-2xl">Reach Millions of People</h2>
        <p className="mb-4 text-gray-600">
          Bringing the informal market into the information age using the latest responsive technologies. Inquire about our advertising rates.
        </p>
        <Link
          href="/add-listing"
          className="btn bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
        >
          Add Your Listing
        </Link>
      </div>
    </section>
  );
}