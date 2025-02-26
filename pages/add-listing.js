// pages/add-listing.js
import React, { useState } from 'react';

const AddListing = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Listing submitted:', { name, type, description });
  };

  return (
    <div>
      <h1>Add Listing</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Listing Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
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
          />
        </div>
        <button type="submit">Add Listing</button>
      </form>
    </div>
  );
};

export default AddListing;