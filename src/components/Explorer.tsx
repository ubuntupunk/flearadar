"use client";
import React from 'react';
import Slider from 'react-slick';
import ExpandableCard from './ExpandableCard';
import listings from '../data/listings.json';
const typedListings = listings as ListingsData; // Adjust the path as necessary
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 

// Define interfaces
interface SliderSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  dotsClass?: string;
  responsive?: Array<{
    breakpoint: number;
    settings: {
      slidesToShow: number;
      slidesToScroll: number;
    };
  }>;
}

interface FoodTruck {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number[];
  location: string;
  cuisine: string;
  priceRange: string;
  hours: string;
  specialties: string[];
  type: 'food-truck';
  gps: { lat: number; lng: number };
}

interface Market {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number[];
  location: string;
  type: string;
  schedule: string;
  hours: string;
  highlights: string[];
  gps: { lat: number; lng: number };
}

interface ListingsData {
  foodTrucks: FoodTruck[];
  markets: Market[];
}

const Explorer: React.FC = () => {
  const settings: SliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const appendDots = (dots: React.ReactNode): React.ReactElement => (
    <div className="absolute bottom-8 w-full text-center">
      <ul className="m-0 p-0"> {dots} </ul>
    </div>
  ) as React.ReactElement;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        Explore Food & Markets
      </h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
            Food Trucks
          </h2>
          <div className="relative">
            <Slider {...settings} appendDots={appendDots}>
              {typedListings.foodTrucks.map((item) => (
                <div key={item.id} className="px-2">
                  <ExpandableCard item={item} />
                </div>
              ))}
            </Slider>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
            Markets
          </h2>
          <div className="relative">
            <Slider {...settings} appendDots={appendDots}>
              {typedListings.markets.map((item) => (
                <div key={item.id} className="px-2">
                  <ExpandableCard item={item} />
                </div>
              ))}
            </Slider>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explorer;
