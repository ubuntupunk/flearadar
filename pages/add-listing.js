// pages/add-listing.js
import React, { useState } from 'react';
import Header from '../components/Header'; // Adjust the import path if necessary
import Footer from '../components/Footer'; // Adjust the import path if necessary

const AddListing = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Listing submitted:', { name, type, description });
  };

  return (
    <div>
      <Header /> {/* Include Header */}
      <div className="container mx-auto my-8 p-4 border rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Add Listing</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Listing Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="type">Type:</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="border rounded p-2 w-full"
            >
              <option value="">Select a type</option>
              <option value="food truck">Food Truck</option>
              <option value="market">Market</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="border rounded p-2 w-full"
            />
          </div>
          <button type="submit" className="btn bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">
            Add Listing
          </button>
        </form>
      </div>
      <Footer /> {/* Include Footer */}
    </div>
  );
};

export default AddListing;