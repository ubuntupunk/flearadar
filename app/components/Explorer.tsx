import React from 'react';
import Slider from 'react-slick';
import ExpandableCard from './ExpandableCard'; // Import the new card component
import listings from '../data/listings.json'; // Adjust the path as necessary
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 

// Define the Item interface (should match ExpandableCard's expectations)
interface Item {
  id: string | number;
  name: string;
  location: string;
  image: string;
  description: string;
  type: string;
  rating: string | number;
  gps: string;
}

// Define slider settings interface
interface SliderSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
}

const Explorer: React.FC = () => {
  const settings: SliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="text-center">
      <h1>Explore Vendors, Markets, and Food Trucks</h1>
      <Slider {...settings}>
        {(listings as Item[]).map((item: Item) => (
          <div key={item.id}>
            <ExpandableCard item={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Explorer;