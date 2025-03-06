// pages/add-listing.tsx
"use client";

import React, { useState } from 'react';


// Define props interface (optional for now since no props are passed)
//interface AddListingProps {
  // Add props here if needed in the future
//}

const AddListing: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  //const [buttonType, setButtonType] = useState<string>('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Listing submitted:', { name, type, description });
  };

  return (
    <div>
        <div className="container mx-auto my-8 p-4 border rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Add Listing</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Listing Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              required
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="type">Type:</label>
            <select
              id="type"
              value={type}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value)}
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
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              required
              className="border rounded p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="btn bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
          >
            Add Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddListing;