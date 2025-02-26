import React from 'react';
import { Carousel, Card } from 'react-bootstrap';
import listings from '../data/listings.json'; // Adjust the path as necessary

const Explorer = () => {
    console.log(listings);

    return (
        <div>
            <Carousel>
                {listings.map(item => (
                    <Carousel.Item key={item.id}>
                        <Card>
                            <Card.Img variant="top" src={item.image} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title> {/* Change to match JSON structure */}
                                <Card.Text>{item.description || item.type}</Card.Text> {/* Adjust as needed */}
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                ))}
            </Carousel>
            {/* Add filtering tags here */}
        </div>
    );
};

export default Explorer;