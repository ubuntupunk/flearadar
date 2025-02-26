import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link'; // Import Link from Next.js
import Explorer from './Explorer';
import AuthButton from './AuthButton'; // Import AuthButton component

// Add Google Fonts link
// <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">


export default function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">FleaRadar</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} href="/explorer">Explorer</Nav.Link>
          <Nav.Link as={Link} href="/blog">Blog</Nav.Link>
          <Nav.Link as={Link} href="/help">Help</Nav.Link>
          <Nav.Link as={Link} href="/contact">Contact</Nav.Link>
        </Nav>
        <AuthButton />
      </Navbar.Collapse>
    </Navbar>
  );
}