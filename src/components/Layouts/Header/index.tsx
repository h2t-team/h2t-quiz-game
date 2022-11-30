import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

import logo from 'asset/images/logo.svg';
import { isLogin } from 'utils';

function Header() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="white"
      className="shadow-sm p-1"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="H2T" width="150" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" className="mx-2">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/groups" className="mx-2">
              Group
            </Nav.Link>
          </Nav>
          {isLogin() ? (
            <NavDropdown
              title="Username"
              id="navbarScrollingDropdown"
              className="mx-2"
              key="down-centered"
            >
              <NavDropdown.Item href="/user">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Sign out</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav className="align-items-center">
              <Link to="/register" className="btn btn-success mx-3 fw-bolder">
                Sign up
              </Link>
              <Link to="/login" className="btn-underline fw-bolder">
                Sign in
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
