import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from 'asset/images/logo.svg';
import { isLogin } from 'utils';
import { useRoute } from 'hooks';
import EditPresentationNav from './EditPresentationNav';
import AppNav from './AppNav';

function Header() {
  const { isEditPresentation } = useRoute();

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="white"
      className="shadow-sm p-1"
      sticky="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="H2T" width="150" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {isEditPresentation() && isLogin() ? (
            <EditPresentationNav />
          ) : (
            <AppNav />
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
