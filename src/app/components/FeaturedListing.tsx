import Image from 'next/image';

// Define the Featured interface
interface Featured {
  name: string;
  type: string;
  date: string;
  location: string;
  gps: string;
  image: string;
  rating: number;
}

// Optional props interface for future use
interface FeaturedListingProps {
  // Add props here if needed
}

export default function FeaturedListing(/* props: FeaturedListingProps */): JSX.Element {
  const featured: Featured = {
    name: "Downtown Flea Market",
    type: "Flea Market",
    date: "March 1, 2025",
    location: "123 Main St",
    gps: "37.7749,-122.4194",
    image: "https://placehold.co/600x300",
    rating: 4.5,
  };

  return (
    <section className="p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <Image 
          src={featured.image} 
          alt={featured.name} 
          width={600} 
          height={300} 
          className="w-full h-64 object-cover" 
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">{featured.name}</h2>
          <p className="text-gray-600">{featured.type} | {featured.date} | {featured.location}</p>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-gray-600">{featured.rating}</span>
          </div>
          <button className="mt-4 bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}