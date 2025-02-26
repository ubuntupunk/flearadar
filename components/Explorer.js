import React from 'react';
import Slider from 'react-slick';
import ExpandableCard from './ExpandableCard'; // Import the new card component
import listings from '../data/listings.json'; // Adjust the path as necessary
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 

const Explorer = () => {
    const settings = {
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
                {listings.map(item => (
                    <div key={item.id}>
                        <ExpandableCard item={item} /> {/* Use the expandable card */}
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Explorer; // Ensure this line is present
