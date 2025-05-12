import { type JSX } from 'react';
import Link from 'next/link';

export default function Hero(): JSX.Element {
  return (
    <section 
      className="py-14 text-center bg-cover bg-center text-white relative" 
      style={{ backgroundImage: "url('/images/Flea-market.png')" }}
    >
      <div className="absolute inset-0"></div>
      <div className="relative z-10 p-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-4xl font-bold mb-6 leading-tight">Discover Food Trucks & Flea Markets</h1>
          <p className="text-xl md:text-1xl mb-8 max-w-2xl mx-auto font-light">Find the perfect informal places to shop or trade</p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/explorer" 
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              Explore Now
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
