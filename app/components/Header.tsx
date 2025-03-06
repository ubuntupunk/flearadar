
"use client";

import React, { useState } from 'react';
import AuthButton from './AuthButton';
import SearchBar from './SearchBar';

// Define props interface
import { useUser } from '@auth0/nextjs-auth0';

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, error, isLoading } = useUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-light p-3">
      <div className="container mx-auto flex items-center justify-between">
        <a className="text-lg font-bold" href="/">FleaRadar</a>
      <button className="navbar-toggler md:hidden" type="button" onClick={toggleMenu} aria-controls="basic-navbar-nav" aria-expanded={isMenuOpen} aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`navbar-collapse ${isMenuOpen ? 'block' : 'hidden'} md:flex md:items-center md:w-auto`} id="basic-navbar-nav">
        <ul className="mr-auto flex flex-col md:flex-row space-x-4 items-center">
          <li><a className="nav-link" href="/">Home</a></li>
          <li><a className="nav-link" href="/explorer">Explorer</a></li>
          <li><a className="nav-link" href="/add-listing">Add Listing</a></li>
        </ul>
        <div className="flex items-center space-x-2">
          <SearchBar />
          <AuthButton />
          {user && (
            <span className="text-gray-700">Welcome, {user.name}!</span>
          )}
        </div>
      </div>
      </div>
    </nav>
  );
};

export default Header;
