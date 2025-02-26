import React from 'react';
import { Carousel, Card } from 'react-bootstrap';
import listings from '../data/listings.json'; // Adjust the path as necessary

const Explorer = () => {
    console.log(listings);

   return (
        <div className="text-center"> {/* Center the heading */}
            <h1>Explore Vendors, Markets, and Food Trucks</h1>
            <Carousel className="d-flex justify-content-center"> {/* Center the carousel */}
                {listings.map(item => (
                    <Carousel.Item key={item.id}>
                        <Card>
                            <Card.Img 
                                variant="top" 
                                src={item.image} 
                                style={{ width: '300px', height: '300px', objectFit: 'cover' }} 
                            />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    <strong>Type:</strong> {item.type}<br />
                                    <strong>Location:</strong> {item.location}<br />
                                    <strong>Rating:</strong> {item.rating}<br />
                                    <strong>Description:</strong> {item.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default Explorer;