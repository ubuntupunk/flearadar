
import React from 'react';
import Navbar from 'react-bootstrap/Navbar'; // Default import
import Nav from 'react-bootstrap/Nav'; // Default import
import NavbarBrand from 'react-bootstrap/NavbarBrand'; // Check if this is needed
import NavbarToggle from 'react-bootstrap/NavbarToggle'; // Check if this is needed
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';
import NavLink from 'react-bootstrap/NavLink';
import AuthButton from './AuthButton';
import SearchBar from './SearchBar';

console.log('Navbar:', Navbar);
console.log('NavbarBrand:', NavbarBrand);
console.log('NavbarToggle:', NavbarToggle);
console.log('Nav:', Nav);
console.log('NavbarCollapse:', NavbarCollapse);
console.log('NavLink:', NavLink);

// Define props interface
interface HeaderProps {
  isAuthenticated: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
  return (
    <Navbar bg="light" expand="lg">
      <NavbarBrand href="/">FleaRadar</NavbarBrand>
      <NavbarToggle aria-controls="basic-navbar-nav" />
      <NavbarCollapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/explorer">Explorer</NavLink>
          <NavLink href="/add-listing">Add Listing</NavLink>
        </Nav>
        <Nav>
          <SearchBar />
          <AuthButton />
        </Nav>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
