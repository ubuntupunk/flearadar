import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link'; // Import Link from Next.js

import AuthButton from './AuthButton'; // Import AuthButton component
import SearchBar from './SearchBar';

// Define props interface
interface HeaderProps {
  isAuthenticated: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">FleaRadar</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/explorer">Explorer</Nav.Link>
          <Nav.Link href="/blog">Blog</Nav.Link>
          <Nav.Link href="/help">Help</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
          {isAuthenticated && (
            <>
              <Nav.Link href="/csr" data-testid="navbar-csr">
                Client-side rendered page
              </Nav.Link>
              <Nav.Link href="/ssr" data-testid="navbar-ssr">
                Server-side rendered page
              </Nav.Link>
              <Nav.Link href="/external" data-testid="navbar-external">
                External API
              </Nav.Link>
            </>
          )}
        </Nav>
        <SearchBar /> {/* Include your SearchBar component */}
        <AuthButton /> {/* Include the AuthButton for login/logout */}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;