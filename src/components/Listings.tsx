import listings from "../app/data/listings.json";
import Image from 'next/image';

// Define the Listing interface based on expected JSON structure
interface Listing {
  id: string | number;
  name: string;
  type: string;
  date: string;
  location: string;
  image: string;
  // Note: rating is hardcoded as 4.7 in the JSX, so not included here
  // Add more fields if they exist in your listings.json
}

// Optional props interface for future use
//eslint-disable-next-line @typescript-eslint/no-empty-interface

interface ListingsProps {
  // Add props here if needed
}

export default function Listings(/* props: ListingsProps */): JSX.Element {
  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Trending Markets & Food Trucks</h2>
      <p className="text-gray-600 text-center mb-6">These are the highest rated places to shop and trade</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {(listings as Listing[]).map((listing: Listing) => (
          <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image 
              src={listing.image} 
              alt={listing.name} 
              width={600} 
              height={300} 
              className="w-full h-48 object-cover" 
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{listing.name}</h3>
              <p className="text-gray-600 text-sm">{listing.type} | {listing.date} | {listing.location}</p>
              <div className="flex items-center mt-2">
                <span className="text-red-500">♥</span>
                <span className="ml-1 text-gray-600">4.7</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}