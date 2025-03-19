"use client";

import React from 'react';
import Slider from 'react-slick';
import ExpandableCard, { Item } from './ExpandableCard'; // Import the new card component

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Listing {
  id: number;
  name: string;
  category: string;
  type: string;
  description: string;
  date: string;
  location: string;
  gps: string;
  organiser: string;
  contact: string;
  email: string;
  url: string;
  social?: string;
  image: string;
  environment: string;
  frequency: string;
  "trade-days": string;
  "trade-hours": string;
  currency: string;
  payments: string;
  crowd: string;
  access: string;
  status: string;
  rating: number[];
}

interface ExplorerProps {
  listings: Listing[];
}

// Define slider settings interface
interface SliderSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  dotsClass?: string;
}

const Explorer: React.FC<ExplorerProps> = ({ listings }) => {
  const settings: SliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  const appendDots = (dots: React.ReactNode): React.ReactElement => (
    <div
      style={{
        position: 'absolute',
        bottom: '30px',
        width: '100%',
        textAlign: 'center',
      }}
    >
      <ul style={{ margin: '0', padding: '0' }}> {dots} </ul>
    </div>
  ) as React.ReactElement;

  return (
    <div className="text-center py-4">
      <h1 className="text-2xl font-bold mb-4">Explore Vendors, Markets, and Food Trucks</h1>
      <Slider {...settings} appendDots={appendDots}>
        {listings.map((item: Item) => (
          <div key={item.id} className="px-2">
            <ExpandableCard item={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Explorer;
