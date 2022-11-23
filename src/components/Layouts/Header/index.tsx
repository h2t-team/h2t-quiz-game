import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logo from '../../../asset/images/logo.svg';

function Header() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="white"
      variant="white"
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="H2T" width="150" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/" className="mx-2">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/group" className="mx-2">
              Group
            </Nav.Link>
          </Nav>
          <Nav className="align-items-center">
            <Link to="/register" className="btn-underline mx-3">
              Sign up
            </Link>
            <Link to="/login" className="btn btn-outline-primary rounded-pill px-3">
              Sign in
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
