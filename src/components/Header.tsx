"use client";

import Link from "next/link";
import React, { useState } from 'react';
import SupaAuthButton from './SupaAuthButton';
import SearchBar from './SearchBar';

import { useUser, useSessionContext } from '@supabase/auth-helpers-react';
//eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { user } = useUser() as any; // Removed useUser() call
  // console.log('User object from useUser:', user);
  const { supabaseClient } = useSessionContext();
  console.log('Supabase client from useSessionContext:', supabaseClient);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-light p-3">
      <div className="container mx-auto flex items-center justify-between">
        <Link className="text-lg font-bold" href="/">FleaRadar</Link>
      <button className="navbar-toggler md:hidden" type="button" onClick={toggleMenu} aria-controls="basic-navbar-nav" aria-expanded={isMenuOpen} aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`navbar-collapse ${isMenuOpen ? 'block' : 'hidden'} md:flex md:items-center md:w-auto`} id="basic-navbar-nav">
        <ul className="mr-auto flex flex-col md:flex-row space-x-4 items-center">
          <li><Link className="nav-link" href="/">Home</Link></li>
          <li><Link className="nav-link" href="/explorer">Explorer</Link></li>
          <li><Link className="nav-link" href="/add-listing">Add Listing</Link></li>
        </ul>
        <div className="flex items-center space-x-2 ml-4 rounded-md">
          <SearchBar />
          <SupaAuthButton />
          {/* Removed user object usage */}
        </div>
      </div>
      </div>
    </nav>
  );
};

export default Header;
